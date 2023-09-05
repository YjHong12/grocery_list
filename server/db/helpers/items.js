const client = require("../client");

const createItem = async ({ item_name, quantity, list_id }) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        INSERT INTO item( item_name, quantity, list_id )
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
        SELECT * FROM item;
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
        SELECT * FROM item
        WHERE "item_id" =${item_id};
        `
    );
    return item;
  } catch (error) {
    throw error;
  }
};

const updateItem = async ({ item_name, quantity, list_id }) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        UPDATE item
        SET item_name = $1, quantity = $2, list_id = $3
        WHERE item_id =$4;
        RETURNING *;
        `,
      [item_name, quantity, list_id, item_id]
    );
    console.log("Updated", item);
    return item;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (item_id) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        DELETE FROM item
        WHERE item_id =$1;
        `, [item_id]
    );
    console.log("Deleted", item);
    return item;
  } catch (error) {
    throw error;
  }
};

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem };