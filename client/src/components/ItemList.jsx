import { useState, useEffect } from "react";
import { fetchItems, createItem, deleteItem } from "../../fetching";

export default function ItemList({ listId }) {
  const [items, setItems] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  // FETCH ALL ITEMS
  useEffect(() => {
    async function getAllItems() {
      const API = await fetchItems();
      console.log(API);
      if (API) {
        setItems(API);
      } else {
        console.error("Error fetching items");
      }
    }
    getAllItems();
  }, []);

  // FILTER ITEMS TO LIST
  const filteredItems = listId
    ? items.filter((item) => item.list_id === listId)
    : items;

  // SEARCH FOR ITEM
  const filteredItem = searchParam
    ? filteredItems.filter((item) =>
        item.item_name.toLowerCase().includes(searchParam.toLowerCase())
      )
    : filteredItems;

  // CREATE NEW ITEMS
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newItem = {
        item_name: itemName,
        quantity: quantity,
        list_id: listId,
      };
      const response = await createItem(newItem);
      const updatedItems = await fetchItems();
      setItems(updatedItems);
      setItemName("");
      setQuantity("");
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

// DELETE ITEM
const handleDelete = async (itemId) => {
  try {
    await deleteItem(itemId);
    const updatedItems = await fetchItems();
    setItems(updatedItems);
  } catch (error) {
    console.error("Error deleting item", error);
  }
};

  return (
    <div className="items">
      <h1>ITEMS</h1>

      {/* ------------ SEARCH FOR ITEMS ------------ */}
      <div className="searchItem">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            value={searchParam}
            onChange={(event) =>
              setSearchParam(event.target.value.toLowerCase())
            }
          />
        </label>
      </div>
      <br />

      {/* ------------ FORM TO ADD ITEMS ------------ */}
      <form className="createItem" onSubmit={handleSubmit}>
        <label>
          <b>Item Name: </b>
          <input
            type="text"
            name="itemName"
            id="itemName"
            required
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
        </label>
        <br />
        <label>
          <b>Quantity: </b>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <button type="submit">Add Item</button>
        <br />
      </form>

      {/* ------------ FILTER/DELETE ITEMS ------------ */}
      {filteredItem.map((item) => (
        <li key={item.item_id}>
          <h4>{item.item_name}</h4>
          <p>{item.quantity}</p>
          <button onClick={() => handleDelete(item.item_id)}>Delete</button>
        </li>
      ))}
    </div>
  );
}
