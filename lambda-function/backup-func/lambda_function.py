import io
import os
import psycopg2
import boto3
import datetime
import csv


def lambda_handler(event, context):
    # S3クライアントの作成（Lambda 実行ロールで許可済みと仮定）
    s3_client = boto3.client('s3')

    # DB接続
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        return {'statusCode': 500, 'body': 'DATABASE_URL環境変数が設定されていません。'}

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    # テーブルとCSV名の指定
    table_names = ['Reflection', 'Account', 'User', 'ReflectionFolder']
    csv_file_names = ['Reflection.csv', 'Account.csv', 'User.csv', 'ReflectionFolder.csv']

    # 今日の日付を取得
    today = datetime.datetime.utcnow().strftime('%Y-%m-%d')

    # バケット名
    bucket = 'refty-backup-data'

    results = []

    for table_name, csv_file_name in zip(table_names, csv_file_names):
        try:
            # CSVデータをメモリ内に書き込む
            buffer = io.StringIO()
            sql = f'COPY "{table_name}" TO STDOUT WITH CSV HEADER'
            cur.copy_expert(sql, buffer)
            buffer.seek(0)

            # S3に今日の日付ディレクトリへ保存（元のままの内容）
            key_today = f'{today}/{csv_file_name}'
            s3_client.put_object(Bucket=bucket, Key=key_today, Body=buffer.getvalue())

            # latestディレクトリ用のデータ処理
            if table_name == 'Reflection':
                # Reflectionテーブルの処理（既存のコード）
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

            elif table_name == 'User':
                buffer.seek(0)
                csv_reader = csv.reader(buffer)
                headers = next(csv_reader)
                
                username_index = None
                bio_index = None
                goal_index = None
                website_index = None
                
                try:
                    username_index = headers.index('username')
                except ValueError:
                    pass

                try:
                    bio_index = headers.index('bio')
                except ValueError:
                    pass
                
                try:
                    goal_index = headers.index('goal')
                except ValueError:
                    pass

                try:
                    website_index = headers.index('website')
                except ValueError:
                    pass
                
                new_buffer = io.StringIO()
                csv_writer = csv.writer(new_buffer)
                csv_writer.writerow(headers)
                
                for row in csv_reader:
                    new_row = row.copy()
                    if username_index is not None and row[username_index]:
                        new_row[username_index] = str(len(row[username_index]))

                    if bio_index is not None and row[bio_index]:
                        new_row[bio_index] = str(len(row[bio_index]))
                    
                    if goal_index is not None and row[goal_index]:
                        new_row[goal_index] = str(len(row[goal_index]))

                    if website_index is not None and row[website_index]:
                        new_row[website_index] = str(len(row[website_index]))
                    
                    csv_writer.writerow(new_row)
                
                new_buffer.seek(0)
                latest_key = f'latest/{csv_file_name}'
                s3_client.put_object(Bucket=bucket, Key=latest_key, Body=new_buffer.getvalue())

            else:
                # 他のテーブルは通常通り保存
                buffer.seek(0)
                latest_key = f'latest/{csv_file_name}'
                s3_client.put_object(Bucket=bucket, Key=latest_key, Body=buffer.getvalue())

            results.append(f"{table_name} を {today} と latest に保存しました。")

        except Exception as e:
            results.append(f"{table_name} のアップロードエラー：{str(e)}")

    # 接続を閉じる
    cur.close()
    conn.close()

    return {'statusCode': 200, 'body': results}