import productModel from '../models/productModel.js';

const getProductPage = async (req, res) => {
    try {
        const products = await productModel.getAllProducts(); // Fetch products from the model
        // res.render('Product/product-list', { products });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getProductDetailsPage = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // res.render('Product/product-detail', { product }); 
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors
    }
};

export default {

    getProductPage,  // Add the new method for rendering the product list
    getProductDetailsPage,  // Add the new method for rendering product details

};

