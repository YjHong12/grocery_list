const client = require("../client");

const createItem = async ({ item_name, quantity, list_id }) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        INSERT INTO item( item_name, quantity, "list_id" )
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [item_name, quantity, list_id]
    );
    console.log(item);
    return item;
  } catch (error) {
    throw error;
  }
};

const getAllItems = async () => {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM item;
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getItemById = async (item_id) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        SELECT *
        FROM item
        WHERE "item_id" =${item_id};
        `
    );
    return item;
  } catch (error) {
    throw error;
  }
};

module.exports = { createItem, getAllItems, getItemById };
