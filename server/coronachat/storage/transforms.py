"""Converter methods to move data between different formats.

This application assumes three data representation:

* Web Client: The Web client provides data in JSON form suitable for web.

* Frontend:   As data is processed in the server, an intermediate
              representation serves as a bridge between the storage-backed
              objects and the data transmitted to/from the web client.
            
* Storage:    The storage layer consist of SQLAlchemy ORM objects which are
              proxies to the underlying storage.

The methods in this module deal with transformations between the web client
and the frontend.

A top level message is represented in the web client as:

```json
{
  "header": "Header text before the options are presented.",
  "menuItems": [
      {
        "id": "Field not used at the moment",
        "title": "Title of the option shown in the top level message",
        "content": "The content of the message sent when the user selects it",
        "footerItems": [
            "Additional options shown",
            "When the option is selected",
        ]
      }
  ]
}
```

A top level message is represented in the frontend as:

```python
{
  'header_content': 'Header text before the options are presented.',
  'top_level_options': [
      {
        # 0-based index of the option order in the message.
        # The array is not necessarily sorted based on this value in this
        # representation.
        'position': 0,
        'title': 'Title of the option shown in the top level message',
        'content': 'The content of the message sent when the user selects it',
        'secondary_options': [
            {
                'content': 'When the option is selected',
                'position': 1,
            },
            {
                'content': 'Additional options shown',
                'position': 0,
            },
        ],
      },
  ]
}
```

The frontend representation matches the storage layer but it is expressed as
a dictionary instead of the ORM objects to avoid any interaction with the DB.
"""

from .schema import TopLevelMessage, TopLevelOption


def frontend_top_message_to_web_template(top_level_message: dict) -> dict:
    """Transforms a message from the web client to a frontend dictionary."""
    menu_items = []
    sorted_options = sorted(
        top_level_message['top_level_options'],
        key=lambda o: o['position']
    )

    for top_level_option in sorted_options:
        sorted_secondary_options = sorted(
            top_level_option['secondary_options'],
            key=lambda o: o['position']
        )
        footer_items = list(
            map(lambda o: o['content'], sorted_secondary_options)
        )

        menu_items.append({
            'id': 'nonsense',
            'title': top_level_option['title'],
            'content': top_level_option['content'],
            'footerItems': footer_items,
        })

    return {
        'header': top_level_message['header_content'],
        'menuItems': menu_items,
    }


def web_template_to_frontend_top_message(template: dict) -> dict:
    """Transforms a frontend top level message to the web template."""
    top_level_message = {}
    top_level_message['header_content'] = str(template['header']).strip()

    menu_items = list(template['menuItems'])
    top_level_message['top_level_options'] = []

    for idx, menu_item in enumerate(menu_items):
        title = str(menu_item['title']).strip()
        content = str(menu_item['content'])
        top_level_option = {
            'position': idx,
            'title': title,
            'content': content,
        }

        secondary_options = []
        for idx, secondary_option in enumerate(menu_item['footerItems']):
            content = str(secondary_option)
            secondary_options.append({
                'position': idx,
                'content': content,
            })
        top_level_option['secondary_options'] = secondary_options

        top_level_message['top_level_options'].append(top_level_option)
    return top_level_message


class TemplateParseException(Exception):
    status_code = 400

    def __init__(self):
        self.message = 'Failed to do something.'
