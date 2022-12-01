import React from "react";
import { Accordion } from "react-bootstrap";
import moment from "moment";
import { useUserContext } from "../context/UserContext";

export const Message = ({ message, index }) => {
  const { user } = useUserContext();
  return (
    <Accordion.Item className="message" eventKey={index}>
      <Accordion.Header className="accordionHeader">
        <div className="info">
          <span>
            From:{" "}
            <strong>
              {message.senderName === user?.name ? "You" : message.senderName}
            </strong>
          </span>
          <span>
            Subject : <u>{message.title}</u>
          </span>
        </div>
        <span>{moment(message.createdAt).format("llll")}</span>
      </Accordion.Header>
      <Accordion.Body>{message.content}</Accordion.Body>
    </Accordion.Item>
  );
};
