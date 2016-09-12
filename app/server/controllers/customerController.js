import Mongoose from 'mongoose';

export default class CustomerController {
  static getCustomer(req, res) {
    const Customer = Mongoose.model('Customer');
    Customer.findOne({ userid: 'customerA' })
    .exec(function(err, customer) {
      if (!customer){
        res.json(404, {msg: 'Customer Not Found.'});
      } else {
        res.json(customer);
      }
    });
  }

  static updateShipping(req, res) {
    const Customer = Mongoose.model('Customer');
    const Address = Mongoose.model('Address');
    var newShipping = new Address(req.body.updatedShipping);
    Customer.update({ userid: 'customerA' },
        {$set:{shipping: newShipping.toObject()}})
    .exec(function(err, results){
      if (err || results < 1){
       res.json(404, {msg: 'Failed to update Shipping.'});
      } else {
       res.json({msg: "Customer Shipping Updated"});
      }
    });
  }

  static updateBilling(req, res) {
    const Customer = Mongoose.model('Customer');
    const Billing = Mongoose.model('Billing');
    var newBilling = new Billing(req.body.updatedBilling);
    Customer.update({ userid: 'customerA' },
        {$set:{billing: newBilling.toObject()}})
    .exec(function(err, results){
      if (err || results < 1){
       res.json(404, {msg: 'Failed to update Billing.'});
      } else {
       res.json({msg: "Customer Billing Updated"});
      }
    });
  }

  static updateCart(req, res) {
    const Customer = Mongoose.model('Customer');
    Customer.update({ userid: 'customerA' },
        {$set:{cart:req.body.updatedCart}})
    .exec(function(err, results){
      if (err || results < 1){
       res.json(404, {msg: 'Failed to update Cart.'});
      } else {
       res.json({msg: "Customer Cart Updated"});
      }
    });
  }
}
