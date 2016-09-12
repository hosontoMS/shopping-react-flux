import Mongoose from 'mongoose';

export default class OrderController {
  static getOrder(req, res) {
    const Order = Mongoose.model('Order');
    Order.findOne({ _id: req.query.orderId })
    .exec(function(err, order) {
      if (!order){
        res.json(404, {msg: 'Order Not Found.'});
      } else {
        res.json(order);
      }
    });
  }

  static getOrders(req, res) {
    const Order = Mongoose.model('Order');
    Order.find({userid: 'customerA'})
    .exec(function(err, orders) {
      if (!orders){
        res.json(404, {msg: 'Orders Not Found.'});
      } else {
        res.json(orders);
      }
    });
  }

  static addOrder(req, res) {
    const Customer = Mongoose.model('Customer');
    const Order = Mongoose.model('Order');
    const Address = Mongoose.model('Address');
    const Billing = Mongoose.model('Billing');
    var shipping = new Address(req.body.shipping);
    var billing = new Billing(req.body.billing);
    var items = req.body.items;
    var newOrder = new Order({
      userid: 'customerA',
      status: 'Placed',
      items,
      shipping,
      billing
    });
    newOrder.save(function(err, results){
      if(err){
        res.json(500, "Failed to save Order.");
      } else {
        Customer.update({ userid: 'customerA' },
            {$set:{cart:[]}})
        .exec(function(err, results){
          if (err || results < 1){
           res.json(404, {msg: 'Failed to update Cart.'});
          } else {
           res.json({
             msg: "Order Saved.",
             id: newOrder._id,
             timestamp: newOrder.timestamp,
             status: newOrder.status,
           });
          }
        });
      }
    });
  }
}
