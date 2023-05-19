const mockSales = [
  {
    "saleId": 1,
    "date": "2023-02-05T05:58:45.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-05T05:58:45.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-05T05:58:45.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const newSales = { id: 1, ...mockSales };

module.exports = {
  mockSales,
  newSales,
};