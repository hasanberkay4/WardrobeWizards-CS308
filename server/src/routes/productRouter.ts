import { Router } from "express";
import productController from "../controller/productController"
import wishController from "../controller/wishController";
import notificationController from "../controller/notificationController";

const productRouter = Router();

// --- products ---

// all products
productRouter.get('/', productController.getProducts)

// product by id
productRouter.get('/id/:productid', productController.getProductsById);

// update stock
productRouter.post('/update-stock', productController.updateProductStock);

// product fields
productRouter.get('/all-categories', productController.getCategories);
productRouter.get('/all-categories/ids', productController.getCategoryIdsBySlug);

// --- categories ---

// all products by category
//productRouter.get('/categories/', productController.getCategoryIdsBySlug); // SORUNLU API ENDPOINT?????
productRouter.get('/categories', productController.getAllCategories); // ESKI CALISAN API ENDPOINT
productRouter.get('/categories/:slug', productController.getCategorySpecificProducts);



// --- search ---

// search data
productRouter.get('/search', productController.searchProducts);


// --- deliveries ---

// handle delivery request
productRouter.post('/delivery', productController.getDelivery);

// show delivery specific invoice
productRouter.get('/delivery/invoice/:id', productController.getDeliveryInvoice);

// get all delivieries
productRouter.get('/delivery', productController.getAllDeliveries);

// get all delivieries by user id
productRouter.get('/delivery/:user_id', productController.getDeliveriesByUserId);

// update delivery status
productRouter.post('/delivery/update-status', productController.updateDeliveryStatus);

// update product status in delivery
productRouter.post('/delivery/product/update-status', productController.updateDeliveryProductStatus);

// handle ratings
productRouter.put('/id/:productid', productController.updateProductRating);


// --- wishes ---

// get user's wishes
productRouter.get('/get-user-wishes/:userid', wishController.getUserWishes);

// check user-specific wish
productRouter.post('/check-user-wishes', wishController.checkUserWish);

// add wish
productRouter.put('/add-wish', wishController.addWish);

// remove wish
productRouter.delete('/remove-wish', wishController.removeWish);


// --- notifications ---
productRouter.get('/get-user-notifies/:userid', notificationController.getUserNotifications);


// --- yagiz - filter ---

// get products by category filter with query params
productRouter.get('/filter', productController.getProductsByCategoryFilter);

// get all categories for filter dropdown
productRouter.get('/categories', productController.getAllCategories);



export { productRouter }