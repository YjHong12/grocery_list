import React, { useState } from "react";

export default function UpdateItem({ item, onUpdateItem, onCancel }) {
  const [newItemName, setNewItemName] = useState(item.item_name);
  const [newQuantity, setNewQuantity] = useState(item.quantity);

  const handleUpdateItem = () => {
    onUpdateItem({ ...item, item_name: newItemName, quantity: newQuantity });
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <input
        type="text"
        name="newItemName"
        id="newItemName"
        value={newItemName}
        onChange={(event) => setNewItemName(event.target.value)}
      />
      <input
        type="number"
        name="newQuantity"
        id="newQuantity"
        value={newQuantity}
        onChange={(event) => setNewQuantity(event.target.value)}
      />
      <button onClick={handleUpdateItem}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
