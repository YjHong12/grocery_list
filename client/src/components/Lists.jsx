import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchListsByMember,
  createList,
  deleteList,
  updateList,
} from "../../fetching";
import ItemList from "./ItemList";
import CreateList from "./CreateList";
import UpdateList from "./UpdateList";

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [updatingList, setUpdatingList] = useState(null);
  const { member_id } = useParams();

  // FETCH LISTS OF LOGGED IN MEMBER
  useEffect(() => {
    async function getMemberLists() {
      if (!member_id) return;

      try {
        const memberLists = await fetchListsByMember(member_id);
        setLists(memberLists);
      } catch (error) {
        console.error("Error fetching lists for member:", error);
      }
    }
    getMemberLists();
  }, [member_id]);

  const handleCreateList = async (newList) => {
    try {
      const response = await createList(newList);
      if (response && response.list_id) {
        setLists([...lists, newList]);
        setSelectedList(newList.list_id);
      } else {
        console.error("Error creating new list");
      }
    } catch (error) {
      console.error("Error creating/fetching lists", error);
    }
  };

  const handleSubmit = async (newList) => { // Define handleSubmit function
    try {
      const response = await createList(newList);
      if (response && response.list_id) {
        setLists([...lists, newList]);
        setSelectedList(newList.list_id);
      } else {
        console.error("Error creating new list");
      }
    } catch (error) {
      console.error("Error creating/fetching lists", error);
    }
  };

  // DELETE LIST
  const handleDeleteList = async (list_id) => {
    try {
      const selectedList = lists.find((list) => list.list_id === list_id);

      if (!selectedList) {
        console.error("List not found.");
        return;
      }

      if (selectedList && selectedList.items && selectedList.items.length > 0) {
        alert("List still has groceries!");
        return;
      }

      await deleteList(list_id);
      const updatedLists = await fetchListsByMember(member_id);
      setLists(updatedLists);
      if (selectedList === list_id) {
        setSelectedList(null);
      }
    } catch (error) {
      console.error("Error deleting list", error);
    }
  };

  // UPDATE LIST
  const handleUpdateList = async (updatedList) => {
    try {
      await updateList(updatedList);
      const updatedLists = await fetchListsByMember(member_id);
      setLists(updatedLists);
      setUpdatingList(null);
    } catch (error) {
      console.error("Error updating list", error);
    }
  };

  return (
    <div className="lists">
      <h1>LISTS</h1>

      {member_id && (
        <div>
          <h1>Lists</h1>
          <ul>
            {lists.map((list) => (
              <li key={list.list_id}>
                <span
                  onClick={() => setSelectedList(list.list_id)}
                  className={selectedList === list.list_id ? "selected" : ""}
                >
                  {list.title}
                </span>
                <button onClick={() => handleDeleteList(list.list_id)}>
                  Delete
                </button>
                <button onClick={() => setUpdatingList(list)}>Edit List</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ------------ FORM TO CREATE LISTS ------------ */}
      <CreateList onSubmit={handleSubmit} />

      {/* ------------ EDIT LIST/ITEM ------------ */}
      {updatingList && (
        <UpdateList
          list={updatingList}
          onUpdateList={handleUpdateList}
          onCancel={() => setUpdatingList(null)}
        />
      )}

      {/* ------------ FILTERED LIST ------------ */}
      {selectedList && <ItemList listId={selectedList} />}
    </div>
  );
}
