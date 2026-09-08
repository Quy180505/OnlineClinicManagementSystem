import { useEffect, useRef } from "react";
import ChatMessageItem from "./ChatMessageItem";

const ChatMessageList = ({messages,currentUserId,loading,}) => {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth",});
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
        Đang tải tin nhắn...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
        Chưa có tin nhắn.
      </div>
    );
  }

  return (
    <div
      className="flex-grow-1 p-3 overflow-auto"
      style={{
        minHeight: 0,
      }}
    >
      {messages.map((message) => (
        <ChatMessageItem
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;