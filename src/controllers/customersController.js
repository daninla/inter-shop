import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class CustomersController extends BaseController {
  constructor() {
    super(db.Customers, {
      createFields: ["name", "email", "password"],
      updateFields: ["name", "email"],
      deleteField: "email",
    });
  }

  getCustomerWithMostOrders = async (req, res, next) => {
    return this.execute(res, next, async (transaction) => {
      const [rows] = await this.model.sequelize.query(
        `
        SELECT
          c.name,
          COUNT(o.order_id) AS purchases_count
        FROM customers AS c
        LEFT JOIN orders AS o ON o.customer = c.id
        GROUP BY c.id, c.name
        ORDER BY purchases_count DESC, c.id ASC
        LIMIT 1;
        `,
        { transaction },
      );
      return { data: rows[0] || null };
    });
  };

  getCustomerWithMostExpensiveItem = async (req, res, next) => {
    return this.execute(res, next, async (transaction) => {
      const [rows] = await this.model.sequelize.query(
        `
        SELECT
          c.name,
          MAX(i.price) AS max_item_price
        FROM customers AS c
        JOIN orders AS o ON o.customer = c.id
        JOIN item_order AS io ON io.order_id = o.order_id
        JOIN items AS i ON i.item_id = io.item_id
        GROUP BY c.id, c.name
        ORDER BY max_item_price DESC, c.id ASC
        LIMIT 1;
        `,
        { transaction },
      );
      return { data: rows[0] || null };
    });
  };
}

export default new CustomersController();
