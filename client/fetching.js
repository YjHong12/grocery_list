const API = `http://localhost:8080/api`;

// A GET request for a single item by id
export async function getItemById(item_id) {
  try {
    const response = await fetch(`${API}/items/${item_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Trouble fetching item", error);
  }
}

// A GET request for all items
export async function fetchItems() {
  try {
    const response = await fetch(`${API}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Trouble fetching items", error);
  }
}

// A POST request to add a new item
export async function newItem(item) {
  try {
    const response = await fetch(`${API}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// A PUT or PATCH request to update an item by id
export async function updateItem(item_id, item) {
  try {
    const response = await fetch(`${API}/items/${item_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// A DELETE request to delete an item by id
export async function deleteItem(item_id) {
  try {
    const response = await fetch(`${API}/items/${item_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
