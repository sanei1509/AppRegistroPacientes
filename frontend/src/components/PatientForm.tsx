import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "../schemas/patientSchema.";
import { z } from "zod";
import { InputField } from "./form/InputField";
import { useState } from "react";
import { Loader } from "./Loader";
import "./PatientForm.css";

type PatientFormData = z.infer<typeof patientSchema>;

type PatientFormProps = {
  onSuccess: () => void;
  onError: (message: string) => void;
};

export const PatientForm = ({ onSuccess, onError }: PatientFormProps) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: PatientFormData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", `${data.countryCode}${data.phone}`);
    formData.append("photoUrl", data.photo);

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        onError(errorData.error || "Error registering patient.");
        return;
      }

      const result = await response.json();
      console.log("Paciente registrado con éxito:", result);
      onSuccess();
    } catch (error) {
      console.error("Error sending data:", error);
      onError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
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

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
        <InputField name="fullName" label="Full Name" />
        <InputField name="email" label="Email" />
        <InputField name="countryCode" label="Country Code" defaultValue="+598" />
        <InputField name="phone" label="Phone" />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`patient-form__dropzone 
            ${dragActive ? "patient-form__dropzone--drag-active" : ""}
            ${previewUrl ? "patient-form__dropzone--preview" : ""}
          `}
        >
          <label htmlFor="file" className="patient-form__file-label">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="patient-form__preview-img" />
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

        {errors.photo && <p className="patient-form__error">{errors.photo.message as string}</p>}

        <button type="submit" className="patient-form__submit">
          Register
        </button>
      </form>
    </FormProvider>
  );
};