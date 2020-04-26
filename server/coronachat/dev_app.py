from .app import create_app
from .db import db
from .storage.api import AdminWriter, LoggedInUser
from .storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE, default_organization


class DevConfig(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2:///test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = 'development'


app = create_app(DevConfig)
app.secret_key = b'Very secret key'

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
