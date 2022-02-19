const faker = require('faker');
const boom = require('@hapi/boom')


class ProductService {
  constructor () {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create (data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ... data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find () {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
    // return this.products;
  }

  async findOne (id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is Block');
    }
    return product;
  }

  async update (id,changes) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      const updatedProduct = this.products[index];
      this.products[index] = {
        ...updatedProduct,
        ...changes
      }
    }
  }
  async delete (id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      this.products.splice(index,1);
      return {id}
    }
  }
}

module.exports = ProductService;

