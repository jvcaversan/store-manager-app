const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesServices');
const { mockSales } = require('../mock/mock.sales.mock');

describe('Rota services lista todas as vendas', function () {
  it('Listando todas as vendas', async function () {
    sinon.stub(salesModel, 'getSales').resolves(mockSales);
    const result = await salesService.getSales();

    expect(result).to.be.deep.equal(mockSales);
  });

  it('Busca a venda pelo id correto', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([mockSales[0], mockSales[1]]);
    const result = await salesService.getSalesById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal([mockSales[0], mockSales[1]]);
  });

  it('Busca a venda pelo id e verifica caso de erro', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);
    const result = await salesService.getSalesById(13);

    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.deep.equal('Sale not found');
  });

  it('Testa se o delete está funcionando corretamente)', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([mockSales[3]]);
    sinon.stub(salesModel, 'salesDelete').resolves();
    const result = await salesService.salesDelete(2);
    
    expect(result.type).to.be.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});