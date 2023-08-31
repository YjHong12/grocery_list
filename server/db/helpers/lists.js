const client = require("../client");

const createList = async ({ title, member_id }) => {
  try {
    const {
      rows: [list],
    } = await client.query(
      `
        INSERT INTO list(title, "member_id")
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

module.exports = { createList, getAllLists };
