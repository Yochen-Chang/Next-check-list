"use client";

import { useState } from "react";

const Home = () => {
  const [items, setItems] = useState([
    { id: 1, content: "First Check item", ifCheck: false },
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      content: `New check item`,
      ifCheck: false,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, newContent: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  const toggleCheck = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ifCheck: !item.ifCheck } : item
      )
    );
  };

  return (
    <main className="container">
      <h1>Check List</h1>
      <ul className="check-list">
        {items.map((item) => (
          <CheckItem
            key={item.id}
            id={item.id}
            content={item.content}
            ifCheck={item.ifCheck}
            onDelete={deleteItem}
            onUpdate={updateItem}
            onToggleCheck={toggleCheck}
          />
        ))}
      </ul>
      <button onClick={addItem}>Add new check item</button>
    </main>
  );
};

interface CheckItemProps {
  id: number;
  content: string;
  ifCheck: boolean;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newContent: string) => void;
  onToggleCheck: (id: number) => void;
}

const CheckItem = ({
  id,
  content,
  ifCheck,
  onDelete,
  onUpdate,
  onToggleCheck,
}: CheckItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(id, newContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewContent(content);
  };

  const handleCheckboxChange = () => {
    if (isEditing) {
      handleCancelClick();
    }
    onToggleCheck(id);
  };

  return (
    <li className={ifCheck ? "check-item checked" : "check-item"}>
      <input
        type="checkbox"
        checked={ifCheck}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="item-content"
        />
      ) : (
        <p className="item-content">{content}</p>
      )}
      {isEditing ? (
        <>
          <button className="btn" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className="btn" onClick={handleEditClick}>
            Edit
          </button>
          <button className="btn" onClick={() => onDelete(id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default Home;
