# format of products
"""
_id
6479f602c57a9b157ec67e7f
name
"Blue Shorts XS"
description
"This is a Blue Shorts XS"
initial_price
303
stock_quantity
64
popularity
31
rating
2
number_of_ratings
64
warranty_status
true
expense
84
discountRate
93
image
"http://localhost:5001/images/tshirt-basic-red.jpg"

category_ids
Array
0
"shorts"
1
"blue"
2
"xs"
number_of_voters
3

"""



# names of images of products
images = [
    """
    bag-1.jpg               jacket-basic-3.jpg      short-casual-2.jpg      tank2.jpg               tshirt-creative-2.jpg
    bag-2.jpg               jacket-basic-4.jpg      short-casual-3.jpg.jpg  tshirt-basic-black.jpg  tshirt-creative-20.jpg
    bag-3.jpg               jacket-basic-5.jpg      sweatshirt-basic-1.jpg  tshirt-basic-mint.jpg   tshirt-creative-3.jpg
    bag-4.jpg               jacket-basic-6.jpg      sweatshirt-basic-10.jpg tshirt-basic-red.jpg    tshirt-creative-4.jpg
    bag-5.jpg               jacket-casual-1.jpg     sweatshirt-basic-2.jpg  tshirt-basic-storm.jpg  tshirt-creative-5.jpg
    bag-6.jpg               jacket-casual-2.jpg     sweatshirt-basic-3.jpg  tshirt-creative-1.jpg   tshirt-creative-6.jpg
    bag-7.jpg               jacket-casual-3.jpg     sweatshirt-basic-4.jpg  tshirt-creative-10.jpg  tshirt-creative-7.jpg
    bag1.jpg                jacket1.jpg             sweatshirt-basic-5.jpg  tshirt-creative-11.jpg  tshirt-creative-8.jpg
    bag2.jpg                jacket2.jpg             sweatshirt-basic-6.jpg  tshirt-creative-12.jpg  tshirt-creative-9.jpg
    bag3.jpg                pant1.jpg               sweatshirt-basic-7.jpg  tshirt-creative-13.jpg  tshirt1.jpg
    bere1.jpg               short-basic-1.jpg       sweatshirt-basic-8.jpg  tshirt-creative-14.jpg  tshirt2.jpg
    bere2.jpg               short-basic-2.jpg       sweatshirt-basic-9.jpg  tshirt-creative-15.jpg  tshirt3.jpg
    bere3.jpg               short-basic-3.jpg       sweatshirt1.jpg         tshirt-creative-16.jpg  tshirt4.jpg
    images.png              short-basic-4.jpg       sweatshirt2.jpg         tshirt-creative-17.jpg  tshirt5.jpg
    jacket-basic-1.jpg      short-basic-5.jpg       sweatshirt3.jpg         tshirt-creative-18.jpg  tshirt6.jpg
    jacket-basic-2.jpg      short-casual-1.jpg      tank1.jpg               tshirt-creative-19.jpg
    """
]


# categories
"""
[{
  "name": "Yellow",
  "slug": "yellow"
},
{
  "name": "Pink",
  "slug": "pink"
},
{
  "name": "Blue",
  "slug": "blue"
},
{
  "name": "White",
  "slug": "white"
},
{
  "name": "Red",
  "slug": "red"
},
{
  "name": "Gray",
  "slug": "gray"
},
{
  "name": "Green",
  "slug": "green"
},
{
  "name": "Orange",
  "slug": "orange"
},
{
  "name": "Purple",
  "slug": "purple"
},
{
  "name": "Black",
  "slug": "black"
},
{
  "name": "T-shirt",
  "slug": "t-shirt"
},
{
  "name": "Hoodie",
  "slug": "hoodie"
},
{
  "name": "Jacket",
  "slug": "jacket"
},
{
  "name": "Coat",
  "slug": "coat"
},
{
  "name": "Dress",
  "slug": "dress"
},
{
  "name": "Skirt",
  "slug": "skirt"
},
{
  "name": "Shorts",
  "slug": "shorts"
},
{
  "name": "Bag",
  "slug": "bag"
},
{
  "name": "Pants",
  "slug": "pants"
},
{
  "name": "S",
  "slug": "s"
},
{
  "name": "M",
  "slug": "m"
},
{
  "name": "L",
  "slug": "l"
},
{
  "name": "XS",
  "slug": "xs"
},
{
  "name": "XXL",
  "slug": "xxl"
},
{
  "name": "XL",
  "slug": "xl"
}]
"""

