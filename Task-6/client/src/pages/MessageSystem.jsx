import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FormComponent } from "../components/Form";
import { Messages } from "../components/Messages";
import { useUserContext } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { io } from "socket.io-client";

export const MessageSystem = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const { user, selection } = useUserContext();

  useEffect(() => {
    socket.current = io("https://emailappsystem.herokuapp.com/");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.name);
  }, [user?.name]);

  const { isLoading, data, refetch } = useQuery(
    ["messages"],
    async () => {
      const res = await axios.get(
        `https://emailappsystem.herokuapp.com/api/messages/${user?.name}/${selection[0]}${
          user?.name === selection[0] ? `?toMe=true` : ""
        }`
      );

      return res.data;
    },
    { enabled: false }
  );

  useEffect(() => {
    socket.current.on("getMessage", ({ senderName }) => {
      if (JSON.parse(localStorage.getItem("recipient"))[0] === senderName) {
        refetch();
      }
    });
  }, [socket.selection, refetch]);

  useEffect(() => {
    if (!user) {
      navigate("/setName");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selection.length) {
      refetch();
    }
  }, [selection, refetch]);

  return (
    <div className="messageSystem">
      <div className="wrapper">
        <FormComponent socket={socket} refetch={refetch} />
        <hr />
        <Messages socket={socket} messages={data} isLoading={isLoading} />
      </div>
    </div>
  );
};
