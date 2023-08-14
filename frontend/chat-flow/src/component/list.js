import React, { useState, useRef } from "react";
import "../style/list.css"

function ListSort() {
  const [fruitItems, setFruitItems] = useState(["Hii how can i help you?"]);
  const [newFruitItem, setNewFruitItem] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _fruitItems = [...fruitItems];
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setFruitItems(_fruitItems);
  };

  const handleNameChange = (e) => {
    setNewFruitItem(e.target.value);
  };

  const handleAddItem = () => {
    const _fruitItems = [...fruitItems];
    _fruitItems.push(newFruitItem);
    setFruitItems(_fruitItems);
  };

  const handleChatMessageChange = (e) => {
    setNewChatMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newChatMessage.trim() !== "") {
      const newMessages = [...chatMessages, newChatMessage];
      setChatMessages(newMessages);
      setNewChatMessage("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="list-container">
          <h2>Fruit List</h2>
          <div className="input-group">
            <input
              type="text"
              name="fruitName"
              placeholder="e.g Banana"
              onChange={handleNameChange}
            />
            <button className="btn" onClick={handleAddItem}>
              Add item
            </button>
          </div>
          <div className="list-sort">
            {fruitItems.map((item, index) => (
              <div
                key={index}
                className="list-item"
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <i className="fa-solid fa-bars"></i>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-container">
          <h2>Chat Box</h2>
          <div className="chat-box">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-message">
                {message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newChatMessage}
              onChange={handleChatMessageChange}
            />
            <button className="btn" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSort;
