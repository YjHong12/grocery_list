const client = require("../client");

const createMember = async ({ name, username, password }) => {
  try {
    const {
      rows: [member],
    } = await client.query(
      `
        INSERT INTO member(name, username, password)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [name, username, password]
    );
    console.log(member);
    return member;
  } catch (error) {
    throw error;
  }
};

const getAllMembers = async () => {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM member;
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getMemberById = async (member_id) => {
    try {
      const {
        rows: [member],
      } = await client.query(
        `
          SELECT *
          FROM member
          WHERE "member_id" =${member_id};
          `
      );
      return member;
    } catch (error) {
      throw error;
    }
  };

  const updateMember = async ({ name, username, password }) => {
    try {
      const {
        rows: [member],
      } = await client.query(
        `
          UPDATE member
          SET member( name, username, password )
          VALUES($1, $2, $3)
          WHERE "member_id" =${member_id};
          RETURNING *;
          `,
        [name, username, password]
      );
      console.log("Updated", member);
      return member;
    } catch (error) {
      throw error;
    }
  };
  
  const deleteMember = async (member_id) => {
    try {
      const {
        rows: [member],
      } = await client.query(
        `
          DELETE * FROM member
          WHERE "member_id" =${member_id};
          `
      );
      console.log("Deleted", member);
      return member;
    } catch (error) {
      throw error;
    }
  };


module.exports = { createMember, getAllMembers, getMemberById, updateMember, deleteMember };
