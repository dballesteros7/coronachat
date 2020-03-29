import os

from .app import create_app
from .db import db
from .storage.api import AdminWriter
from .storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE


def build_database_uri():
    host = os.environ['RDS_HOSTNAME']
    port = os.environ['RDS_PORT']
    username = os.environ['RDS_USERNAME']
    password = os.environ['RDS_PASSWORD']
    db_name = os.environ['RDS_DB_NAME']
    return 'mysql://%s:%s:%d@%s/%s' % (username, password, host, port, db_name)


class ProdConfig(object):
    SQLALCHEMY_DATABASE_URI = build_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = 'production'


app = create_app(ProdConfig)

db.init_app(app)
db.create_all()

writer = AdminWriter()
writer.update_top_level_message(DEFAULT_TOP_LEVEL_MESSAGE)
