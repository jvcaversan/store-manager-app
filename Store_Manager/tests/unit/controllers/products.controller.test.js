const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = require('chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController')

const { products, newProduct, update } = require('./products.controller.mock');
const { newProducts } = require('../../../src/models/productsModel');

describe('Testando camada controller de produtos', function () {
  it('Retorna lista de produtos', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(products);
    sinon.stub(productsService, 'getProducts').resolves(products);

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(products);
  })

  it('Cadastrar com sucesso', async function () {
    const req = { body: products };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'newProducts')
      .resolves(newProduct);

    await productsController.newProducts(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });


  it('Atualizar um produto com sucesso', async function () {
    const req = {};
    const res = {};
    req.params = { id: 1 };
    req.body = { name: 'Cocada' }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'productUpdate')
      .resolves(update);
    await productsController.productUpdate(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Retorna o produto requerido pelo ID', async function () {
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(products);
    sinon.stub(productsService, 'getProductsById')
      .resolves({ type: null, message: products[1] });

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(products[1]);
  });

  it('testa erro no id', async function () {
    const req = { params: { id: 11 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductsById').resolves
      ({ type: 404, message: 'Product not found' });

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
  })

  // it('testa erro no cadastro de produto', async function () {
  //   const req = { body: { name: 'a' } };
  //   const res = {};

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(productsService, 'newProducts').resolves
  //     ({ type: 422 , message: "\"name\" length must be at least 5 characters long" });

  //   await productsController.newProducts(req, res);

  //   expect(res.status).to.have.been.calledWith(422);
  //   expect(res.json).to.have.been.calledWithExactly({ message: "\"name\" length must be at least 5 characters long" });
  // })
    
  it('deleta um produto', async function () {
    const res = {};
    const req = {
      params: { id: 1 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'productDelete').resolves({ type: null, message: ' ' });
    await productsController.productDelete(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({ message: 'productDelete' });
  });

  it('Deletar apenas o id correto', async function () {
    const res = {};
    const req = {
      params: { id: 4 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'productDelete').resolves({ type: 404, message: 'Product not found' });
    await productsController.productDelete(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  })


  afterEach(function () {
    sinon.restore();
  })
  
});