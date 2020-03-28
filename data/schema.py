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
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Organization(Base):
     __tablename__ = 'organizations'

     id = Column(Integer, primary_key=True)
     name = Column(String)

     top_level_message_id = Column(Integer, ForeignKey('top_level_messages.id'))
     top_level_message = relationship('TopLevelMessage', back_populates='organization')

     def __repr__(self):
        return "<Organization(name='%s')>" % self.name

class TopLevelMessage(Base):
   __tablename__ = 'top_level_messages'

   id = Column(Integer, primary_key=True)
   header_content = Column(String)

   organization = relationship('Organization', uselist=False, back_populates='top_level_message')

   top_level_options = relationship('TopLevelOption', uselist=True, back_populates='top_level_message')

class TopLevelOption(Base):
   __tablename__ = 'top_level_options'

   id = Column(Integer, primary_key=True)
   title = Column(String)
   content = Column(String)
   position = Column(Integer)

   top_level_message_id = Column(Integer, ForeignKey('top_level_messages.id'))
   top_level_message = relationship('TopLevelMessage', back_populates='top_level_options')
   
