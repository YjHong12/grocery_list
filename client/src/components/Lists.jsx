import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchListsByMember, createList } from "../../fetching";
import ItemList from "./ItemList";
import CreateList from "./CreateList";

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
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

  const handleSubmit = async (newList) => {
    try {
      const response = await createList(newList);
      if (response && response.list_id) {
        const updatedLists = await fetchListsByMember(member_id);
        setLists(updatedLists);
      } else {
        console.error("Error creating new list");
      }
    } catch (error) {
      console.error("Error creating new list", error);
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
              <li
                key={list.list_id}
                onClick={() => setSelectedList(list.list_id)}
                className={selectedList === list.list_id ? "selected" : ""}
              >
                {list.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ------------ FORM TO CREATE LISTS ------------ */}
      <CreateList onSubmit={handleSubmit} />

      {/* ------------ FILTERED LIST ------------ */}
      {selectedList && <ItemList listId={selectedList} />}
    </div>
  );
}