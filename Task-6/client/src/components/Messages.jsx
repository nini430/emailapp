import React, { useEffect } from "react";
import { Message } from "./Message";
import { Accordion } from "react-bootstrap";
import LoadingGif from "../assets/Loading.gif";
import EmptyMessages from "../assets/empty.webp";

export const Messages = ({ messages, isLoading }) => {
  return (
    <div className="messages">
      <h1>Messages</h1>
      {isLoading ? (
        <div className="loading">
          <p>Select a Recipient</p>
          <img src={LoadingGif} alt="" />
        </div>
      ) : messages.length > 0 ? (
        <Accordion className="msgWrapper">
          {messages.map((message, index) => (
            <Message key={message.id} message={message} index={index} />
          ))}
        </Accordion>
      ) : (
        <div className="empty">
          <h1>Messages Are Empty</h1>
          <img src={EmptyMessages} alt="" />
        </div>
      )}
    </div>
  );
};
