import React, { useState } from "react";
import { fetchLists, createList } from "../../fetching";

export default function CreateList({onSubmit}) {
  const [listTitle, setListTitle] = useState("");
  const [listItems, setListItems] = useState([
    { itemName: "", itemQuantity: "" },
  ]);

  // CREATE NEW LIST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newList = {
        title: listTitle,
        items: listItems.filter((item) => item.itemName && item.itemQuantity),
      };
      onSubmit(newList);

    //   const response = await createList(newList);
    //   if (response && response.list_id) {
    //     const updatedLists = await fetchLists();
    //     setLists(updatedLists);
        setListTitle("");
        setListItems([{ itemName: "", itemQuantity: "" }]);
    //   } else {
    //     console.error("Error creating new list");
    //   }
    } catch (error) {
      console.error("Error creating new list", error);
    }
  };

  // ADD ITEMS TO LIST
  const handleItemSubmit = (index, event) => {
    const { name, value } = event.target;
    const addedItems = [...listItems];
    addedItems[index][name] = value;
    setListItems(addedItems);
  };
  const addNewItem = () => {
    setListItems([...listItems, { itemName: "", itemQuantity: "" }]);
  };

  return (
    <div>
      {/* ------------ FORM TO CREATE LISTS ------------ */}
      <form onSubmit={handleSubmit}>
        <label>
          <b>List Title: </b>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={listTitle}
            onChange={(event) => setListTitle(event.target.value)}
          />
        </label>
        <br />
        {listItems.map((item, index) => (
          <div key={index}>
            <label>
              Item:
              <input
                type="text"
                name="itemName"
                id="item"
                required
                value={item.itemName}
                onChange={(event) => handleItemSubmit(index, event)}
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                name="itemQuantity"
                id="quantity"
                value={item.itemQuantity}
                onChange={(event) => handleItemSubmit(index, event)}
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={addNewItem}>
          Add Item
        </button>
        <button type="submit">Create List</button>
        <br />
      </form>
    </div>
  );
}
