export const messageValidator = (recipientName, title, content) => {
  const errors = {};
  if (!recipientName || recipientName.trim() === "") {
    errors.recipientName = "Recipient Must be selected";
  }

  if (title.trim() === "") {
    errors.title = "Title should be specified";
  }

  if (content.trim() === "") {
    errors.content = "Message body is Empty";
  }

  return { isInvalid: Object.keys(errors).length > 0, errors };
};
