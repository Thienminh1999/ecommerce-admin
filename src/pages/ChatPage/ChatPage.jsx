import React from "react";
import styles from "./ChatPage.module.css";
import ListRoomChat from "../../components/ChatPage/ListRoomChat/ListRoomChat";
import RoomChat from "../../components/ChatPage/RoomChat/RoomChat";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { socket } from "../../socket";
import openSocket from "socket.io-client";
import { BASE_URL } from "../../stores/variables";

function ChatPage(props) {
  const [roomChats, setRoomChats] = useState([]);
  const [roomSelected, setRoomSelected] = useState();

  const listRoomChat = useMemo(
    () => roomChats.map((item) => item.roomId),
    [roomChats]
  );
  const selectedRoomChatText = roomChats.find(
    (item) => item.roomId === roomSelected
  );

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeRoomChat = (roomId) => {
    const newList = roomChats.filter((room) => room.roomId !== roomId);
    setRoomChats(newList);
  };

  useEffect(() => {
    let flag = false;
    function getMessageFromServer(value) {
      flag = true;
      if (value.type === "update") {
        setRoomChats((prev) => {
          const updatedList = [...prev];
          const updatedRoomIndex = updatedList.findIndex(
            (room) => room.roomId === value.roomId
          );
          if (updatedRoomIndex > -1) {
            if (flag) {
              updatedList[updatedRoomIndex].chatsText.push(value.message);
              flag = false;
            }
          }
          return updatedList;
        });
      } else if (value.type === "new") {
        const newRoomChat = {
          roomId: value.roomId,
          chatsText: [value.message],
        };
        setRoomChats((prev) => {
          const updatedList = [...prev];
          updatedList.unshift(newRoomChat);
          return updatedList;
        });
      } else if (value.type === "end") {
        setRoomChats((prev) => {
          const updatedList = [...prev];
          const updatedRoomIndex = updatedList.findIndex(
            (room) => room.roomId === value.roomId
          );
          if (updatedRoomIndex > -1) {
            if (flag) {
              updatedList[updatedRoomIndex].chatsText.push({ from: "end" });
              flag = false;
            }
          }
          return updatedList;
        });
        setTimeout(removeRoomChat, 5000);
      }
    }
    socket.on("chat", getMessageFromServer);

    return () => {
      socket.off("chat", getMessageFromServer);
    };
  }, []);

  const handleSelectRoomChat = (roomId) => {
    setRoomSelected(roomId);
  };

  const handleSubmitChat = (message) => {
    const socket = openSocket(BASE_URL);
    let objMess;

    objMess = {
      type: "update",
      roomId: roomSelected,
      message: { from: "staff", text: message },
    };

    socket.emit("chat", objMess);
  };

  return (
    <div className={styles.container}>
      <h3>Chat</h3>
      <div className={styles.chat_panel}>
        <ListRoomChat
          onSelectRoom={handleSelectRoomChat}
          rooms={listRoomChat}
        />
        <RoomChat
          onSubmitChat={handleSubmitChat}
          chatsText={selectedRoomChatText?.chatsText || []}
        />
      </div>
    </div>
  );
}

export default ChatPage;
