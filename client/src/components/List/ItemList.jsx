import { useState, useEffect } from "react";
import { fetchItems, createItem, deleteItem, updateItem } from "../../../fetching";
import EditItemForm from "../EditItemForm";

export default function ItemList({ listId }) {
  const [items, setItems] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  // FETCH ALL ITEMS
  useEffect(() => {
    async function getAllItems() {
      try {
        const API = await fetchItems();
        setItems(API || []);
      } catch (error) {
        console.error("Error fetching items", error);
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
      await createItem(newItem);
      const updatedItems = await fetchItems();
      setItems(updatedItems || []);
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
      setItems(updatedItems || []);
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  // UPDATE ITEM
  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await updateItem(updatedItem);
      const updatedItems = await fetchItems();
      setItems(updatedItems || []);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  return (
    <div className="items">
      {/* ------------ SEARCH FOR ITEMS ------------ */}
      <div className="searchItem">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search for item"
            value={searchParam}
            onChange={(event) =>
              setSearchParam(event.target.value.toLowerCase())
            }
          />
        </label>
      </div>
      <br />

      {/* ------------ LIST OF ITEMS ------------ */}
      {filteredItem.map((item) => (
        <li key={item.item_id} className="item-container">
          <h4 className="itemName" >{item.item_name}</h4>
          < br/><b>Quantity: </b>{item.quantity}
           <br /><br />
          <div className="listButtons">
          <button className="deleteItemButton" onClick={() => handleDelete(item.item_id)}>Delete</button>
          <button className="editItemButton" onClick={() => handleEditItem(item)}>Edit Item</button></div>
      {/* ------------ EDIT ITEMS ------------ */}
      <div className="editItemForm">
      {editingItem === item && (
        <EditItemForm
          item={editingItem}
          onUpdateItem={handleUpdateItem}
          onCancel={() => setEditingItem(null)}
        />
      )}</div>
        </li>
      ))}

      {/* ------------ FORM TO ADD ITEMS ------------ */}
      <h2 className="addItemTitle">Add More Items!</h2><br />
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
    </div>
  );
}