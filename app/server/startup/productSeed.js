import Mongoose from 'mongoose';

export default class ProductSeed {
  static startup() {
    const model = Mongoose.model('Product');
    ProductSeed.createNew(model, {
      name: 'Gold plated Necklace',
      imagefile: 'necklace.jpg',
	  description: 'Ladies Gold Plated Necklace with Sapphire.', 
      price: 12.34,
      instock: 5,
    });
    ProductSeed.createNew(model, {
      name: 'Pearl Set',
      imagefile: 'pearl-set.jpg',
	  description: 'Ladies pearl jewellery set.',
      price: 45.45,
      instock: 15,
    });
    ProductSeed.createNew(model, {
      name: 'Crystal Earing',
      imagefile: 'earing.jpg',
	  description: 'Silver and Crystal earing.',
      price: 38.52,
      instock: 1,
    });
    ProductSeed.createNew(model, {
      name: 'Crystal Ring',
      imagefile: 'ring.jpg',
	  description: 'Crystal Finger ring (Gents & Ladies).',
      price: 77.45,
      instock: 150,
    });
    ProductSeed.createNew(model, {
      name: 'Flower Ring',
      imagefile: 'flower-ring.jpg',
	  description: 'Flower ring with Australian Ruby.',
      price: 210.50,
      instock: 12,
    });
  }

  static createNew(model, product) {
    model.findOne({name: product.name})
    .exec((err, p) => {
      if (!p) {
        const newProduct = new model(product);
        newProduct.save((err, res) => {
          if (err) {
            console.log('error in saving product');
          } else {
            console.log('new product created');
          }
        })
      }
    })
  }
}
