const API = `http://localhost:8080/api`;

// FETCH ALL MEMBERS
export async function fetchMembers() {
  try {
    const response = await fetch(`${API}/members`);
    const result = await response.json();
    console.log("Fetched all members", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching members", error);
  }
}
// FETCH SINGLE MEMBER
export async function fetchMemberById(member_id) {
  try {
    const response = await fetch(`${API}/members/${member_id}`);
    const result = await response.json();
    console.log("Fetched user", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching member", error);
  }
}

// -----------------------------------
// FETCH ALL ITEMS
export async function fetchItems() {
  try {
    const response = await fetch(`${API}/items`);
    const result = await response.json();
    console.log("Fetched items", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching items", error);
  }
}
// FETCH SINGLE ITEM
export async function fetchItemById(item_id) {
  try {
    const response = await fetch(`${API}/items/${item_id}`);
    const result = await response.json();
    console.log("Fetched item", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching item", error);
  }
}

// -----------------------------------
// FETCH ALL LISTS
export async function fetchLists() {
  try {
    const response = await fetch(`${API}/lists`);
    const result = await response.json();
    console.log("Fetched lists", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching lists", error);
  }
}
// FETCH SINGLE LIST
export async function fetchListById(list_id) {
  try {
    const response = await fetch(`${API}/lists/${list_id}`);
    const result = await response.json();
    console.log("Fetched list", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching list", error);
  }
}