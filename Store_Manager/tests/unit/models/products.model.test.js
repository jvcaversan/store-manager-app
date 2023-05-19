const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');

const { connection } = require('../../../src/models/connection');
const { products } = require('./products.model.mock');

describe('Testa a product models', function () {
  it('Retorna lista total de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.getProducts();
    expect(result).to.be.deep.equal(products);
  })

  it('Retorna produto pelo ID', async function () {
    //Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    //Act
    const result = await productsModel.getProductsById();
    //Assert
    expect(result).to.be.deep.equal(products[0]);
  })

  // it('Verifica se novos produtos sao cadastrados', async function () {
  //   sinon.stub(connection, 'execute').resolves([products]);

  //   const result = await productsModel.newProducts();

  //   expect(result).to.be.deep.equal(products);
  // })

  it('cadastrando um novo produto', async function () {

    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productsModel.newProducts('Cocada');
    expect(result).to.be.deep.equal(4);
  })

  afterEach(function () {
    sinon.restore();
  })
});