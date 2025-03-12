import io
import os
import psycopg2
import boto3
import datetime
import csv


def lambda_handler(event, context):
    
    s3_client = boto3.client('s3')

    
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        return {'statusCode': 500, 'body': 'DATABASE_URL環境変数が設定されていません。'}

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    table_names = ['Reflection', 'Account', 'User', 'ReflectionFolder']
    csv_file_names = ['Reflection.csv', 'Account.csv', 'User.csv', 'ReflectionFolder.csv']
    
    today = datetime.datetime.utcnow().strftime('%Y-%m-%d')

    bucket = 'refty-backup-data'

    results = []

    for table_name, csv_file_name in zip(table_names, csv_file_names):
        try:
            buffer = io.StringIO()
            sql = f'COPY "{table_name}" TO STDOUT WITH CSV HEADER'
            cur.copy_expert(sql, buffer)
            buffer.seek(0)

            key_today = f'{today}/{csv_file_name}'
            s3_client.put_object(Bucket=bucket, Key=key_today, Body=buffer.getvalue())
            #Reflectionの場合、文字列カラムを文字数をカウントして保存
            #TODO USerテーブルについてもユーザーが記入するところがあるので、そこを文字数カウントに修正した方がいい
            if table_name == 'Reflection':
                buffer.seek(0)
                csv_reader = csv.reader(buffer)
                headers = next(csv_reader)
                
                content_index = None
                title_index = None
                ai_feedback_index = None
                
                try:
                    content_index = headers.index('content')
                except ValueError:
                    pass
                try:
                    title_index = headers.index('title')
                except ValueError:
                    pass
                try:
                    ai_feedback_index = headers.index('aiFeedback')
                except ValueError:
                    
                    pass
                
                
                new_buffer = io.StringIO()
                csv_writer = csv.writer(new_buffer)
                csv_writer.writerow(headers)  
                
                
                for row in csv_reader:
                    new_row = row.copy()
                    # 文字数をカウントして保存
                    if content_index is not None and row[content_index]:
                        new_row[content_index] = str(len(row[content_index]))
                    
                    if title_index is not None and row[title_index]:
                        new_row[title_index] = str(len(row[title_index]))
                    
                    if ai_feedback_index is not None and row[ai_feedback_index]:
                        new_row[ai_feedback_index] = str(len(row[ai_feedback_index]))
                    
                    csv_writer.writerow(new_row)
                
                new_buffer.seek(0)
                latest_key = f'latest/{csv_file_name}'
                s3_client.put_object(Bucket=bucket, Key=latest_key, Body=new_buffer.getvalue())
            else:               
                buffer.seek(0)
                latest_key = f'latest/{csv_file_name}'
                s3_client.put_object(Bucket=bucket, Key=latest_key, Body=buffer.getvalue())

            results.append(f"{table_name} を {today} と latest に保存しました。")

        except Exception as e:
            results.append(f"{table_name} のアップロードエラー：{str(e)}")

    cur.close()
    conn.close()

    return {'statusCode': 200, 'body': results}