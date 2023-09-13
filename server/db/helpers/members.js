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

const loginMember = async (username, password) => {
  try {
    console.log(username, password);
    const {
      rows: [member],
    } = await client.query(
      `
        SELECT * 
        FROM member 
        WHERE username = $1
        AND password = $2;
          `, 
          [username, password]
    );
    console.log("Logged in", member);
    return member;
  } catch (error) {
    throw error;
  }
};

const updateMember = async (member_id, { name, username, password }) => {
  try {
    const {
      rows: [member],
    } = await client.query(
      `
        UPDATE member
        SET name = $1, username = $2, password = $3
        WHERE member_id = $4
        RETURNING *;
        
          `,
      [name, username, password, member_id]
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
          DELETE FROM member
          WHERE member_id =$1;
          `,
      [member_id]
    );
    console.log("Deleted", member);
    return member;
  } catch (error) {
    throw error;
  }
};

const getMemberByUsername = async (username) => {
  const {
    rows: [member],
  } = await client.query(
    `
    SELECT * FROM member
    WHERE member.username = $1
    `,
    [username]
  )
  return member
}

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  loginMember,
  deleteMember,
  getMemberByUsername
};
