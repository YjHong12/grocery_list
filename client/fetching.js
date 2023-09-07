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
      throw new Error("Failed to create item");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// FETCH DELETE ITEM
export async function deleteItem(item_id) {
  try {
    const response = await fetch(`${API}/items/${item_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Deleted item ${item_id}`);
    } else {
      console.error(`Error deleting item ${item_id}`);
      throw error
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// FETCH UPDATE ITEM
export async function updateItem(item) {
  try {
    const response = await fetch(`${API}/items/${item.item_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Updated item", result);
      return result;
    } else {
      console.error("Error updating item");
      throw new Error("Error updating item");
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
// FETCH SINGLE LIST BY ID
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
// FETCH LISTS BY MEMBER
export async function fetchListsByMember(member_id) {
  try {
    const response = await fetch(`${API}/lists/member/${member_id}`);
    const result = await response.json();
    console.log("Fetched lists of member", result);
    return result;
  } catch (error) {
    console.error("Trouble fetching lists of member", error);
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
      throw new Error("Failed to create list");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// FETCH DELETE LIST
export async function deleteList(list_id) {
  try {
    const response = await fetch(`${API}/lists/${list_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Deleted list ${list_id}`);
    } else {
      console.error(`Error deleting list ${list_id}`);
      alert("This list still has groceries!")
    }
  } catch (error) {
    console.error(error);
  }
}
// FETCH UPDATE LIST
export async function updateList(list) {
  try {
    const response = await fetch(`${API}/lists/${list.list_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Updated list", result);
      return result;
    } else {
      console.error("Error updating list");
      throw new Error("Error updating list");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}