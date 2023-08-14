import React, { useState, useRef } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "../style/list.css";

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

  const getTokenFromStorage = () => {
    return sessionStorage.getItem('token');
  };

  const handleSaveList = async () => {
    try {
      const token = getTokenFromStorage();
      const response = await axios.post("http://localhost:5000/api/save-item", {
        items: fruitItems,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("List saved:", response.data);
      alert("list is saved");
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  const handleLoadMessages = async () => {
    try {
      const token = getTokenFromStorage();
      const response = await axios.get("http://localhost:5000/api/get-items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setChatMessages(response.data);
      setFruitItems(response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="list-container">
          <h2>Messages Flow</h2>
          <div className="input-group">
            <input
              type="text"
              name="fruitName"
              placeholder="Write message"
              onChange={handleNameChange}
            />
            <button className="btn" onClick={handleAddItem}>
              Add item
            </button>
          </div>
          <button className="btn" onClick={handleSaveList}>
            Save List
          </button>
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
            <button className="btn" onClick={handleLoadMessages}>
              Load Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSort;
