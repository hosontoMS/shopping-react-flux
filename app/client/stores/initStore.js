import ProductActions from '../actions/productActions';
import CustomerActions from '../actions/customerActions';

export default class InitStore {
  static startup() {
    CustomerActions.get();
    ProductActions.get();
  }

  static seed() {
    ProductActions.add({
      _id: '1',
      name: 'Ladies necklace',
      imagefile: 'necklace.jpg',
      price: 40.45,
      instock: 5,
    });

    ProductActions.add({
      _id: '2',
      name: 'Bison',
      imagefile: 'bison.jpg',
      price: 10.50,
      instock: 15,
    });

    ProductActions.add({
      _id: '3',
      name: 'Cliff',
      imagefile: 'cliff.jpg',
      price: 100.50,
      instock: 1,
    });

    ProductActions.add({
      _id: '4',
      name: 'Flower',
      imagefile: 'flower.jpg',
      price: 0.50,
      instock: 150,
    });

    ProductActions.add({
      _id: '5',
      name: 'Jump',
      imagefile: 'jump.jpg',
      price: 10.50,
      instock: 15,
    });

    ProductActions.add({
      _id: '6',
      name: 'Lake',
      imagefile: 'lake.jpg',
      price: 210.50,
      instock: 1,
    });

    ProductActions.add({
      _id: '7',
      name: 'Pyramid',
      imagefile: 'pyramid.jpg',
      price: 60.00,
      instock: 3,
    });

    ProductActions.add({
      _id: '8',
      name: 'Volcano',
      imagefile: 'volcano.jpg',
      price: 1000.00,
      instock: 1,
    });

    CustomerActions.set({
      _id: '1',
      shippingAddress: {
        name: 'Vijay',
        address: '111, Suncity Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zip: '560102'
      },
      billingInfo: {
        name: 'Vijay',
        number: '1111111111111111',
        type: 'Visa',
        expiryMonth: 12,
        expiryYear: 2018,
        billingAddress: {
          name: 'Vijay',
          address: '111, Suncity Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zip: '560102'
        }
      }
    });
  }
}
