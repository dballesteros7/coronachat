import string

from flask import jsonify, request
from twilio.twiml.messaging_response import MessagingResponse

from ..db import db
from ..storage.api import AdminReader, AdminWriter, MessageReader
from ..storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE
from ..storage.transforms import (web_template_to_frontend_top_message,
                                  frontend_top_message_to_web_template)


def register_endpoints(app):
    """"""
    @app.route('/getDefaultTemplate')
    def _get_default_template():
        template = frontend_top_message_to_web_template(
            DEFAULT_TOP_LEVEL_MESSAGE)
        return jsonify(template)

    @app.route('/getTemplate')
    def _get_template():
        reader = AdminReader()
        frontend_top_level_message = reader.get_top_level_message()
        return jsonify(
            frontend_top_message_to_web_template(
                frontend_top_level_message
            )
        )

    @app.route('/updateTemplate', methods=['POST', 'PUT'])
    def _update_template():
        json_data = request.get_json()
        if json_data is None:
            raise Exception('Bad stuff going on here.')

        writer = AdminWriter()
        top_level_message_dict = web_template_to_frontend_top_message(
            json_data)
        writer.update_top_level_message(top_level_message_dict)
        return jsonify(status='OK')

    @app.route('/inbound_message', methods=['POST'])
    def _reply_with_top_level():
        body = request.values.get('Body', None)
        stripped_body = body.strip(string.ascii_letters)
        try:
            option_number = int(stripped_body)
        except ValueError:
            option_number = 0

        reader = MessageReader()
        resp = MessagingResponse()
        if reader.has_option(option_number):
            resp.message(reader.get_option_message(option_number))
        else:
            resp.message(reader.get_formatted_top_level_message())

        return str(resp)
