import json
from slugify import slugify

with open("_data/cardpages.json", "r") as file:
    data = json.loads(file.read())

new_data = []
for collection in data:
    for card in collection['cards']:
        new_card = {
            'name_eng': card['name_eng'],
            'name_ita': card['name_ita'],
            'collection_name': slugify(collection['name_eng'])
        }
        if 'image_path' in card:
            new_card['image_path'] = card['image_path']

        if 'author' in card:
            new_card['author'] = card['author']

        new_data.append(new_card)

with open("_data/card-database.json", "w") as file:
    file.write(json.dumps(new_data))