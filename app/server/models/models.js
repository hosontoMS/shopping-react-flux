import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

export default class Models {
  static setup() {
    console.log('setting up models');
    var AddressSchema = new Schema({
      name: String,
      address: String,
      city: String,
      state: String,
      zip: String
    }, { _id: false });
    Mongoose.model('Address', AddressSchema);
    var BillingSchema = new Schema({
      cardType: { type: String, enum: ['Visa', 'MasterCard', 'Amex'] },
      name: String,
      number: String,
      expiryMonth: Number,
      expiryYear: Number,
      address: AddressSchema
    }, { _id: false });
    Mongoose.model('Billing', BillingSchema);
    var ProductSchema = new Schema({
      name: String,
      imagefile: String,
      description: String,
      price: Number,
      instock: Number
    });
    Mongoose.model('Product', ProductSchema);
    var ProductQuantitySchema = new Schema({
      quantity: Number,
      name: String,
      imagefile: String,
      description: String,
      price: Number,
      instock: Number,
    });
    Mongoose.model('ProductQuantity', ProductQuantitySchema);
    var OrderSchema = new Schema({
      userid: String,
      items: [ProductQuantitySchema],
      shipping: AddressSchema,
      billing: BillingSchema,
      status: {type: String, default: "Pending"},
      timestamp: { type: Date, default: Date.now }
    });
    Mongoose.model('Order', OrderSchema);
    var CustomerSchema = new Schema({
      userid: { type: String, unique: true, required: true },
      shipping: AddressSchema,
      billing: BillingSchema,
      cart: [ProductQuantitySchema]
    });
    Mongoose.model('Customer', CustomerSchema);
  }
}
