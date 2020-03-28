from flask import Flask

def create_app(config_object) -> Flask:
    """Creates a new Flask application according to the config.

    This is called from two places:
      * The server's entry point.
      * Testing fixtures.
    """
    app = Flask(__name__.split('.')[0])
    app.config.from_object(config_object)
    return app