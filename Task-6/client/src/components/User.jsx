import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const User = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const logoutHandler = () => {
    logout();
    navigate("/setName");
  };
  return (
    <Dropdown className="user">
      <Dropdown.Toggle>
        <p>{user?.name}</p>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={logoutHandler}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
