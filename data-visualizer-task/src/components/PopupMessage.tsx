interface PopupMessageProps {
  message: string;
  type?: "success" | "error";
}

const PopupMessage = ({ message, type = "success" }: PopupMessageProps) => {
  if (!message) return null;

  let className = "popup-message";
  if (type) className += ` ${type}`;

  return <div className={className}>{message}</div>;
};

export default PopupMessage;