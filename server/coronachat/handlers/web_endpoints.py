from flask import jsonify
from twilio.twiml.messaging_response import MessagingResponse

from coronachat.db import db
from coronachat.storage.api import AdminReader, MessageReader
from coronachat.storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE
from coronachat.storage.transforms import from_top_level_message_to_template


def register_endpoints(app):
    """"""
    @app.route('/getDefaultTemplate')
    def _get_default_template():
        # NOTE: Not proud of this hack but it works.
        db.session.add(DEFAULT_TOP_LEVEL_MESSAGE)
        template = from_top_level_message_to_template(
            DEFAULT_TOP_LEVEL_MESSAGE)
        db.session.rollback()
        return jsonify(template)

    @app.route('/getTemplate')
    def _get_template():
        reader = AdminReader()
        return jsonify(reader.get_top_level_message())

    @app.route('/inbound_message', methods=['POST'])
    def _reply_with_top_level():
        resp = MessagingResponse()

        # Add a message
        reader = MessageReader()
        resp.message(reader.get_formatted_top_level_message())

        return str(resp)
