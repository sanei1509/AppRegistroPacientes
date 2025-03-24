import "./Toast.css";

type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export const Toast = ({ message, type = "success" }: ToastProps) => {
  return (
    <div className={`toast toast--${type}`}>
      {message}
    </div>
  );
};