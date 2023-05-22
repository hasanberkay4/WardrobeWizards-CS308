import json

# this script is for populating the database with the data in the data.json file

data = '''
[{
  "_id": {
    "$oid": "6453ba67e644754302d3f42f"
  },
  "name": "Tshirt Basic Red",
  "description": "a red colored, basic style tshirt designed by hasan",
  "model": "Basic",
  "color": "Red",
  "stock_quantity": 15,
  "initial_price": 100,
  "image": "tshirt-basic-red.jpg",
  "popularity": 8,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f407"
    },
    {
      "$oid": "6453b5f1e644754302d3f40e"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 4,
  "number_of_voters": 3,
  "warrant_status": false
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f430"
  },
  "name": "Tshirt Basic Storm",
  "description": "a storm colored, basic style tshirt yagiz",
  "model": "Basic",
  "color": "Storm",
  "stock_quantity": 5,
  "initial_price": 60,
  "image": "tshirt-basic-storm.jpg",
  "popularity": 2,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f408"
    },
    {
      "$oid": "6453b5f1e644754302d3f40e"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 2,
  "number_of_voters": 1,
  "warrant_status": false
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f431"
  },
  "name": "Tshirt Creative Black 1",
  "description": "a black colored, creative style tshirt elif",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 6,
  "initial_price": 110,
  "image": "tshirt-creative-1.jpg",
  "popularity": 3,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f408"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 4,
  "number_of_voters": 1
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f432"
  },
  "name": "Tshirt Creative Black 2",
  "description": "a black colored, creative style tshirt 2 albert",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 3,
  "initial_price": 120,
  "image": "tshirt-creative-2.jpg",
  "popularity": 6,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f433"
  },
  "name": "Tshirt Creative Blue",
  "description": "a blue colored, creative style tshirt erkay",
  "model": "Creative",
  "color": "Blue",
  "stock_quantity": 17,
  "initial_price": 130,
  "image": "tshirt-creative-3.jpg",
  "popularity": 7,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f408"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0,
  "number": 0,
  "warrant_status": false
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f434"
  },
  "name": "Tshirt Creative Black 3",
  "description": "a black colored, creative style tshirt 3 kamer",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 5,
  "initial_price": 140,
  "image": "tshirt-creative-3.jpg",
  "popularity": 6,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 5,
  "number_of_voters": 1
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f435"
  },
  "name": "Tshirt Creative Black 4",
  "description": "a black colored, creative style tshirt 4 esra",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 14,
  "initial_price": 150,
  "image": "tshirt-creative-4.jpg",
  "popularity": 7,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0,
  "number": 0,
  "warrant_status": false
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f436"
  },
  "name": "Tshirt Creative White 1",
  "description": " a white colored, creative style tshirt 1 esra ",
  "model": "Creative",
  "color": "White",
  "stock_quantity": 10,
  "initial_price": 160,
  "image": "tshirt-creative-6.jpg",
  "popularity": 1,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f406"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f437"
  },
  "name": "Thirt Creative White 2",
  "description": "a white colored, creative style tshirt 2 berrin",
  "model": "Creative",
  "color": "White",
  "stock_quantity": 10,
  "initial_price": 170,
  "image": "tshirt-creative-7.jpg",
  "popularity": 6,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f406"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f438"
  },
  "name": "Tshirt Creative Red 1",
  "description": "a red colored, creative style tshirt onur",
  "model": "Creative",
  "color": "Red",
  "stock_quantity": 10,
  "initial_price": 180,
  "image": "tshirt-creative-8.jpg",
  "popularity": 2,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f407"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453ba67e644754302d3f439"
  },
  "name": "Tshirt Creative Black 5",
  "description": "a black colored, creative style tshirt oznur",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 8,
  "initial_price": 200,
  "image": "tshirt-creative-9.jpg",
  "popularity": 4,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 4,
  "number_of_voters": 1
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f43c"
  },
  "name": "Tshirt Creative White 3",
  "description": "a white colored, creative style tshirt 3",
  "model": "Creative",
  "color": "White",
  "stock_quantity": 9,
  "initial_price": 100,
  "image": "tshirt-creative-10.jpg",
  "popularity": 10,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f406"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 5,
  "number_of_voters": 1
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f43d"
  },
  "name": "Tshirt Creative Black 7",
  "description": "a black colored, creative style tshirt 7",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 14,
  "initial_price": 110,
  "image": "tshirt-creative-11.jpg",
  "popularity": 6,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0,
  "number": 0,
  "warrant_status": false
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f43e"
  },
  "name": "Tshirt Creative White 4",
  "description": "a white colored, creative style tshirt 4",
  "model": "Creative",
  "color": "White",
  "stock_quantity": 9,
  "initial_price": 120,
  "image": "tshirt-creative-12.jpg",
  "popularity": 7,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f406"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 5,
  "number_of_voters": 1
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f43f"
  },
  "name": "Tshirt Creative Green 1",
  "description": "a green colored, creative style tshirt 1",
  "model": "Creative",
  "color": "Green",
  "stock_quantity": 10,
  "initial_price": 130,
  "image": "tshirt-creative-13.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f409"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f440"
  },
  "name": "Tshirt Creative Yellow 1",
  "description": "a yellow colored, creative style tshirt 1",
  "model": "Creative",
  "color": "Yellow",
  "stock_quantity": 10,
  "initial_price": 150,
  "image": "tshirt-creative-14.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f40c"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f441"
  },
  "name": "Tshirt Creative Green 2",
  "description": "a green colored, creative style tshirt 2",
  "model": "Creative",
  "color": "Green",
  "stock_quantity": 10,
  "initial_price": 100,
  "image": "tshirt-creative-15.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f409"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6454c387e644754302d3f455"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f442"
  },
  "name": "Tshirt Creative Gray 1",
  "description": "a gray colored, creative style tshirt 1",
  "model": "Creative",
  "color": "Gray",
  "stock_quantity": 10,
  "initial_price": 100,
  "image": "tshirt-creative-16.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f40b"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6454c387e644754302d3f455"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f443"
  },
  "name": "Tshirt Creative Mint 1",
  "description": "a mint colored, creative style tshirt 1",
  "model": "Creative",
  "color": "Mint",
  "stock_quantity": 10,
  "initial_price": 120,
  "image": "tshirt-creative-17.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f40a"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f444"
  },
  "name": "Tshirt Creative Black 8",
  "description": "a black colored, creative style tshirt 8",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 9,
  "initial_price": 190,
  "image": "tshirt-creative-18.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 1
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f445"
  },
  "name": "Tshirt Creative White 6",
  "description": "a white colored, creative style tshirt 6",
  "model": "Creative",
  "color": "White",
  "stock_quantity": 10,
  "initial_price": 180,
  "image": "tshirt-creative-19.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f406"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6453bc57e644754302d3f446"
  },
  "name": "Tshirt Creative Gray 2",
  "description": "a gray colored, creative style tshirt 2",
  "model": "Creative",
  "color": "Gray",
  "stock_quantity": 10,
  "initial_price": 150,
  "image": "tshirt-creative-20.jpg",
  "popularity": 0,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f40b"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b65ee644754302d3f425"
    }
  ],
  "rating": 0,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6454e527e644754302d3f460"
  },
  "name": "Bag leather",
  "description": "a black colored, large, creative style bag selin",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 10,
  "initial_price": 100,
  "image": "bag-1.jpg",
  "popularity": 8,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "rating": 4,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6454e527e644754302d3f461"
  },
  "name": "Bag leather",
  "description": "a black colored, medium, creative style bag melo",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 5,
  "initial_price": 90,
  "image": "bag-2.jpg",
  "popularity": 7,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "rating": 4,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6454e527e644754302d3f462"
  },
  "name": "Bag leather",
  "description": "a black colored, small, creative style bag selo",
  "model": "Creative",
  "color": "Black",
  "stock_quantity": 4,
  "initial_price": 80,
  "image": "bag-3.jpg",
  "popularity": 10,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f405"
    },
    {
      "$oid": "6453b5f1e644754302d3f40f"
    },
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "rating": 4,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6454e527e644754302d3f463"
  },
  "name": "Bag shoulder hanging",
  "description": "a green colored, large, basic style bag rahmi",
  "model": "Basic",
  "color": "Green",
  "stock_quantity": 4,
  "initial_price": 80,
  "image": "bag-4.jpg",
  "popularity": 6,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f409"
    },
    {
      "$oid": "6453b5f1e644754302d3f40e"
    },
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "rating": 4,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "6454e527e644754302d3f464"
  },
  "name": "Bag shoulder hanging",
  "description": "a white colored, large, basic style bag rahmi",
  "model": "Basic",
  "color": "White",
  "stock_quantity": 3,
  "initial_price": 50,
  "image": "bag-4.jpg",
  "popularity": 2,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f406"
    },
    {
      "$oid": "6453b5f1e644754302d3f40e"
    },
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "rating": 2,
  "number_of_voters": 0
},{
  "_id": {
    "$oid": "645f91e3b7da00473f3809ec"
  },
  "name": "my-name",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 100,
  "initial_price": 10,
  "category_ids": [
    {
      "$oid": "6453b56fe644754302d3f40a"
    }
  ],
  "image": "my-image",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f920a0e9f331ec4ab0d98"
  },
  "name": "my-name",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 10,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b5f1e644754302d3f40e"
    }
  ],
  "image": "my-image",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f926691c86b43e7615e2d"
  },
  "name": "my-name",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 10,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b5f1e644754302d3f40e"
    }
  ],
  "image": "my-image",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f929393c16a9348ed8f3b"
  },
  "name": "my-name",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 10,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b5f1e644754302d3f40e"
    }
  ],
  "image": "my-image",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f92bb9724830b9ce9c44c"
  },
  "name": "my-name",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 10,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b5f1e644754302d3f40e"
    }
  ],
  "image": "my-image",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f92ef3c2bc976b83915e5"
  },
  "name": "my-name",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 10,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b5f1e644754302d3f40e"
    }
  ],
  "image": "my-image",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f93903c2bc976b83915e7"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f940d3ff7776c5f89eeaa"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f945e45d6afadb3ba0299"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f945f45d6afadb3ba029c"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f946c45d6afadb3ba029f"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f949d63320d578756dfaa"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f94c48ac9d2294db25a7b"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f9507c4e492fe389191d2"
  },
  "name": "my-imaj",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "image-name",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0
},{
  "_id": {
    "$oid": "645f95be510eb6c50327c177"
  },
  "name": "hasan",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 12,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453ba67e644754302d3f42e"
    }
  ],
  "image": "picsum.jpg",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0,
  "expense": 0
},{
  "_id": {
    "$oid": "645f96f7510eb6c50327c17c"
  },
  "name": "yagiz",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 7,
  "initial_price": 100,
  "category_ids": [
    {
      "$oid": "6453ba67e644754302d3f433"
    }
  ],
  "image": "images.png",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "__v": 0,
  "expense": 0
},{
  "_id": {
    "$oid": "64690a3286f43390a72b712b"
  },
  "name": "ahu",
  "description": "description",
  "model": "model",
  "number": 0,
  "stock_quantity": 100000,
  "initial_price": 22,
  "category_ids": [
    {
      "$oid": "6453b610e644754302d3f421"
    }
  ],
  "image": "713.png",
  "popularity": 0,
  "rating": 0,
  "number_of_voters": 0,
  "warrant_status": true,
  "delivery_info": "intransit",
  "expense": 10,
  "__v": 0
}]
'''

# Load JSON data
products = json.loads(data)

# Iterate over each item in the list
for product in products:
    # Check if each field exists, if not add a default value
    if '_id' not in product:
        product['_id'] = ''
    if 'name' not in product:
        product['name'] = ''
    if 'description' not in product:
        product['description'] = ''
    if 'model' not in product:
        product['model'] = ''
    if 'color' not in product:
        product['color'] = ''
    if 'stock_quantity' not in product:
        product['stock_quantity'] = 0
    if 'initial_price' not in product:
        product['initial_price'] = 0
    if 'expense' not in product:
        product['expense'] = 0
    if 'image' not in product:
        product['image'] = ''
    if 'popularity' not in product:
        product['popularity'] = 0
    if 'category_ids' not in product:
        product['category_ids'] = []
    if 'rating' not in product:
        product['rating'] = 0
    if 'number_of_voters' not in product:
        product['number_of_voters'] = 0
    if 'warrant_status' not in product:
        product['warrant_status'] = False

# Now products contains the updated items with all missing fields
# You can then convert it back to a JSON string if needed
updated_data = json.dumps(products)

with open('updated_data.json', 'w') as f:
    json.dump(products, f)

print("Updated data has been saved to 'updated_data.json'")
