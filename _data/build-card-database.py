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
            'image_path': card['image_path'],
            'confirmed': card['confirmed'],
            'collection_name': slugify(collection['name_eng'])
        }
        new_data.append(new_card)

with open("_data/card-database.json", "w") as file:
    file.write(json.dumps(new_data))