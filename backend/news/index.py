import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление новостями сервера (получение, добавление, редактирование, удаление)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        if method == 'GET':
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('SELECT id, title, description, date, icon FROM news ORDER BY created_at DESC')
                news = cur.fetchall()
                
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(news, ensure_ascii=False)
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            title = body.get('title', '')
            description = body.get('description', '')
            date = body.get('date', '')
            icon = body.get('icon', 'Sparkles')
            
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO news (title, description, date, icon) VALUES (%s, %s, %s, %s) RETURNING id",
                    (title, description, date, icon)
                )
                news_id = cur.fetchone()[0]
                conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': news_id, 'message': 'Новость создана'}, ensure_ascii=False)
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            news_id = body.get('id')
            title = body.get('title')
            description = body.get('description')
            date = body.get('date')
            icon = body.get('icon', 'Sparkles')
            
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE news SET title = %s, description = %s, date = %s, icon = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
                    (title, description, date, icon, news_id)
                )
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Новость обновлена'}, ensure_ascii=False)
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            news_id = params.get('id')
            
            with conn.cursor() as cur:
                cur.execute('DELETE FROM news WHERE id = %s', (news_id,))
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Новость удалена'}, ensure_ascii=False)
            }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        conn.close()
