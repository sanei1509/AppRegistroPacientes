import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
};

export const InputField = ({ name, label, defaultValue }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div style={{ marginBottom: "1rem", width: "90%" }}>
      <label
        htmlFor={name}
        style={{
          display: "block",
          marginBottom: "0.2rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        defaultValue={defaultValue}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          backgroundColor: "#f9f9f9",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#17cfc4")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
      />
      {errorMessage && (
        <p
          style={{
            color: "red",
            marginTop: "0.3rem",
            fontSize: "0.7rem",
            transition: "opacity 0.3s",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
