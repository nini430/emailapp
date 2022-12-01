import { db } from "../connect.js";

export const startChat = (req, res) => {
  if (req.body.name.trim() === "") {
    return res.status(400).json({ name: "Name should not be empty!" });
  }

  const q = "SELECT * FROM users WHERE name=?";
  db.query(q, [req.body.name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      const q = "INSERT INTO users (`name`) VALUES(?)";
      db.query(q, [req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) {
          const q = "SELECT * FROM users WHERE id=last_insert_id()";
          db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data) return res.status(200).json(data[0]);
          });
        }
      });
    } else {
      return res.status(200).json(data[0]);
    }
  });
};

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data) {
      return res.status(200).json(data);
    }
  });
};
