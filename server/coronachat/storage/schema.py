"""A very basic schema for providing the messages available in the Chatbots.

The tables are:

organizations: This table holds the organizations that we support. For now,
it only holds a name and a reference to the id of the top-level message to
be displayed in response to user queries.
Columns: id | name | top_level_message_id

top_level_messages: This table holds the top level messages for each
supported organization. Each top level message is unique to each
organization so this is a 1:1 relationship. Each top level message
has multiple top level options in a 1:N relationship.
Columns: id | header_content

top_level_options: This table holds the top level options to be
displayed along with the top level message. Each option has
a title that is displayed with the top-level message and some
content that is displayed when the option is selected.
The display order of the options in the associated top-level
message is also stored here.
Columns: id | title | content | position | top_level_message_id
"""
from coronachat.db import db


class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    top_level_message_id = db.Column(
        db.Integer, db.ForeignKey('top_level_messages.id'))
    top_level_message = db.relationship(
        'TopLevelMessage', back_populates='organization')

    def __repr__(self):
        return "<Organization(name='%s')>" % self.name


class TopLevelMessage(db.Model):
    __tablename__ = 'top_level_messages'

    id = db.Column(db.Integer, primary_key=True)
    header_content = db.Column(db.String)

    organization = db.relationship(
        'Organization',
        uselist=False,
        back_populates='top_level_message',
    )

    top_level_options = db.relationship(
        'TopLevelOption',
        uselist=True,
        back_populates='top_level_message',
        cascade='save-update, merge, delete',
    )


class TopLevelOption(db.Model):
    __tablename__ = 'top_level_options'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    position = db.Column(db.Integer)

    top_level_message_id = db.Column(
        db.Integer, db.ForeignKey('top_level_messages.id'))
    top_level_message = db.relationship(
        'TopLevelMessage',
        back_populates='top_level_options',
    )

    secondary_options = db.relationship(
        'SecondaryOption',
        uselist=True,
        back_populates='top_level_option',
        cascade='save-update, merge, delete',
    )


class SecondaryOption(db.Model):
    __tablename__ = 'secondary_option'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    position = db.Column(db.Integer)

    top_level_option_id = db.Column(
        db.Integer, db.ForeignKey('top_level_options.id'))
    top_level_option = db.relationship(
        'TopLevelOption',
        back_populates='secondary_options',
    )
