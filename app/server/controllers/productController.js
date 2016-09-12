import Mongoose from 'mongoose';

export default class ProductController {
  static getProduct(req, res) {
    const Product = Mongoose.model('Product');
    Product.findOne({ _id: req.query.productId })
    .exec(function(err, product) {
      if (!product){
        res.json(404, {msg: 'Photo Not Found.'});
      } else {
        res.json(product);
      }
    });
  }

  static getProducts(req, res) {
    const Product = Mongoose.model('Product');
    Product.find()
    .exec(function(err, products) {
      if (!products){
        res.json(404, {msg: 'Products Not Found.'});
      } else {
        res.json(products);
      }
    });
  }
}
