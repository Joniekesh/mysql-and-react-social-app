let onlineUsers = [];

const addUser = (socketId, fullname) => {
	!onlineUsers.some((user) => user.fullname === fullname) &&
		onlineUsers.push({ socketId, fullname });
};

const getUser = (fullname) => {
	return onlineUsers.find((user) => user.fullname === fullname);
};

const removeUser = (socketId) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getOnlineUsers = () => {
	return onlineUsers;
};

export { addUser, getUser, removeUser, getOnlineUsers };
