import json

# Load JSON data
with open('deliveries.json') as f:
    deliveries = json.load(f)

# Prepare a default product
default_product = {
    "_id": "",
    "name": "",
    "description": "",
    "model": "",
    "color": "",
    "stock_quantity": 0,
    "initial_price": 0,
    "expense": 0,
    "image": "",
    "popularity": 0,
    "category_ids": [],
    "rating": 0,
    "number_of_voters": 0,
    "warrant_status": False,
    "discountRate": 0,
}

# Iterate over each item in the list
for delivery in deliveries:
    # Check if each field exists, if not add a default value
    if '_id' not in delivery:
        delivery['_id'] = ''
    if 'deliveryAddress' not in delivery:
        delivery['deliveryAddress'] = ''
    if 'customerId' not in delivery:
        delivery['customerId'] = ''
    if 'quantity' not in delivery:
        delivery['quantity'] = 0
    if 'totalPrice' not in delivery:
        delivery['totalPrice'] = 0
    if 'status' not in delivery:
        delivery['status'] = ''
    if 'date' not in delivery:
        delivery['date'] = ''
    if 'products' not in delivery:
        delivery['products'] = [default_product]
    else:
        for product in delivery['products']:
            for key in default_product:
                if key not in product:
                    product[key] = default_product[key]
    if '__v' not in delivery:
        delivery['__v'] = 0
    if 'pdfUrl' not in delivery:
        delivery['pdfUrl'] = ''

# Now deliveries contains the updated items with all missing fields
# You can then convert it back to a JSON string if needed
updated_data = json.dumps(deliveries)

with open('updated_deliveries.json', 'w') as f:
    json.dump(deliveries, f)

print("Updated data has been saved to 'updated_deliveries.json'")
