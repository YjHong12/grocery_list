import React, { useState } from "react";

export default function UpdateList({ list, onUpdateList, onCancel }) {
  const [newTitle, setNewTitle] = useState(list.title);

  const handleUpdateList = () => {
    onUpdateList({ ...list, title: newTitle });
  };
  return (
    <div>
      <h2>Edit List</h2>
      <input
        type="text"
        name="newTitle"
        id="newTitle"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <button onClick={handleUpdateList}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
