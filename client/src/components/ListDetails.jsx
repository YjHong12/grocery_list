import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemList from "./ItemList";

export default function ListDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = location.state || {};

  const goBackToLists = () => {
    navigate(-1);
  };

  return (
    <div>
      {list ? (
        <div>
          <h1>{list.title}</h1>
          <ItemList listId={list.list_id} />
          <br /><div className="backToList">
          <button onClick={goBackToLists}>Back to My Lists</button></div>
        </div>
      ) : (
        <p>No list data</p>
      )}
    </div>
  );
}
