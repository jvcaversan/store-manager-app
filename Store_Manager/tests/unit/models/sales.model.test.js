const { expect } = require('chai');
const sinon = require('sinon');


const { connection }  = require('../../../src/models/connection');
const { mockSales } = require('../mock/mock.sales.mock');
const salesModel = require('../../../src/models/salesModel');

describe('Buscando todas as vendas', function () {
  it('Listar todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);
    const result = await salesModel.getSales();
    expect(result).to.be.deep.equal(mockSales);
  })

  it('Pegar as vendas pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([[mockSales[0], mockSales[1]]]);
    const result = await salesModel.getSalesById(1);
    expect(result).to.be.deep.equal([mockSales[0], mockSales[1]]);
  });

  it('tests delete sales (model) ', async function () {
    sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });

    const result = await salesModel.salesDelete(1);

    expect(result).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  })
})