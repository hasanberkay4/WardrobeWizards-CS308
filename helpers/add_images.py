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
import random 

images = ['short-basic-4.jpg', 'tshirt3.jpg', 'tshirt-creative-9.jpg', 'bag-6.jpg', 'tshirt-basic-red.jpg', 'bag-7.jpg', 'tshirt-creative-8.jpg', 'tshirt2.jpg', 'sweatshirt-basic-1.jpg', 'short-basic-5.jpg', 'sweatshirt-basic-3.jpg', 'bag-5.jpg', 'bag-4.jpg', 'tshirt1.jpg', 'sweatshirt-basic-2.jpg', 'favicon.ico', 'sweatshirt-basic-6.jpg', 'short-basic-2.jpg', 'tshirt5.jpg', 'bag-1.jpg', 'tshirt4.jpg', 'short-basic-3.jpg', 'sweatshirt-basic-10.jpg', 'sweatshirt-basic-7.jpg', 'short-basic-1.jpg', 'sweatshirt-basic-5.jpg', 'tshirt6.jpg', 'bag-3.jpg', 'bag-2.jpg', 'sweatshirt-basic-4.jpg', 'tshirt-creative-14.jpg', 'jacket-basic-4.jpg', 'tshirt-basic-storm.jpg', '713.png', '712.png', 'jacket-basic-5.jpg', 'tshirt-creative-15.jpg', 'tshirt-creative-17.jpg', 'jacket-basic-6.jpg', 'tshirt-creative-16.jpg', 'short-casual-2.jpg', 'jacket-basic-2.jpg', 'tshirt-creative-12.jpg', 'tank1.jpg', 'tshirt-creative-13.jpg', 'jacket-basic-3.jpg', 'short-casual-1.jpg', 'jacket-basic-1.jpg', 'tshirt-creative-11.jpg', 'tank2.jpg', 'short-casual-3.jpg.jpg', 'tshirt-creative-10.jpg', 'jacket-casual-3.jpg', 'bag1.jpg', 'picsum.jpg', 'tshirt-creative-20.jpg', 'jacket-casual-2.jpg', 'bag2.jpg', 'bag3.jpg', 'jacket-casual-1.jpg', 'sweatshirt1.jpg', 'sweatshirt2.jpg', 'tshirt-creative-18.jpg', 'tshirt-creative-19.jpg', 'sweatshirt3.jpg', 'sweatshirt-basic-9.jpg', 'tshirt-creative-1.jpg', 'sweatshirt-basic-8.jpg', 'jacket2.jpg', 'tshirt-basic-black.jpg', 'tshirt-creative-3.jpg', 'tshirt-creative-2.jpg', 'jacket1.jpg', 'tshirt-creative-6.jpg', 'bere3.jpg', 'bere2.jpg', 'tshirt-creative-7.jpg', 'pant1.jpg', 'images.png', 'tshirt-basic-mint.jpg', 'tshirt-creative-5.jpg', 'bere1.jpg', 'tshirt-creative-4.jpg']

with open('./test.products.json') as json_file:
    data = json.load(json_file)

    # choose a random image for each product from images array
    for product in data:
        product['image'] = 'http://localhost:5001/images/' + random.choice(images)

    # remove categories field
    for product in data:
        # get categories from product['categories']
        model = product['categories']['model']
        color = product['categories']['color']
        size = product['categories']['size']

        product['category_ids'] = [model, color, size]

        del product['categories']

with open('./test.products.json', 'w') as outfile:

    # generate only 25 products
    # json.dump(data[:25], outfile, indent=4)

    json.dump(data[:25], outfile, indent=4)


