import React, { useState } from "react";
import { createList, fetchLists } from "../../fetching";
import { useParams } from "react-router-dom";

export default function CreateList({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [listId, setListId] = useState(null); 
  const { member_id } = useParams();

  // CREATE NEW LIST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!title) {
        return;
      }
  
      const newList = {
        title: title,
        member_id: member_id,
      };
      const response = await createList(newList);
      const updatedList = await fetchLists();
      const newListId = response.list_id;
      setListId(newListId);
      onSubmit(newListId);
      setTitle("");
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
        <button type="submit">Create List</button>
      </form>
    </div>
  );
}
