import unittest

from coronachat.storage.api import GENERIC_ERROR_MSG, NO_OPTION_FOUND_MSG, MessageReader
from coronachat.storage.schema import TopLevelMessage, TopLevelOption

_TEST_HEADER_CONTENT = """\
Welcome to your local government bot

Get information and guidance from use regarding the current
outbreak of coronavirus disease (COVID-19).

Reply with a number at any time to get the latest information
on any topic."""

_EXPECTED_TEST_DATA_TOP_LEVEL_MESSAGE = """\
%s
1. *Latest Update on Coronavirus in Switzerland*
2. What is Coronavirus and what are its symptoms
3. How does Coronavirus spread?
""" % _TEST_HEADER_CONTENT


def populate_with_test_data(session):
    session.add(
        TopLevelMessage(
            header_content=_TEST_HEADER_CONTENT,
            top_level_options=[
                TopLevelOption(
                    title='What is Coronavirus and what are its symptoms',
                    content='A bad thing',
                    position=1,
                ),
                TopLevelOption(
                    title='*Latest Update on Coronavirus in Switzerland*',
                    content='Things are going up, not the good things',
                    position=0,
                ),
                TopLevelOption(
                    title='How does Coronavirus spread?',
                    content='People',
                    position=2,
                )
            ]
        )
    )
    session.commit()


def test_get_formatted_top_level_message(session):
    populate_with_test_data(session)
    reader = MessageReader()

    top_level_message = reader.get_formatted_top_level_message()

    assert top_level_message == _EXPECTED_TEST_DATA_TOP_LEVEL_MESSAGE


def test_get_formatted_top_level_message_on_empty_table(session):
    reader = MessageReader()

    top_level_message = reader.get_formatted_top_level_message()

    assert top_level_message == GENERIC_ERROR_MSG


def test_get_option_message(session):
    populate_with_test_data(session)
    reader = MessageReader()

    option_message_1 = reader.get_option_message(1)
    option_message_3 = reader.get_option_message(3)

    assert option_message_1 == 'Things are going up, not the good things'
    assert option_message_3 == 'People'


def test_get_option_message_inexistent(session):
    populate_with_test_data(session)
    reader = MessageReader()

    option_message = reader.get_option_message(100)
    assert option_message == NO_OPTION_FOUND_MSG % 100
