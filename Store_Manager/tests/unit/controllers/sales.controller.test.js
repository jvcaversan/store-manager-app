const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');

const sinonchai = require('sinon-chai');


chai.use(sinonchai);

const salesService = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesController');
const { mockSales, newSales } = require('../mock/mock.sales.mock');

describe('Funcao getSales captura as vendas', function () {
  it('Testando se a funcao getSales captura todas as vendas', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSales').resolves(mockSales);
    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSales);
  })

  it('testa falha no getSalesById', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    req.params = { id: 9 }
    sinon.stub(salesService, 'getSalesById').resolves(
      { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' }
    );

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWithExactly({ message: 'Sale not found' })

  })

  it('Teste a funcao getSalesbyId funciona corretamente', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves({ type: null, message: [mockSales[0], mockSales[1]] });
    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([mockSales[0], mockSales[1]]);
  })

  it('Cadastrar produto com sucesso', async function () {
    const req = { body: mockSales };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'sales')
      .resolves({ type: null, message: newSales });

    await salesController.sales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    // expect(res.json).to.have.been.calledWith(newSales);
  });

  afterEach(function () {
    sinon.restore();
  })
});