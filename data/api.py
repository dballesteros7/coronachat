"""APIs to communicate with the underlying message storage."""

from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound

from .schema import TopLevelMessage, TopLevelOption

# TODO(dballest): Make this into a localization class with scopes.
if '_' not in globals():
    def _(msg): return msg

# NOTE: Error message when something went wrong and we don't
# know why.
GENERIC_ERROR_MSG = _('Something went wrong! oh well, bye')

TOP_LEVEL_MSG = _("""\
%s

Reply with a number at any time to get the latest information
on any topic.

""")

NO_OPTION_FOUND_MSG = _('There is no option number %d')


class MessageReader(object):
    """Read-only API to get the messages to send to users chatting with the bot.

    This API is only meant to be used for sending messages or responding to
    user messages. It is not meant to be used for the web UI.

    This API is strictly read-only as users chatting with the bot have no
    way of modifying the state of the system.
    """

    def get_formatted_top_level_message(self, session: Session) -> str:
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
        top_level_message = session.query(TopLevelMessage).first()
        if top_level_message is None:
            return GENERIC_ERROR_MSG
        top_level_content = top_level_message.header_content
        result_msg = TOP_LEVEL_MSG % top_level_content
        for idx, option in enumerate(
            sorted(
                top_level_message.top_level_options, key=lambda x: x.position
            )
        ):
            result_msg += '%d. %s\n' % (idx + 1, option.title)
        return result_msg

    def get_option_message(self, session: Session, option_number: int) -> str:
        """Reads and formats a top level option message.

        This method assumes a 1-based index for option_number as this is what
        regular users understand.

        Returns:
            The formatted message to send back to the user when they text 
            the number of the top level option.
        """
        try:
            option: TopLevelOption = session.query(TopLevelOption).filter(
                TopLevelOption.position == option_number - 1).one()
            return option.content
        except NoResultFound:
            return NO_OPTION_FOUND_MSG % option_number
        except MultipleResultsFound:
            return GENERIC_ERROR_MSG
