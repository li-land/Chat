class SocketService {
  getUsersSocketIdArray(user1_id, user2_id) {
    const filteredUserId_socketId = userId_socketId.filter(
      (item) => item.userId == user1_id || item.userId == user2_id
    );
    const usersSocketIdArray = filteredUserId_socketId.map((item) => {
      return item.socketId;
    });
    return usersSocketIdArray;
  }
}

module.exports = new SocketService();
