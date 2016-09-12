import Mongoose from 'mongoose';

export default class CustomerSeed {
  static startup() {
    const Customer = Mongoose.model('Customer');
    Customer.findOne({ userid: 'customerA' })
    .exec(function(err, cust) {
      if (!cust) {
        const customer = new Customer({
          userid: 'customerA',
          shipping: {
            name: 'Demo Customer',
            address: 'Suncity Av',
            city: 'Utah',
            state: 'CA',
            zip: '560102'
          },
          billing: {
            name: 'Someone',
            number: '1111111111111111',
            cardType: 'Visa',
            expiryMonth: 12,
            expiryYear: 2018,
            address: {
              name: 'Andrew',
              address: 'Suncity Ave',
              city: 'California',
              state: 'CA',
              zip: '560102'
            }
          }
        });

        customer.save((err, res) => {
          if (err) {
            console.log('unable to save customer');
          } else {
            console.log('created new customer');
          }
        });
      }
    });

  }
}
