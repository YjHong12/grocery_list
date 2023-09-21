import React, { useState } from "react";
import { createList, createItem, fetchLists } from "../../../fetching";
import { useParams } from "react-router-dom";

export default function CreateList({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [listId, setListId] = useState(null);
  const { member_id } = useParams();

  const handleCreateList = async () => {
    try {
      if (!title) {
        return;
      }
      const newList = await createList({ title, member_id });
      const newListId = newList.list_id;

      for (const item of items) {
        await createItem({ ...item, list_id: newListId });
      }
      onSubmit(newList);
      setTitle("");
      setItemName("");
      setQuantity("");
      setItems([]);
    } catch (error) {
      console.error("Error creating list", error);
    }
  };

  const addItemToList = () => {
    if (!itemName || !quantity) {
      return;
    }
    const newItem = {
      item_name: itemName,
      quantity: quantity,
    };
    setItems([...items, newItem]);
    setItemName("");
    setQuantity("");
  };

  return (
    <div>
      {/* ------------ FORM TO CREATE LISTS ------------ */}
      <h1>Create a New List</h1>
      <form className="createList">
        <label>
          <b>List Title: </b>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
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
        <label>
          <b>Quantity: </b>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <button type="button" onClick={addItemToList}>
          Add Item
        </button>
        <br />
        {items.length > 0 && (
          <div>
            <h3>Added Items:</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.item_name}, {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" onClick={handleCreateList}>
          Create List
        </button>
      </form>
    </div>
  );
}