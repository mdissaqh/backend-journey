import React, { useEffect, useState } from 'react'
import { useChat } from '../hooks/useChat'
import '../style/dashboard.scss'
import { useSelector } from 'react-redux'
import { RiAddLine, RiArrowUpLine } from '@remixicon/react'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('');
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) return;

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('');
  };

  const openChat = (chatId, chats) => {
    chat.handleOpenChat(chatId, chats)
  }

  const handleNewChat = () => {
    chat.handleOpenChat(null, chats)
  }

  return (
    <main className="dashboard-main">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Chats</h2>
          <button className="new-chat-btn" onClick={handleNewChat}>
            <RiAddLine size={20} />
            <span>New Chat</span>
          </button>
        </div>
        <div className="chat-list">
          {Object.values(chats).map((chatItem) => (
            <button
              onClick={() => { openChat(chatItem.id, chats) }}
              key={chatItem.id}
              className={`chat-list-item ${chatItem.id === currentChatId ? 'active' : ''}`}
            >
              {chatItem.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="chat-container">
        <div className="messages-area">
          {currentChatId && chats[currentChatId]?.messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.role === 'user' ? 'user-message' : 'ai-message'}`}
            >
              {message.role === 'user' ? (
                <div className="message-bubble">{message.content}</div>
              ) : (
                <div className="message-content">
                  {message.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <footer className="input-footer">
          <form onSubmit={handleSubmitMessage} className="input-form">
            <button type="button" className="icon-btn plus-btn" title="Add attachment">
              <RiAddLine />
            </button>
            <input
              type="text"
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask anything"
              className="chat-input"
            />
            <div className="input-actions">
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="send-btn"
                title="Send message"
              >
                <RiArrowUpLine />
              </button>
            </div>
          </form>
        </footer>
      </section>
    </main>
  )
}

export default Dashboard