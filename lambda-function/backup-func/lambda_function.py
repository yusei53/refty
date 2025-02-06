import io
import os
import psycopg2
import boto3
import datetime


def lambda_handler(event, context):
    s3_client = boto3.client('s3')
    
    db_url = os.environ.get('DATABASE_URL', 'postgresql://user:password@host:port/dbname')
    if not db_url:
        return {
            'statusCode': 500,
            'body': 'DATABASE_URL 環境変数が設定されていません。'
        }
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f"データベース接続に失敗しました: {e}"
        }
    
    table_names = ['Reflection', 'Account', 'User', 'ReflectionFolder']
    csv_file_names = ['Reflection.csv', 'Account.csv', 'User.csv', 'ReflectionFolder.csv']
    
    today_str = datetime.date.today().isoformat()
    Bucket = 'refty-backup-data'
    
    results = []
    
    for table_name, csv_file in zip(table_names, csv_file_names):
        try:
            buffer = io.StringIO()
            sql = f'COPY "{table_name}" TO STDOUT WITH CSV HEADER'
            cur.copy_expert(sql, buffer)
            buffer.seek(0)
            
            Key = f"{today_str}/{csv_file}"
            
            s3_client.put_object(Bucket=Bucket, Key=Key, Body=buffer.getvalue())
            results.append(f"{table_name} のデータが S3 の {Key} にアップロードされました。")
        except Exception as e:
            results.append(f"{table_name} のアップロードに失敗しました: {e}")
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'body': "\n".join(results)
    }
