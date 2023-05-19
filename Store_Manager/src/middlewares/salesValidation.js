const salesError = async (req, res, next) => {
  const sales = req.body;

  const withoutId = sales.find((sale) => sale.productId === undefined);

  if (withoutId) return res.status(400).json({ message: '"productId" is required' });

  const withoutQuantity = sales.find((sale) => sale.quantity === undefined);

  if (withoutQuantity) return res.status(400).json({ message: '"quantity" is required' });

  const noValue = sales.find((sale) => sale.quantity <= 0);

  if (noValue) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }

  return next();
};

module.exports = {
  salesError,
};