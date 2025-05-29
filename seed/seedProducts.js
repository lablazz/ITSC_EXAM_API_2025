const Product = require('../models/Product');
const sequelize = require('../config/database');

(async () => {
  await sequelize.sync();

  const productsToSeed = [
    { productNumber: 'P001', name: 'Green Tea', price: 49 },
    { productNumber: 'P002', name: 'Black Coffee', price: 59 },
    { productNumber: 'P003', name: 'Lemon Soda', price: 39 }
  ];

  for (const product of productsToSeed) {
    const [item, created] = await Product.findOrCreate({
      where: { productNumber: product.productNumber },
      defaults: product,
    });
    if (created) {
      console.log(`Inserted product ${product.productNumber}`);
    } else {
      console.log(`Product ${product.productNumber} already exists`);
    }
  }

  console.log('✅ Seed completed');
  process.exit();
})();
