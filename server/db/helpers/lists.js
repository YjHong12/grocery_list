const client = require("../client");

const createList = async ({ title, member_id }) => {
  try {
    const {
      rows: [list],
    } = await client.query(
      `
        INSERT INTO list(title, member_id)
        VALUES($1, $2)
        RETURNING *;
        `,
      [title, member_id]
    );
    console.log(list);
    return list;
  } catch (error) {
    throw error;
  }
};

const getAllLists = async () => {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM list;
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getListById = async (list_id) => {
  try {
    const {
      rows: [list],
    } = await client.query(
      `
        SELECT * FROM list
        WHERE "list_id" =${list_id};
        `
    );
    return list;
  } catch (error) {
    throw error;
  }
};

const updateList = async (list_id, body) => {
  try {
    const {
      rows: [list],
    } = await client.query(
      `
      UPDATE list
      SET title = $1, member_id = $2
      WHERE list_id = $3
      RETURNING *;
      
        `,
      [body.title, body.member_id, list_id]
    );
    console.log("Updated", list);
    return list;
  } catch (error) {
    throw error;
  }
};

const deleteList = async (list_id) => {
  try {
    const {
      rows: [list],
    } = await client.query(
      `
        DELETE FROM list
        WHERE list_id = $1;
        `,
      [list_id]
    );
    console.log("Deleted", list);
    return list;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createList,
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
};
