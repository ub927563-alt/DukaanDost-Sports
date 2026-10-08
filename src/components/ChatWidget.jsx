import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your DukaanDost Sports assistant. Ask me about products, prices or delivery." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    // Replace this local reply with POST /api/chat when the Node.js backend is connected.
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Thanks! The AI assistant is ready for the Node.js /api/chat connection. For now, please browse our sports products."
        }
      ]);
    }, 500);
  };

  return (
    <>
      {open && (
        <div className="chat-box">
          <div className="chat-head">
            <div>
              <strong>🏆 Sports Assistant</strong>
              <small>Online</small>
            </div>
            <button onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={sendMessage}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask in English or Roman Urdu..." />
            <button>➤</button>
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(!open)}>💬</button>
    </>
  );
}