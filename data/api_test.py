import unittest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .api import GENERIC_ERROR_MSG, NO_OPTION_FOUND_MSG, MessageReader
from .schema import Base, TopLevelMessage, TopLevelOption

_TEST_HEADER_CONTENT = """\
Welcome to your local government bot

Get information and guidance from use regarding the current
outbreak of coronavirus disease (COVID-19)."""

_EXPECTED_TEST_DATA_TOP_LEVEL_MESSAGE = """\
%s

Reply with a number at any time to get the latest information
on any topic.

1. *Latest Update on Coronavirus in Switzerland*
2. What is Coronavirus and what are its symptoms
3. How does Coronavirus spread?
""" % _TEST_HEADER_CONTENT


class TestMessageReader(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        engine = create_engine('sqlite:///:memory:', echo=True)
        Base.metadata.create_all(engine)
        cls.session_maker = sessionmaker(bind=engine)

    def setUp(self):
        self.session = self.__class__.session_maker()

    def tearDown(self):
        self.session.query(TopLevelOption).delete()
        self.session.query(TopLevelMessage).delete()
        self.session.commit()

    def populate_with_test_data(self):
        self.session.add(
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
        self.session.commit()

    def test_get_formatted_top_level_message(self):
        self.populate_with_test_data()
        reader = MessageReader()

        top_level_message = reader.get_formatted_top_level_message(
            self.session)

        self.assertEqual(
            top_level_message,
            _EXPECTED_TEST_DATA_TOP_LEVEL_MESSAGE
        )

    def test_get_formatted_top_level_message_on_empty_table(self):
        reader = MessageReader()

        top_level_message = reader.get_formatted_top_level_message(
            self.session)

        self.assertEqual(
            top_level_message,
            GENERIC_ERROR_MSG
        )

    def test_get_option_message(self):
        self.populate_with_test_data()
        reader = MessageReader()

        option_message_1 = reader.get_option_message(self.session, 1)
        self.assertEqual(
            option_message_1,
            'Things are going up, not the good things'
        )

        option_message_3 = reader.get_option_message(self.session, 3)
        self.assertEqual(
            option_message_3,
            'People'
        )

    def test_get_option_message_inexistent(self):
        self.populate_with_test_data()
        reader = MessageReader()

        option_message = reader.get_option_message(self.session, 100)
        self.assertEqual(
            option_message,
            NO_OPTION_FOUND_MSG % 100
        )


if __name__ == '__main__':
    unittest.main()
