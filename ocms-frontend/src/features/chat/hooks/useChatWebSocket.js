import { useCallback,useEffect, useState,} from "react";
import webSocketClient from "../../../services/webSocketClient";
import { authStorage } from "../../auth/utils/AuthStorage";

const useChatWebSocket = () => {

  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(() => {

    const token = authStorage.getToken();

    if (!token) {
      return;
    }

    webSocketClient.connect({token,

      onConnected: () => {
        setConnected(true);
        setError(null);
      },

      onError: (webSocketError) => {

        console.error( "[Chat WebSocket]", webSocketError);
        setConnected(false);
        setError(webSocketError);
      },

      onDisconnected: () => {
        setConnected(false);
      },
    });
  }, []);

  const subscribe = useCallback(
    (roomId, onMessage) => {
      if (!connected) {
        console.error("[Chat WebSocket] Not connected");

        return null;
      }

      return webSocketClient.subscribe(roomId,onMessage);
    }, [connected]
  );

  const unsubscribe = useCallback(
    (subscription) => {
      webSocketClient.unsubscribe( subscription);
    },[]
  );

  const sendMessage = useCallback(
    (roomId, messageContent) => {
      return webSocketClient.sendMessage(roomId, messageContent);
    },[]
  );

  const disconnect = useCallback(() => {
    webSocketClient.disconnect();
    setConnected(false);
  }, []);

  useEffect(() => {
    return () => {
      webSocketClient.disconnect();
    };
  }, []);

  return {
    connected,error,connect,subscribe, unsubscribe, sendMessage, disconnect,
  };
};

export default useChatWebSocket;