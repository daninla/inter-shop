const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const brands = [
      { id: 10, title: 'Asus', description: 'Ноутбуки и аксессуары Asus' },
      { id: 11, title: 'HP', description: 'Компьютерная техника HP' },
      { id: 12, title: 'Lenovo', description: 'Устройства Lenovo' },
      { id: 13, title: 'Dell', description: 'Компьютеры Dell' },
      { id: 14, title: 'Sony', description: 'Техника Sony' },
    ];

    const categories = [
      { id: 10, title: 'Ноутбуки', description: 'Портативные компьютеры' },
      { id: 11, title: 'Наушники', description: 'Аудиоустройства' },
      { id: 12, title: 'Мониторы', description: 'Дисплеи и мониторы' },
      { id: 13, title: 'Клавиатуры', description: 'Периферия' },
      { id: 14, title: 'Умные часы', description: 'Наручные устройства' },
    ];

    const itemTypes = [
      { id: 10, title: 'Ноутбук', description: 'Лаптоп' },
      { id: 11, title: 'Наушники', description: 'Проводные и беспроводные' },
      { id: 12, title: 'Монитор', description: 'Компьютерный дисплей' },
      { id: 13, title: 'Клавиатура', description: 'Механическая или мембранная' },
      { id: 14, title: 'Умные часы', description: 'Смарт-часы' },
    ];

    const stores = [
      { id: 10, title: 'Магазин 5', description: 'Филиал на Лесной' },
      { id: 11, title: 'Магазин 6', description: 'Филиал на Киевской' },
      { id: 12, title: 'Outlet', description: 'Распродажа техники' },
    ];

    const customers = [
      { id: 10, name: 'Сергей Кузнецов', email: 'sergey@example.com' },
      { id: 11, name: 'Елена Орлова', email: 'elena@example.com' },
      { id: 12, name: 'Дмитрий Васильев', email: 'dmitry@example.com' },
      { id: 13, name: 'Ольга Михайлова', email: 'olga@example.com' },
      { id: 14, name: 'Николай Григорьев', email: 'nikolay@example.com' },
    ];

    const models = [
      { id: 10, title: 'Zenbook 14', brand_id: 10, description: 'Ультрабук Asus' },
      { id: 11, title: 'Pavilion 15', brand_id: 11, description: 'Ноутбук HP' },
      { id: 12, title: 'ThinkPad X1', brand_id: 12, description: 'Премиальный ноутбук Lenovo' },
      { id: 13, title: 'XPS 13', brand_id: 13, description: 'Ноутбук Dell' },
      { id: 14, title: 'WH-1000XM5', brand_id: 14, description: 'Bluetooth-наушники Sony' },
    ];

    const items = [
      { item_id: 10, categ_id: 10, type_id: 10, brand_id: 10, model_id: 10, price: '1299.00', store_id: 10, amount: 6 },
      { item_id: 11, categ_id: 10, type_id: 10, brand_id: 11, model_id: 11, price: '1199.00', store_id: 11, amount: 4 },
      { item_id: 12, categ_id: 10, type_id: 10, brand_id: 12, model_id: 12, price: '1399.00', store_id: 12, amount: 7 },
      { item_id: 13, categ_id: 10, type_id: 10, brand_id: 13, model_id: 13, price: '1499.00', store_id: 10, amount: 3 },
      { item_id: 14, categ_id: 11, type_id: 11, brand_id: 14, model_id: 14, price: '349.00', store_id: 11, amount: 18 },
      { item_id: 15, categ_id: 12, type_id: 12, brand_id: 13, model_id: 13, price: '499.00', store_id: 12, amount: 9 },
      { item_id: 16, categ_id: 13, type_id: 13, brand_id: 10, model_id: 10, price: '159.00', store_id: 10, amount: 22 },
      { item_id: 17, categ_id: 14, type_id: 14, brand_id: 12, model_id: 12, price: '249.00', store_id: 11, amount: 13 },
    ];

    const orders = [
      { order_id: 10, code: 'ORD-2001', date: new Date('2026-11-01T11:00:00Z'), customer: 10, amount: '1299.00', paid: true },
      { order_id: 11, code: 'ORD-2002', date: new Date('2026-11-03T16:00:00Z'), customer: 11, amount: '349.00', paid: true },
      { order_id: 12, code: 'ORD-2003', date: new Date('2026-11-05T09:45:00Z'), customer: 12, amount: '499.00', paid: false },
      { order_id: 13, code: 'ORD-2004', date: new Date('2026-11-08T12:10:00Z'), customer: 13, amount: '249.00', paid: true },
      { order_id: 14, code: 'ORD-2005', date: new Date('2026-11-11T18:30:00Z'), customer: 14, amount: '1499.00', paid: false },
    ];

    await queryInterface.bulkInsert('brands', brands);
    await queryInterface.bulkInsert('item_categories', categories);
    await queryInterface.bulkInsert('item_types', itemTypes);
    await queryInterface.bulkInsert('stores', stores);
    await queryInterface.bulkInsert('customers', customers);
    await queryInterface.bulkInsert('models', models);
    await queryInterface.bulkInsert('items', items);
    await queryInterface.bulkInsert('orders', orders);
    await queryInterface.bulkInsert('item_order', [
      { item_id: 10, order_id: 10 },
      { item_id: 14, order_id: 11 },
      { item_id: 15, order_id: 12 },
      { item_id: 17, order_id: 13 },
      { item_id: 13, order_id: 14 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('item_order', { order_id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('orders', { order_id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('items', { item_id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('models', { id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('customers', { id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('stores', { id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('item_types', { id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('item_categories', { id: { [Op.gte]: 10 } }, {});
    await queryInterface.bulkDelete('brands', { id: { [Op.gte]: 10 } }, {});
  },
};
