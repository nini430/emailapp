import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "./User";
import { useUserContext } from "../context/UserContext";

export const FormComponent = ({ refetch, socket }) => {
  const { user, selection, setSelection } = useUserContext();
  const [inputs, setInputs] = useState({ title: "", content: "" });
  const sentData = {
    ...inputs,
    senderName: user?.name,
    recipientName: selection?.[0],
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { data } = useQuery(
    ["names"],
    async () => {
      const res = await axios.get("https://emailappsystem.herokuapp.com/api/users");
      return res.data;
    },
    { initialData: [] }
  );

  const [isTyping, setIsTyping] = useState(false);
  const [errors, setErrors] = useState({});

  const sendMutation = useMutation(
    (message) => {
      return axios.post("https://emailappsystem.herokuapp.com/api/messages", message);
    },
    {
      onSuccess: () => {
        socket.current.emit("sendMessage", {
          recipientName: selection?.[0],
          senderName: user?.name,
        });
        refetch();
        setInputs({ title: "", content: "" });
        setErrors({});
      },
      onError: (err) => {
        setErrors(err.response.data);
      },
    }
  );

  const handleSend = (e) => {
    e.preventDefault();
    sendMutation.mutate(sentData);
  };

  return (
    <div className="top">
      <User />
      <Form>
        <Form.Label>Send a Message</Form.Label>
        <hr />
        <Form.Group className="mb-2">
          <Form.Label>Recipient:</Form.Label>
          <Typeahead
            isInvalid={errors.recipientName}
            emptyLabel="No Users Found"
            id="basic-typeahead-single"
            onKeyDown={() => setIsTyping(true)}
            className={isTyping ? "display" : "typeahead"}
            onChange={setSelection}
            options={data.map((item) => item.name)}
            selected={selection}
          />
          {errors.recipientName && (
            <p className="error">{errors.recipientName}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            value={inputs.title}
            isInvalid={errors.title}
            name="title"
            type="text"
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Message</Form.Label>
          <Form.Control
            value={inputs.content}
            isInvalid={errors.content}
            name="content"
            placeholder="Type a message..."
            as="textarea"
            rows={4}
            onChange={handleChange}
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </Form.Group>
        <Button type="submit" onClick={handleSend}>
          Send
        </Button>
      </Form>
    </div>
  );
};
