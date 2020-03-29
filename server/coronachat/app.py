from flask import Flask
from flask_cors import CORS

from .handlers.web_endpoints import register_endpoints

def create_app(config_object) -> Flask:
    """Creates a new Flask application according to the config.

    This is called from two places:
      * The server's entry point.
      * Testing fixtures.
    """
    app = Flask(__name__.split('.')[0])
    app.config.from_object(config_object)
    
    CORS(app)
    register_endpoints(app)

    return app