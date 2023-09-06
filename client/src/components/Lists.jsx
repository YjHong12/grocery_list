import { useState, useEffect } from "react";
import { fetchLists, createList } from "../../fetching";
import ItemList from "./ItemList";

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const [listItems, setListItems] = useState([
    { itemName: "", itemQuantity: "" },
  ]);

  // FETCH ALL LISTS
  useEffect(() => {
    async function getAllLists() {
      const listsData = await fetchLists();
      console.log(listsData);
      if (listsData) {
        setLists(listsData);
      } else {
        console.error("Error fetching all lists");
      }
    }
    getAllLists();
  }, []);

  const handleListClick = (listId) => {
    setSelectedList(listId);
  };

  // CREATE NEW LIST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newList = {
        title: listTitle,
        items: listItems.filter((item) => item.itemName && item.itemQuantity),
      };

      const response = await createList(newList);
      if (response && response.list_id) {
        const updatedLists = await fetchLists();
        setLists(updatedLists);
        setListTitle("");
        setListItems([{ itemName: "", itemQuantity: "" }]);
      } else {
        console.error("Error creating new list");
      }
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
    <div className="lists">
      <h1>LISTS</h1>

      <div className="listContainer">
        <ul>
          {lists.map((list) => (
            <li
              key={list.list_id}
              onClick={() => handleListClick(list.list_id)}
              className={selectedList === list.list_id ? "selected" : ""}
            >
              {list.title}
            </li>
          ))}
        </ul>
      </div>

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

      {/* ------------ FILTERED LIST ------------ */}
      {selectedList && <ItemList listId={selectedList} />}
    </div>
  );
}
