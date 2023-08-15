import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import "../style/list.css";

function ListSort() {
  const [chatMessages, setChatMessages] = useState(["Hii how can I help you?"]);
  const [newChatMessage, setNewChatMessage] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      handleLoadMessages();
    } 
  }, []);

  const handleSort = () => {
    const _chatMessages = [...chatMessages];
    const draggedItemContent = _chatMessages.splice(dragItem.current, 1)[0];
    _chatMessages.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setChatMessages(_chatMessages);
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
    return sessionStorage.getItem("token");
  };

  const handleSaveList = async () => {
    try {
      const token = getTokenFromStorage();
      const response = await axios.post(
        "https://cns-backend-gevs.onrender.com/api/save-item",
        {
          items: chatMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("List is saved");
    } catch (error) {
      console.error("Error saving list:", error);
      alert(error.message);
    }
  };

  const handleLoadMessages = async () => {
    try {
      const token = getTokenFromStorage();
      const response = await axios.get(
        "https://cns-backend-gevs.onrender.com/api/get-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      setChatMessages(response.data); // Set chat messages state
    } catch (error) {
      console.error("Error loading messages:", error);
      alert(error.message);
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
              onChange={handleChatMessageChange}
              value={newChatMessage}
            />
            <button className="btn" onClick={handleSendMessage}>
              Send
            </button>
            <button className="btn-2" onClick={handleSaveList}>
            Save List
          </button>
          <h5>Drag and Drop <span/> <FontAwesomeIcon icon={faArrowDown}/> </h5>
          </div>
          
          <div className="list-sort">
            {chatMessages.map((message, index) => (
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
                <h3>{message}</h3>
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
