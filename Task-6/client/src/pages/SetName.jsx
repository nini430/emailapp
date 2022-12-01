import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SetName = () => {
  const navigate = useNavigate();
  const { setName: setNameContext, user } = useUserContext();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://emailappsystem.herokuapp.com/api/users", { name });
      setNameContext(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.name);
    }
  };
  return (
    <div className="name">
      <Form>
        <InputGroup className="mb-1">
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            size="lg"
            type="text"
            placeholder="Enter Your Name"
          />

          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </InputGroup>
        {error && <p className="error">{error}</p>}
      </Form>
    </div>
  );
};
