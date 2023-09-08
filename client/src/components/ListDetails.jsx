import React from "react";
import { useLocation } from "react-router-dom";
import ItemList from "./ItemList";

export default function ListDetails() {
  const location = useLocation();
  const { list } = location.state || {};

  return (
    <div>
      {list ? (
        <div>
          <h1>{list.title}</h1>
          <ItemList listId={list.list_id} />
        </div>
      ) : (
        <p>No list data</p>
      )}
    </div>
  );
}
