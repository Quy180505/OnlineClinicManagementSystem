import ChatRoomItem from "./ChatRoomItem";

const ChatRoomList = ({rooms,selectedRoom,isDoctor, onSelectRoom, loading,}) => {
  return (
    <div className="list-group list-group-flush">
      {loading && (
        <div className="p-3 text-center text-muted">
          Đang tải cuộc trò chuyện...
        </div>
      )}

      {!loading && rooms.length === 0 && (
        <div className="p-4 text-center text-muted">
          <div className="mb-2">
            <i className="bi bi-chat-dots fs-3" />
          </div>

          Chưa có cuộc trò chuyện.
        </div>
      )}

      {!loading &&
        rooms.map((room) => (
          <ChatRoomItem
            key={room.id}
            room={room}
            selected={ selectedRoom?.id === room.id}
            isDoctor={isDoctor}
            onClick={() => onSelectRoom(room)}
          />
        ))}
    </div>
  );
};

export default ChatRoomList;