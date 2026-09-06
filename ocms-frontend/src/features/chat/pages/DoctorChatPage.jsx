import { useEffect, useRef } from "react";
import ChatRoomList from "../components/ChatRoomList";
import ChatWindow from "../components/ChatWindow";
import useChatRoom from "../hooks/useChatRoom";
import useChatWebSocket from "../hooks/useChatWebSocket";
import { authStorage } from "../../auth/utils/AuthStorage";

const DoctorChatPage = () => {

  const { rooms,selectedRoom,messages,loadingRooms,loadingMessages,error, selectRoom,addMessage} = useChatRoom();
  const { connected,connect,subscribe,unsubscribe, sendMessage} = useChatWebSocket();
  const subscriptionRef = useRef(null);
  const currentUser = authStorage.getUser();
  const currentUserId = currentUser?.userId;

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!connected || !selectedRoom) {
      return;
    }

    if (subscriptionRef.current) {
      unsubscribe(subscriptionRef.current);
      subscriptionRef.current = null;
    }

    const subscription = subscribe(
      selectedRoom.id,
      addMessage
    );

    if (subscription) {
      subscriptionRef.current = subscription;
    }

    return () => {
      if (subscription) {
        unsubscribe(subscription);
      }

      if (subscriptionRef.current === subscription) {
        subscriptionRef.current = null;
      }
    };
  }, [ connected,selectedRoom,subscribe,unsubscribe,addMessage]);

  const handleSelectRoom = async (room) => {
    await selectRoom(room);
  };

  const handleSendMessage = (messageContent) => {
    if (!selectedRoom) {
      return;
    }

    if (selectedRoom.status !== "OPEN") {
      return;
    }

    sendMessage(selectedRoom.id, messageContent);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-3">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card h-100">
            <div className="card-header bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Tin nhắn
                </h5>

                <span
                  className={`badge ${
                    connected
                      ? "text-bg-success"
                      : "text-bg-secondary"
                  }`}
                >
                  {connected ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            <ChatRoomList
              rooms={rooms}
              selectedRoom={selectedRoom}
              isDoctor={true}
              onSelectRoom={handleSelectRoom}
              loading={loadingRooms}
            />
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9">
          <ChatWindow
            room={selectedRoom}
            messages={messages}
            currentUserId={currentUserId}
            connected={connected}
            loadingMessages={loadingMessages}
            isDoctor={true}
            onSend={handleSendMessage}
          />
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger mt-3"
          role="alert"
        >
          Không thể tải dữ liệu trò chuyện.
        </div>
      )}
    </div>
  );
};

export default DoctorChatPage;