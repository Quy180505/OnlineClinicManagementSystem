import { useCallback, useEffect, useState } from "react";
import { chatApi } from "../api/chatApi";

const useChatRoom = () => {

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadRooms = async () => {
      try {
        const response = await chatApi.getMyChatRooms();

        if (!cancelled) {
          setRooms(response.data ?? []);
          setError(null);
          setLoadingRooms(false);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error);
          setLoadingRooms(false);
        }
      }
    };

    loadRooms();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectRoom = useCallback(async (room) => {
    try {
      setSelectedRoom(room);
      setLoadingMessages(true);
      setError(null);

      const response = await chatApi.getMessagesByRoomId(room.id);

      setMessages(response.data ?? []);
    } catch (error) {
      setError(error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const addMessage = useCallback((message) => {

    setMessages((previousMessages) => {

      const exists = previousMessages.some((item) => item.id === message.id);

      if (exists) {
        return previousMessages;
      }

      return [...previousMessages, message];
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    rooms,selectedRoom, messages,loadingRooms,
    loadingMessages, error,selectRoom,addMessage, clearMessages
  };
};

export default useChatRoom;