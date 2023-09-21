import React, { useState } from "react";

export default function EditItemForm({ item, onUpdateItem, onCancel }) {
  const [updatedItemName, setUpdatedItemName] = useState(item.item_name);
  const [updatedQuantity, setUpdatedQuantity] = useState(item.quantity);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedItem = {
      ...item,
      item_name: updatedItemName,
      quantity: updatedQuantity,
    };

    onUpdateItem(updatedItem);
  };

  return (
    <div className="EditItemForm">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="updatedItemName">Item Name: </label>
          <input
            type="text"
            id="updatedItemName"
            value={updatedItemName}
            onChange={(event) => setUpdatedItemName(event.target.value)}
          />
        </div><br />
        <div>
          <label htmlFor="updatedQuantity">Quantity: </label>
          <input
            type="number"
            id="updatedQuantity"
            value={updatedQuantity}
            onChange={(event) => setUpdatedQuantity(event.target.value)}
          />
        </div><br />
        <div className="buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
