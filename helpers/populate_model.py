import json

# this script is for populating the database for models of products (clothing)

models = [
    "t-shirt",
    "tank top",
    "long sleeve",
    "sweatshirt",
    "hoodie",
    "jacket",
    "coat",
    "dress",
    "skirt",
    "shorts",
    "pants",
    "jeans",
    "leggings",
    "joggers",
    "sweatpants",
    "sweatshorts",
]

# create a json file: [{"name": "tank top", "slug": "tank_top"}, {"name": "Coat", "slug": "coat"}, ...]
models_json = []
for model in models:
    models_json.append({"name": model.capitalize(), "slug": model.replace(" ", "_")})

with open('models.json', 'w') as f:
    json.dump(models_json, f)

print("Models have been saved to 'models.json'")