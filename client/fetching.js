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
// FETCH SINGLE MEMBER BY ID
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
// FETCH CREATE MEMBER
export async function createMember(member) {
  try {
    const response = await fetch(`${API}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Created member:", result);
      return result;
    } else {
      console.error("Failed to create member");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// FETCH LOGIN MEMBER
export async function loginMember(username, password) {
  try {
    const response = await fetch(`${API}/members/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    console.log("Logged in member", result);
    return result;
  } catch (error) {
    console.error(error);
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
// FETCH CREATE ITEM
export async function createItem(item) {
  try {
    const response = await fetch(`${API}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Created item:", result);
      return result;
    } else {
      console.error("Failed to create item");
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
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
// FETCH CREATE LIST
export async function createList(list) {
  try {
    const response = await fetch(`${API}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Created list:", result);
      return result;
    } else {
      console.error("Failed to create list");
    }
  } catch (error) {
    console.error(error);
  }
}
