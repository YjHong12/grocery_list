import React, { useState } from "react";
import { createItem, createList, fetchLists } from "../../fetching";
import { useParams } from "react-router-dom";

export default function CreateList({ listId }) {
    const [title, setTitle] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const { member_id } = useParams();

  // CREATE NEW LIST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newList = {
        title: title,
        member_id: member_id,
        list_id: listId
      }
      
      const response = await createList(newList); 
      const updatedList = await fetchLists();
        setTitle("");
        setItemName("");
        setQuantity("");
    } catch (error) {
        console.error("Error creating list", error);
      }
    };

  return (
    <div>
      {/* ------------ FORM TO CREATE LISTS ------------ */}
      <h1>Create a New List</h1>
      <form className="createList" onSubmit={handleSubmit}>
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
              Item:
              <input
                type="text"
                name="itemName"
                id="item"
                required
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                />
                </label>
                <br />
                <button type="submit">Create List</button>
              </form>
            </div>
          );
        }