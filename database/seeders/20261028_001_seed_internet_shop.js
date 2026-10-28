module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('brands', [
      { id: 1, title: 'Apple', description: 'Смартфоны и техника Apple' },
      { id: 2, title: 'Samsung', description: 'Электроника Samsung' },
      { id: 3, title: 'Xiaomi', description: 'Устройства Xiaomi' },
    ]);

    await queryInterface.bulkInsert('item_categories', [
      { id: 1, title: 'Телефоны', description: 'Мобильные телефоны' },
      { id: 2, title: 'Планшеты', description: 'Планшетные компьютеры' },
      { id: 3, title: 'Аксессуары', description: 'Дополнительные аксессуары' },
    ]);

    await queryInterface.bulkInsert('item_types', [
      { id: 1, title: 'Смартфон', description: 'Мобильный телефон' },
      { id: 2, title: 'Планшет', description: 'Планшетный компьютер' },
      { id: 3, title: 'Чехол', description: 'Защитный чехол' },
    ]);

    await queryInterface.bulkInsert('stores', [
      { id: 1, title: 'Центральный магазин', description: 'Главный розничный склад' },
      { id: 2, title: 'Магазин онлайн', description: 'Онлайн-площадка продаж' },
      { id: 3, title: 'Пункт выдачи', description: 'Пункт самовывоза' },
    ]);

    await queryInterface.bulkInsert('customers', [
      { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
      { id: 2, name: 'Мария Петрова', email: 'maria@example.com' },
      { id: 3, name: 'Алексей Сидоров', email: 'alex@example.com' },
    ]);

    await queryInterface.bulkInsert('models', [
      { id: 1, title: 'iPhone 15', brand_id: 1, description: 'Флагманский смартфон Apple' },
      { id: 2, title: 'Galaxy S24', brand_id: 2, description: 'Смартфон Samsung Galaxy' },
      { id: 3, title: 'Redmi Note 13', brand_id: 3, description: 'Бюджетный смартфон Xiaomi' },
      { id: 4, title: 'iPad Air', brand_id: 1, description: 'Планшет Apple iPad Air' },
    ]);

    await queryInterface.bulkInsert('items', [
      { item_id: 1, categ_id: 1, type_id: 1, brand_id: 1, model_id: 1, price: '999.00', store_id: 1, amount: 12 },
      { item_id: 2, categ_id: 1, type_id: 1, brand_id: 2, model_id: 2, price: '899.00', store_id: 1, amount: 8 },
      { item_id: 3, categ_id: 1, type_id: 1, brand_id: 3, model_id: 3, price: '349.00', store_id: 2, amount: 15 },
      { item_id: 4, categ_id: 2, type_id: 2, brand_id: 1, model_id: 4, price: '699.00', store_id: 2, amount: 5 },
      { item_id: 5, categ_id: 3, type_id: 3, brand_id: 1, model_id: 1, price: '49.00', store_id: 3, amount: 30 },
    ]);

    await queryInterface.bulkInsert('orders', [
      {
        order_id: 1,
        code: 'ORD-1001',
        date: new Date('2026-10-01T10:00:00Z'),
        customer: 1,
        amount: '1998.00',
        paid: true,
      },
      {
        order_id: 2,
        code: 'ORD-1002',
        date: new Date('2026-10-12T14:30:00Z'),
        customer: 2,
        amount: '1048.00',
        paid: false,
      },
      {
        order_id: 3,
        code: 'ORD-1003',
        date: new Date('2026-10-18T09:15:00Z'),
        customer: 3,
        amount: '499.00',
        paid: true,
      },
    ]);

    await queryInterface.bulkInsert('item_order', [
      { item_id: 1, order_id: 1 },
      { item_id: 2, order_id: 1 },
      { item_id: 3, order_id: 2 },
      { item_id: 4, order_id: 3 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('item_order', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('items', null, {});
    await queryInterface.bulkDelete('models', null, {});
    await queryInterface.bulkDelete('customers', null, {});
    await queryInterface.bulkDelete('stores', null, {});
    await queryInterface.bulkDelete('item_types', null, {});
    await queryInterface.bulkDelete('item_categories', null, {});
    await queryInterface.bulkDelete('brands', null, {});
  },
};
