// Resets database
const client = require("./client");

const { createMember, getAllMembers } = require("./helpers/members");
const { createList, getAllLists } = require("./helpers/lists");
const { createItem, getAllItems } = require("./helpers/items");

const { member, list, item } = require("./seedData");

// Drop existing tables
const dropTables = async () => {
  try {
    console.log("Dropping tables");
    await client.query(`
        DROP TABLE IF EXISTS item;
        DROP TABLE IF EXISTS list;
        DROP TABLE IF EXISTS member;
        DROP TABLE IF EXISTS itemList;
        `);
    console.log("Dropped tables");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
};

// Create tables for data
const createTables = async () => {
  console.log("Creating tables");
  await client.query(`
  CREATE TABLE member (
      member_id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
  );
    CREATE TABLE list (
        list_id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL,
        "member_id" INTEGER REFERENCES member(member_id) NOT NULL
    );
    CREATE TABLE item (
        item_id SERIAL PRIMARY KEY,
        item_name varchar(255) NOT NULL,
        quantity INTEGER,
        "list_id" INTEGER REFERENCES list(list_id) NOT NULL
    );
    CREATE TABLE itemList (
      itemlist_id SERIAL PRIMARY KEY,
      "list_id" INTEGER REFERENCES list(list_id) NOT NULL
      "item_id" INTEGER REFERENCES item(item_id) NOT NULL
  );
    `);
  console.log("Created tables");
};

//Inserts mock data from seedData.js
//Create Member
const createInitialMembers = async () => {
  try {
    for (const singleMember of member) {
      await createMember(singleMember);
    }
    console.log("Created Members");
  } catch (error) {
    throw error;
  }
};

//Create list
const createInitialLists = async () => {
  try {
    for (const singleList of list) {
      await createList(singleList);
    }
    console.log("Created list");
  } catch (error) {
    throw error;
  }
};

//Create item
const createInitialItems = async () => {
  try {
    for (const singleItem of item) {
      await createItem(singleItem);
    }
    console.log("Created item");
  } catch (error) {
    throw error;
  }
};

//Create item list
const createInitialItemList = async () => {
  try {
    for (const singleItemList of itemList) {
      await createInitialItemList(singleItemList);
    }
    console.log("Create Item List");
  } catch (error) {
    throw error;
  }
};

//Call functions
const rebuildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    console.log("Starting to seed");

    await createInitialMembers();
    await createInitialLists();
    await createInitialItems();
    await createInitialItemList();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

rebuildDb();
