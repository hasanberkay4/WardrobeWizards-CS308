import json

# this script is for populating the database for colors of products

colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "silver",
    "gold",
    "bronze",
    "copper",
    "rose gold",
    "rainbow",
    "multi-color",
    "clear",
    "transparent",
    "neon",
    "glow-in-the-dark",
]

# create a json file: [{"name": "Red", "slug": "red"}, {"name": "Blue", "slug": "blue"}, ...]
colors_json = []
for color in colors:
    colors_json.append({"name": color.capitalize(), "slug": color})

with open('colors.json', 'w') as f:
    json.dump(colors_json, f)

print("Colors have been saved to 'colors.json'")
