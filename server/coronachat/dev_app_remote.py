import os

from coronachat.app import create_app
from coronachat.db import db
from coronachat.storage.api import AdminWriter, LoggedInUser
from coronachat.storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE, default_organization


def build_database_uri():
    host = os.environ['RDS_HOSTNAME']
    port = os.environ['RDS_PORT']
    username = os.environ['RDS_USERNAME']
    password = os.environ['RDS_PASSWORD']
    db_name = os.environ['RDS_DB_NAME']
    return 'postgresql+psycopg2://%s:%s@%s:%s/%s' % (username, password, host, port, db_name)


class DevConfig(object):
    SQLALCHEMY_DATABASE_URI = build_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = 'development'
    DEBUG = True
    SECRET_KEY = os.environ['SECRET_KEY']


print('URL: %s' % build_database_uri())

app = create_app(DevConfig)
db.init_app(app)

# For development, we always start with an empty DB.
# The DB is seeded with the default template.
with app.app_context():
    db.drop_all()
    db.create_all()

    with db.engine.connect() as conn:
        statement = db.text('CREATE EXTENSION IF NOT EXISTS pgcrypto')
        conn.execute(statement)

    db.session.add(default_organization)
    db.session.commit()

    fake_logged_in_user = LoggedInUser(
        default_organization.users[0],
    )

    writer = AdminWriter()
    writer.update_top_level_message(
        DEFAULT_TOP_LEVEL_MESSAGE, fake_logged_in_user)

application = app
