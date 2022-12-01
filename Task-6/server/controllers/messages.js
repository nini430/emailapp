import moment from "moment";

import { db } from "../connect.js";
import { messageValidator } from "../utils/validators.js";

export const getMessages = (req, res) => {
  const { firstName, secondName } = req.params;

  const { toMe } = req.query;
  let q = "";
  let values = [];
  if (toMe) {
    q =
      "SELECT * FROM messages WHERE `senderName`=? AND `recipientName`=? ORDER BY createdAt DESC";

    values = [firstName, secondName];
  } else {
    q =
      "SELECT * FROM messages WHERE `senderName` IN(?) AND `recipientName` IN(?) AND `recipientName`!=`senderName` ORDER BY createdAt DESC";
    values = [
      [firstName, secondName],
      [firstName, secondName],
    ];
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data) return res.status(200).json(data);
  });
};

export const sendMessage = (req, res) => {
  const { content, senderName, recipientName, title } = req.body;

  const { isInvalid, errors } = messageValidator(recipientName, title, content);
  if (isInvalid) {
    return res.status(400).json(errors);
  }

  const q =
    "INSERT INTO messages (`content`,`senderName`,`recipientName`,`title`,`createdAt`) VALUES(?)";
  db.query(
    q,
    [
      [
        content,
        senderName,
        recipientName,
        title,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ],
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data) return res.status(200).json("Message has been created");
    }
  );
};
