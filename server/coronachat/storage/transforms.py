from .schema import TopLevelMessage

def from_top_level_message_to_template(top_level_message: TopLevelMessage) -> dict:
    """
    """
    menu_items = []
    for top_level_option in top_level_message.top_level_options:
        menu_items.append({
            'id': top_level_option.position + 1,
            'title': top_level_option.title,
            'content': top_level_option.content,
            # TODO(dballest): Store footer items.
            'footerItems': [
                '📌 Escriba 0 para ir al Menú',
            ]
        })
    return {
        'header': top_level_message.header_content,
        'menuItems': menu_items,
    }

