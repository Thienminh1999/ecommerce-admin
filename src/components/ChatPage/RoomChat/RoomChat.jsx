import React from "react";
import styles from "./RoomChat.module.css";
import MessageItem from "../MessageItem/MessageItem";
import { Form } from "react-router-dom";

function RoomChat(props) {
  const { chatsText, onSubmitChat } = props;

  const handleSubmitMess = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    onSubmitChat(formProps.message);
    event.target.reset();
  };
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {chatsText.length > 0 && (
          <>
            {chatsText.map((item, index) => (
              <MessageItem data={item} key={index} />
            ))}
          </>
        )}
      </div>
      <Form onSubmit={handleSubmitMess} className={styles.prompt}>
        <input type="text" name="message" placeholder="Type and enter" />
        <button type="submit">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </Form>
    </div>
  );
}

export default RoomChat;
