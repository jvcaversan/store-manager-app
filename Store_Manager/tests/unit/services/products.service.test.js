const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const productService = require('../../../src/services/productsService');

const { products, newProduct } = require('./products.service.mock');

describe('Testando camada services de produtos', function () {
  it('Retorna lista de produtos completa', async function () {
    sinon.stub(productsModel, 'getProducts').resolves(products);

    const result = await productService.getProducts();
    expect(result).to.be.a('array');
  })

  it('Retorna produto pelo ID', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(products[2]);

    const result = await productService.getProductsById(3);

    expect(result.message).to.be.deep.equal(products[2]);
  })

  it('Erro se receber produto com ID invalido', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(null);
    
    const result = await productService.getProductsById('aa');
    
    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });

  it('Registra um novo produto', async function () {
    sinon.stub(productsModel, 'newProducts').resolves(4);
    // sinon.stub(productsModel, 'getProductsById').resolves(newProduct[0]);

    const result = await productService.newProducts({name:'Cocada'});
    expect(result.type).to.equal();
    expect(result).to.deep.equal({ id: 4, name: 'Cocada' });
  });

  describe('atualizar um produto', function () {
    it('atualizar com sucesso', async function () {
      sinon.stub(productsModel, 'productUpdate').resolves(1);
      sinon.stub(productsModel, 'getProductsById').resolves(products[0]);
      const result = await productService.productUpdate(1, 'Cocada');
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });
  
  
  describe('apaga um produto', function () {
    it('retorna o produto apagado com sucesso', async function () {
      sinon.stub(productsModel, 'productDelete').resolves(1);
      sinon.stub(productsModel, 'getProductsById').resolves(products[0]);
      const result = await productService.productDelete(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(undefined);
    });
  });


  afterEach(function () {
    sinon.restore();
  })
});