import string

from flask import abort, jsonify, request
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from twilio.twiml.messaging_response import MessagingResponse

from ..db import db
from ..storage.api import AdminReader, AdminWriter, MessageReader, check_login, get_organization, load_logged_in_user
from ..storage.default_data import DEFAULT_TOP_LEVEL_MESSAGE
from ..storage.transforms import (web_template_to_frontend_top_message,
                                  frontend_top_message_to_web_template)

login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return load_logged_in_user(user_id)


def register_endpoints(app):
    """"""
    @app.route('/getDefaultTemplate')
    def _get_default_template():
        template = frontend_top_message_to_web_template(
            DEFAULT_TOP_LEVEL_MESSAGE)
        return jsonify(template)

    @app.route('/getTemplate')
    @login_required
    def _get_template():
        reader = AdminReader()
        frontend_top_level_message = reader.get_top_level_message(current_user)
        if frontend_top_level_message is None:
            abort(404, 'No message found for the organization.')
        return jsonify(
            frontend_top_message_to_web_template(
                frontend_top_level_message
            )
        )

    @app.route('/updateTemplate', methods=['POST', 'PUT'])
    @login_required
    def _update_template():
        json_data = request.get_json()
        if json_data is None:
            raise Exception('Bad stuff going on here.')

        writer = AdminWriter()
        top_level_message_dict = web_template_to_frontend_top_message(
            json_data)
        writer.update_top_level_message(top_level_message_dict, current_user)
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

    @app.route('/login', methods=['POST'])
    def _login():
        json_data = request.get_json()
        if json_data is None:
            raise Exception('Invalid payload.')
        logged_in_user = check_login(
            json_data['username'].strip(),
            json_data['password']
        )
        if not logged_in_user:
            abort(401)

        result = login_user(logged_in_user)
        if not result:
            abort(401)

        return jsonify(status='OK')

    @app.route('/organization', methods=['GET'])
    @login_required
    def _get_organization():
        org = get_organization(current_user)
        return jsonify(org)

    @app.route('/user', methods=['GET'])
    @login_required
    def _get_user():
        org_user = current_user.backend_user
        return {
            'username': org_user.username,
            'email': org_user.email,
        }

    @app.route('/logout', methods=['POST'])
    @login_required
    def _logout():
        logout_user()
        return jsonify(status='OK')
