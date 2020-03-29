from .app import create_app
from .db import db
from coronachat.storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE

class DevConfig(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = 'development'

app = create_app(DevConfig)

db.init_app(app)

# For development, we always start with an empty DB.
# The DB is seeded with the default template.
    
with app.app_context():
    db.create_all()
    db.session.add(DEFAULT_TOP_LEVEL_MESSAGE)
    db.session.commit()