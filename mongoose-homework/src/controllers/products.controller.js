import ProductModel from "../models/products.model.js";

const productModel = new ProductModel();

class ProductsController {
    async getAllProducts(){

        const product = await productModel.getAllProducts();

        return product
    }

    async getProductById(productId){
        const product = await productModel.getProductById(productId);

        return product
    }

    async addProduct(productData){
        await productModel.addProduct(productData);
    };

    async updateProduct(productId, productData){
        await productModel.updateProduct(productId, productData)
    }

    async deleteProduct(productId){
        await productModel.deleteProduct(productId)
    }
};

export default ProductsController;