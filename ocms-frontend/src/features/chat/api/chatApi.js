import apiClient from "../../../services/apiClient";

export const chatApi = {

  createChatRoom: async (data) => {

    const response =await apiClient.post( "/chat/rooms", data);
    return response.data;
  },

  getMyChatRooms: async () => {

    const response =await apiClient.get("/chat/rooms/my" );
    return response.data;
  },

  getChatRoomDetail: async (roomId) => {

    const response =await apiClient.get(`/chat/rooms/${roomId}`);
    return response.data;
  },

  getMessagesByRoomId: async (roomId) => {
    const response = await apiClient.get(`/chat/messages/room/${roomId}`);
    return response.data;
  },

  closeChatRoom: async (roomId) => {
    const response =await apiClient.patch(`/chat/rooms/${roomId}/close`);
    return response.data;
  },

  openChatRoom: async (roomId) => {

    const response =await apiClient.patch(`/api/chat/rooms/${roomId}/open`);
    return response.data;
  },
};