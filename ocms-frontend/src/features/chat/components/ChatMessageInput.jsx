import { useState } from "react";

const ChatMessageInput = ({disabled,onSend,}) => {
  
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = message.trim();

    if (!content || disabled) {
      return;
    }

    onSend(content);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-top p-3"
    >
      <div className="input-group">
        <textarea
          className="form-control"
          rows="1"
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={5000}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            disabled ||
            !message.trim()
          }
        >
          <i className="bi bi-send" /> Gửi
        </button>
      </div>

      <div className="text-muted small mt-1">
        Enter để gửi · Shift + Enter để xuống dòng
      </div>
    </form>
  );
};

export default ChatMessageInput;