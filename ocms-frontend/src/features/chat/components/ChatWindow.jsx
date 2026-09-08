import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";

const ChatWindow = ({room,messages, currentUserId, connected,loadingMessages,isDoctor, onSend,}) => {

  if (!room) {
    return (
      <div className="card h-100">
        <div className="card-body d-flex align-items-center justify-content-center text-muted">
          <div className="text-center">
            <i className="bi bi-chat-text fs-1" />

            <div className="mt-2">
              Chọn một cuộc trò chuyện
              để bắt đầu.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const participant = isDoctor ? room.patient: room.doctor;

  const roomClosed = room.status !== "OPEN";

  return (
    <div
      className="card h-100"
      style={{
        minHeight: "600px",
      }}
    >
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-semibold">
              {participant?.fullName ??
                "Không xác định"}
            </div>

            <small className="text-muted">
              {isDoctor ? "Bệnh nhân": "Bác sĩ"}
            </small>
          </div>

          <div>
            {connected ? (
              <span className="badge text-bg-success">
                Đang kết nối
              </span>
            ) : (
              <span className="badge text-bg-secondary">
                Mất kết nối
              </span>
            )}
          </div>
        </div>
      </div>

      <ChatMessageList
        messages={messages}
        currentUserId={currentUserId}
        loading={loadingMessages}
      />

      {roomClosed ? (
        <div className="border-top p-3 text-center text-muted">
          Cuộc trò chuyện đã đóng.
        </div>
      ) : (
        <ChatMessageInput
          disabled={!connected}
          onSend={onSend}
        />
      )}
    </div>
  );
};

export default ChatWindow;