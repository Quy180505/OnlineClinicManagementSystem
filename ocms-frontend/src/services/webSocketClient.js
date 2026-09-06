import { Client } from "@stomp/stompjs";
import { authStorage } from "../features/auth/utils/AuthStorage";

const WS_URL = import.meta.env.VITE_WS_URL;

let stompClient = null;

const webSocketClient = {
  connect: ({ token, onConnected, onError, onDisconnected,}) => {
    if (stompClient?.active) {
      return;
    }

    stompClient = new Client({
      brokerURL: WS_URL,

      connectHeaders: { Authorization: `Bearer ${token}`},

      reconnectDelay: 5000,

      onConnect: (frame) => {
        console.log( "[WebSocket] Connected:",frame);
        onConnected?.(frame);
      },

      onStompError: (frame) => {

        console.error( "[WebSocket] STOMP error:",frame );
        onError?.(frame);
      },

      onWebSocketError: (error) => {

        console.error( "[WebSocket] WebSocket error:", error);
        onError?.(error);
      },

      onWebSocketClose: () => {

        console.log("[WebSocket] Connection closed");
        onDisconnected?.();
      },
    });

    stompClient.activate();
  },

  subscribe: (roomId, onMessage) => {

    if (!stompClient?.connected) {
      console.error("[WebSocket] Client is not connected");
      return null;
    }

    const token = authStorage.getToken();

    if (!token) {
      console.error("[WebSocket] Access token is missing");

      return null;
    }

    return stompClient.subscribe(`/topic/chat/room/${roomId}`,
      (message) => {
        try {
          const response = JSON.parse(message.body);
          onMessage?.(response);
        } catch (error) {
          console.error( "[WebSocket] Failed to parse message:", error);
        }
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  },

  unsubscribe: (subscription) => {
  if (!subscription) {
    return;
  }

  subscription.unsubscribe();
},

  sendMessage: (roomId,messageContent) => {
    if (!stompClient?.connected) {
      console.error("[WebSocket] Client is not connected" );

      return false;
    }

    const token = authStorage.getToken();

    if (!token) {
      console.error(
        "[WebSocket] Access token is missing"
      );

      return false;
    }

    console.log("[WebSocket] Sending message:",{ roomId,messageContent});

    stompClient.publish({
      destination: "/app/chat.send",
      headers: { Authorization: `Bearer ${token}`},
      body: JSON.stringify({ roomId, messageContent, }),
    });

    return true;
  },

  

  disconnect: () => {
    if (!stompClient) {
      return;
    }

    stompClient.deactivate();
    stompClient = null;
  },

  isConnected: () => {
    return stompClient?.connected ?? false;
  },
};

export default webSocketClient;