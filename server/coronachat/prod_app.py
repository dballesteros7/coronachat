import os

from coronachat.app import create_app
from coronachat.db import db

def build_database_uri():
    host = os.environ['RDS_HOSTNAME']
    port = os.environ['RDS_PORT']
    username = os.environ['RDS_USERNAME']
    password = os.environ['RDS_PASSWORD']
    db_name = os.environ['RDS_DB_NAME']
    return 'postgresql+psycopg2://%s:%s@%s:%s/%s' % (username, password, host, port, db_name)


class ProdConfig(object):
    SQLALCHEMY_DATABASE_URI = build_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = 'production'


app = create_app(ProdConfig)
app.debug = True

db.init_app(app)

application = app
