module.exports = {
  async up(queryInterface) {
    const addForeignKey = async ({ tableName, fieldName, referenceTable, referenceField, constraintName }) => {
      const table = await queryInterface.describeTable(tableName);

      if (!table[fieldName]) {
        return;
      }

      try {
        await queryInterface.addConstraint(tableName, {
          fields: [fieldName],
          type: 'foreign key',
          name: constraintName,
          references: {
            table: referenceTable,
            field: referenceField,
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        });
      } catch (error) {
        if (!String(error.message).includes('already exists')) {
          throw error;
        }
      }
    };

    await addForeignKey({
      tableName: 'models',
      fieldName: 'brand_id',
      referenceTable: 'brands',
      referenceField: 'id',
      constraintName: 'models_brand_id_fkey',
    });

    await addForeignKey({
      tableName: 'items',
      fieldName: 'categ_id',
      referenceTable: 'item_categories',
      referenceField: 'id',
      constraintName: 'items_categ_id_fkey',
    });

    await addForeignKey({
      tableName: 'items',
      fieldName: 'type_id',
      referenceTable: 'item_types',
      referenceField: 'id',
      constraintName: 'items_type_id_fkey',
    });

    await addForeignKey({
      tableName: 'items',
      fieldName: 'brand_id',
      referenceTable: 'brands',
      referenceField: 'id',
      constraintName: 'items_brand_id_fkey',
    });

    await addForeignKey({
      tableName: 'items',
      fieldName: 'model_id',
      referenceTable: 'models',
      referenceField: 'id',
      constraintName: 'items_model_id_fkey',
    });

    await addForeignKey({
      tableName: 'items',
      fieldName: 'store_id',
      referenceTable: 'stores',
      referenceField: 'id',
      constraintName: 'items_store_id_fkey',
    });

    await addForeignKey({
      tableName: 'orders',
      fieldName: 'customer',
      referenceTable: 'customers',
      referenceField: 'id',
      constraintName: 'orders_customer_fkey',
    });

    await addForeignKey({
      tableName: 'item_order',
      fieldName: 'item_id',
      referenceTable: 'items',
      referenceField: 'item_id',
      constraintName: 'item_order_item_id_fkey',
    });

    await addForeignKey({
      tableName: 'item_order',
      fieldName: 'order_id',
      referenceTable: 'orders',
      referenceField: 'order_id',
      constraintName: 'item_order_order_id_fkey',
    });
  },

  async down(queryInterface) {
    const removeForeignKey = async (tableName, constraintName) => {
      try {
        await queryInterface.removeConstraint(tableName, constraintName);
      } catch (error) {
        if (!String(error.message).includes('does not exist')) {
          throw error;
        }
      }
    };

    await removeForeignKey('item_order', 'item_order_order_id_fkey');
    await removeForeignKey('item_order', 'item_order_item_id_fkey');
    await removeForeignKey('orders', 'orders_customer_fkey');
    await removeForeignKey('items', 'items_store_id_fkey');
    await removeForeignKey('items', 'items_model_id_fkey');
    await removeForeignKey('items', 'items_brand_id_fkey');
    await removeForeignKey('items', 'items_type_id_fkey');
    await removeForeignKey('items', 'items_categ_id_fkey');
    await removeForeignKey('models', 'models_brand_id_fkey');
  },
};
