"""APIs to communicate with the underlying message storage."""
from flask_login import UserMixin
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound

from ..db import db
from .schema import Organization, OrganizationUser, SecondaryOption, TopLevelMessage, TopLevelOption

# TODO(dballest): Make this into a localization class with scopes.
if '_' not in globals():
    def _(msg): return msg

# NOTE: Error message when something went wrong and we don't
# know why.
GENERIC_ERROR_MSG = _('Something went wrong! oh well, bye')

NO_OPTION_FOUND_MSG = _('There is no option number %d')


class LoggedInUser(UserMixin):
    backend_user: OrganizationUser()

    def __init__(self, backend_user: OrganizationUser):
        assert backend_user is not None
        self.backend_user = backend_user

    @property
    def id(self) -> int:
        return self.backend_user.id


class AdminReader(object):
    def get_top_level_message(self, logged_in_user: LoggedInUser) -> dict:
        top_level_message = logged_in_user.backend_user.organization.top_level_message
        if top_level_message is None:
            return None

        frontend_top_level_options = []
        for top_level_option in top_level_message.top_level_options:
            frontend_secondary_options = []
            for secondary_option in top_level_option.secondary_options:
                frontend_secondary_options.append({
                    'position': secondary_option.position,
                    'content': secondary_option.content,
                })
            frontend_top_level_options.append({
                'position': top_level_option.position,
                'title': top_level_option.title,
                'content': top_level_option.content,
                'secondary_options': frontend_secondary_options,
            })

        frontend_top_level_message = {
            'header_content': top_level_message.header_content,
            'top_level_options': frontend_top_level_options
        }
        return frontend_top_level_message


class AdminWriter(object):
    def update_top_level_message(self, top_level_message_dict: dict, logged_in_user: LoggedInUser):
        # We clear all existing options associated with the top level message
        # since the client is not sending a delta of the updates.
        # NOTE: We are still assuming there is a single top_level_message
        stored_top_level_message = logged_in_user.backend_user.organization.top_level_message
        if stored_top_level_message is not None:
            db.session.delete(stored_top_level_message)
            db.session.add(logged_in_user.backend_user.organization)
            logged_in_user.backend_user.organization.top_level_message_id = None

        top_level_options = []
        for top_level_option in top_level_message_dict['top_level_options']:
            secondary_options = []
            for secondary_option in top_level_option['secondary_options']:
                secondary_options.append(
                    SecondaryOption(
                        position=secondary_option['position'],
                        content=secondary_option['content'],
                    )
                )

            top_level_options.append(
                TopLevelOption(
                    position=top_level_option['position'],
                    title=top_level_option['title'],
                    content=top_level_option['content'],
                    secondary_options=secondary_options,
                )
            )

        top_level_message = TopLevelMessage(
            header_content=top_level_message_dict['header_content'],
            top_level_options=top_level_options,
        )

        db.session.add(top_level_message)
        db.session.commit()

        db.session.add(logged_in_user.backend_user.organization)
        logged_in_user.backend_user.organization.top_level_message_id = top_level_message.id
        db.session.commit()


class MessageReader(object):
    """Read-only API to get the messages to send to users chatting with the bot.

    This API is only meant to be used for sending messages or responding to
    user messages. It is not meant to be used for the web UI.

    This API is strictly read-only as users chatting with the bot have no
    way of modifying the state of the system.
    """

    def get_formatted_top_level_message(self) -> str:
        """Reads and formats the top level message and options from storage.

        Returns:
            A formatted version of the top-level message including the available
            top level options in the right order.

            The formatted string looks something like:

            The header of the message as stored in the DB goes first
            this may be split across multiple lines and
            has no interactive parts. This is followed by a hardcoded
            message saying "reply with a number ..."

            Reply with a number at any time to get the latest information
            on any topic.

            1. Option 1 title
            2. Another option title
            3. ...
            4. Profit
        """
        top_level_message = TopLevelMessage.query.first()
        if top_level_message is None:
            return GENERIC_ERROR_MSG
        top_level_content = top_level_message.header_content
        message = top_level_content.strip()
        message += '\n\n'
        for idx, option in enumerate(
            sorted(
                top_level_message.top_level_options, key=lambda x: x.position
            )
        ):
            message += '%d.    %s\n' % (idx + 1, option.title.strip())
        return message

    def has_option(self, option_number: int) -> bool:
        """
        """
        try:
            option = TopLevelOption.query.filter(
                TopLevelOption.position == option_number - 1).one_or_none()
            return option is not None
        except MultipleResultsFound:
            return False

    def get_option_message(self, option_number: int) -> str:
        """Reads and formats a top level option message.

        This method assumes a 1-based index for option_number as this is what
        regular users understand.

        Returns:
            The formatted message to send back to the user when they text
            the number of the top level option.
        """
        try:
            option: TopLevelOption = TopLevelOption.query.filter(
                TopLevelOption.position == option_number - 1).one()
            message = option.content.strip()

            # if not message.endswith('\n') and len(option.secondary_options) > 0:
            #     message += '\n'

            # for secondary_option in sorted(
            #         option.secondary_options, key=lambda o: o.position):
            #     message += '%s\n' % secondary_option.content.strip()

            return message
        except NoResultFound:
            return NO_OPTION_FOUND_MSG % option_number
        except MultipleResultsFound:
            return GENERIC_ERROR_MSG


def load_logged_in_user(user_id: str) -> LoggedInUser:
    try:
        org_user = OrganizationUser.query.filter(
            OrganizationUser.id == int(user_id),
        ).one()
        return LoggedInUser(org_user)
    except NoResultFound:
        return None
    except MultipleResultsFound:
        raise Exception('Unexpected database state.')


def check_login(username: str, password: str) -> LoggedInUser:
    try:
        org_user = OrganizationUser.query.filter(
            OrganizationUser.username == username,
            OrganizationUser.password == password).one()
        return LoggedInUser(org_user)
    except NoResultFound:
        return None
    except MultipleResultsFound:
        raise Exception('Unexpected database state.')


def get_organization(logged_in_user: LoggedInUser) -> dict:
    org = Organization.query.get(logged_in_user.backend_user.id)
    return {
        'name': org.name,
    }
