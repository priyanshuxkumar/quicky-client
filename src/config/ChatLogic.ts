export const getOtherUserInfoOnChat = (loggedUser:any, users:any) => {
    if (!loggedUser || !Array.isArray(users) || users.length !== 2) {
        return null;
    }
    const otherUserInfo = users.find(chatUser => chatUser.user.id !== loggedUser);

    return otherUserInfo ? otherUserInfo.user : null;
};
