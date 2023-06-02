# add 'imageURL' field to each document in the collection
# imageURL = 'http://localhost:5001/images/' + 'model' + 'color' + '.png'
# model = categories[model] field in the document 
# color = categories[color] field in the document
# categories = json file with the categories

# product example:
"""
{
  "name": "Red Tshirt L",
  "description": "This is a Red Tshirt L",
  "categories": {
    "color": "red",
    "model": "tshirt",
    "size": "l"
  },
  "initial_price": 350,
  "stock_quantity": 47,
  "popularity": 56,
  "rating": 2,
  "number_of_ratings": 3,
  "warranty_status": false,
  "expense": 37,
  "discountRate": 50,
  "warrant_status": false
}
"""


import json



with open('./test.deliveries.json') as json_file:
    data = json.load(json_file)

with open('./test.deliveries.json', 'w') as outfile:

    # generate only 25 products
    # json.dump(data[:25], outfile, indent=4)

    json.dump(data[:50], outfile, indent=4)


