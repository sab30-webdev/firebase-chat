import React, { useEffect, useState } from "react";
import { database } from "../../../misc/firebase";
import { useParams } from "react-router";
import { transformToArrWithId } from "../../../misc/helpers";
import MessageItem from "./MessageItem";

const Messages = () => {
  const [messages, setMessages] = useState();
  const { chatId } = useParams();

  const isMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref("/messages");

    messagesRef
      .orderByChild("roomId")
      .equalTo(chatId)
      .on("value", (snap) => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off();
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {!isMessages && <li>No messages yet..</li>}
      {isMessages &&
        messages.map((msg) => <MessageItem key={msg.id} message={msg} />)}
    </ul>
  );
};

export default Messages;
