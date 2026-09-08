import {formatDateTime} from "../../../utils/dateUtils";
const ChatMessageItem = ({message, currentUserId}) => {

  const isMine =message.sender?.userId === currentUserId;

  return (
    <div
      className={`d-flex mb-3 ${
        isMine
          ? "justify-content-end"
          : "justify-content-start"
      }`}
    >
      <div
        className={`rounded-3 px-3 py-2 ${
          isMine
            ? "bg-primary text-white"
            : "bg-light"
        }`}
        style={{
          maxWidth: "75%",
        }}
      >
        {!isMine && (
          <div className="fw-semibold small mb-1">
            {message.sender?.fullName ??
              "Người dùng"}
          </div>
        )}

        <div
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message.messageContent}
        </div>

        <div
          className={`small mt-1 ${
            isMine
              ? "text-white-50"
              : "text-muted"
          }`}
        >
          {formatDateTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;