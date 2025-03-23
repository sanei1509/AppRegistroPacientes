import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "../schemas/patientSchema.";
import { z } from "zod";
import { InputField } from "./form/InputField";
import { useState } from "react";

type PatientFormData = z.infer<typeof patientSchema>;

export const PatientForm = () => {
  const methods = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = (data: PatientFormData) => {
    const finalData = {
      ...data,
      phone: `${data.countryCode}${data.phone}`,
    };
    console.log("Submitted patient data:", finalData);
  };

  const handleFile = (file: File) => {
    if (file.type === "image/jpeg") {
      setValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          alignItems: "center",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <InputField name="fullName" label="Full Name" />
        <InputField name="email" label="Email" />
        <InputField name="countryCode" label="Country Code" defaultValue="+598" />
        <InputField name="phone" label="Phone" />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            width: "100%",
            height: previewUrl ? "160px" : "120px",
            border: `2px dashed ${
              dragActive ? "#4CAF50" : previewUrl ? "#8bc34a" : "#ccc"
            }`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
            backgroundColor: dragActive
              ? "#f0fff4"
              : previewUrl
              ? "#f6fff3"
              : "#f9f9f9",
            transition: "border-color 0.3s",
            position: "relative",
            padding: "0.5rem",
            overflow: "hidden",
          }}
        >
          <label htmlFor="file" style={{ cursor: "pointer", textAlign: "center" }}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "6px",
                  objectFit: "cover",
                }}
              />
            ) : (
              "Drag and drop .jpg image here or click to upload"
            )}
          </label>
          <input
            id="file"
            type="file"
            accept=".jpg"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />
        </div>

        {errors.photo && (
          <p style={{ color: "red", marginTop: "0.3rem", fontSize: "0.75rem" }}>
            {errors.photo.message as string}
          </p>
        )}

        <button
          type="submit"
          style={{
            marginTop: "1.5rem",
            padding: "0.6rem 1.5rem",
            backgroundColor: "#00879E",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Register
        </button>
      </form>
    </FormProvider>
  );
};