import random
import string
import json

# List of adjectives for product descriptions
adjectives = ["Beautiful", "Stylish", "Trendy", "Casual", "Chic", "Comfortable", "Elegant", "Sophisticated", "Durable", "Versatile"]

# Categories
categories_json = """
[{
  "name": "Yellow",
  "slug": "yellow"
},
{
  "name": "Pink",
  "slug": "pink"
},
{
  "name": "Blue",
  "slug": "blue"
},
{
  "name": "White",
  "slug": "white"
},
{
  "name": "Red",
  "slug": "red"
},
{
  "name": "Gray",
  "slug": "gray"
},
{
  "name": "Green",
  "slug": "green"
},
{
  "name": "Orange",
  "slug": "orange"
},
{
  "name": "Purple",
  "slug": "purple"
},
{
  "name": "Black",
  "slug": "black"
},
{
  "name": "T-shirt",
  "slug": "t-shirt"
},
{
  "name": "Hoodie",
  "slug": "hoodie"
},
{
  "name": "Jacket",
  "slug": "jacket"
},
{
  "name": "Coat",
  "slug": "coat"
},
{
  "name": "Dress",
  "slug": "dress"
},
{
  "name": "Skirt",
  "slug": "skirt"
},
{
  "name": "Shorts",
  "slug": "shorts"
},
{
  "name": "Bag",
  "slug": "bag"
},
{
  "name": "Pants",
  "slug": "pants"
},
{
  "name": "S",
  "slug": "s"
},
{
  "name": "M",
  "slug": "m"
},
{
  "name": "L",
  "slug": "l"
},
{
  "name": "XS",
  "slug": "xs"
},
{
  "name": "XXL",
  "slug": "xxl"
},
{
  "name": "XL",
  "slug": "xl"
}]
"""
categories = json.loads(categories_json)

# Separate all image names into a list
image_names = [img for sublist in [images_line.split() for images_line in images] for img in sublist]

products = [] # List to store all product information

for image in image_names:
    product = {}  # Dictionary to store individual product information

    product['name'] = image.split(".")[0].replace("-", " ").title()  # Use the image name as product name, formatted nicely
    product['description'] = f"This is a {random.choice(adjectives)} {product['name']}"  # Use an adjective and the name in the description
    product['initial_price'] = random.randint(100, 1000)  # Set a random price between 100 and 1000
    product['stock_quantity'] = random.randint(10, 200)  # Set a random stock quantity between 10 and 200
    product['popularity'] = random.randint(1, 100)  # Set a random popularity value between 1 and 100
    product['rating'] = round(random.uniform(1, 5), 2)  # Set a random rating between 1 and 5 (inclusive), rounded to 2 decimal places
    product['number_of_ratings'] = random.randint(1, 500)  # Set a random number of ratings between 1 and 500
    product['warranty_status'] = random.choice([True, False])  # Randomly choose a warranty status
    product['expense'] = round(product['initial_price'] * 0.7)  # Calculate expense as 70% of the initial price
    product['discountRate'] = random.randint(1, 50)  # Set a random discount rate between 1 and 50
    product['image'] = f"http://localhost:5001/images/{image}"  # Create a URL using the image name
    
    # Select 1-3 random category_ids from the categories list
    product['category_ids'] = [category['slug'] for category in random.choices(categories, k=random.randint(1, 3))]

    product['number_of_voters'] = random.randint(1, 50)  # Set a random number of voters between 1 and 50

    products.append(product)

for product in products:
    print(product)

# Write the list of products to a JSON file
with open('products.json', 'w') as json_file:
    json.dump(products, json_file, indent=4)
