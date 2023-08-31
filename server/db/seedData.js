// arrays with mock data
// member
const member = [
  { name: "Dairy Queen", username: "lactose", password: "milk" },
  { name: "Pork Belly", username: "lovemeat", password: "steak" },
  { name: "Very Cold", username: "chilly", password: "itsice" },
];

// grocery List
const list = [
  { title: "Dairy", member_id: 1 },
  { title: "Meat", member_id: 2 },
  { title: "Frozen", member_id: 3 },
];

// grocery Items
const item = [
  { item_name: "Milk", quantity: 2, list_id: 1 },
  { item_name: "Pork", quantity: 1, list_id: 2 },
  { item_name: "Ice Cream", quantity: 4, list_id: 3 },
];

module.exports = { member, list, item };
