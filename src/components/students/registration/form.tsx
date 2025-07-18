import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { useRegisterStudent } from "@/lib/api/students";
import { StudentFormData, studentSchema } from "@/lib/validations/student";

interface StudentRegistrationFormProps {
  schoolName?: string;
  initialData?: (Partial<StudentFormData> & { image_url?: string; imageUrl?: string });
  onSubmit?: (data: Partial<StudentFormData> & { image?: File | null }) => void;
  submitLabel?: string;
}

import React, { useState } from "react";

export function StudentRegistrationForm({
  schoolName,
  initialData,
  onSubmit,
  submitLabel,
}: StudentRegistrationFormProps) {
  const router = useRouter();
  const { mutate: registerStudent, isPending: isRegistering } =
    useRegisterStudent();

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Determine the image URL to preview: file > initialData.image_url > initialData.imageUrl
  const imageUrl =
    previewUrl ||
    initialData?.image_url ||
    initialData?.imageUrl ||
    null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    // Optional: validate file type/size here
    setFile(selectedFile);
    setFileError(null);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFormSubmit = (data: StudentFormData) => {
    if (onSubmit) {
      // Only include changed fields for update
      const changedFields: Record<string, any> = {};
      if (initialData) {
        Object.entries(data).forEach(([key, value]) => {
          // Compare with initialData, handle undefined/null
          if (value !== (initialData as any)[key]) {
            changedFields[key] = value;
          }
        });
      } else {
        Object.assign(changedFields, data);
      }
      // Only include image if a new file is selected
      if (file) {
        changedFields.image = file;
      }
      onSubmit(changedFields);
      return;
    }
    // For add, send as FormData if file is present
    if (file) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("image", file);
      registerStudent(formData as any, {
        onSuccess: () => {
          router.push("/students");
        },
        onError: (error: any) => {
          console.error("[Debug] Registration failed:", error);
        },
      });
    } else {
      registerStudent(data, {
        onSuccess: () => {
          router.push("/students");
        },
        onError: (error: any) => {
          console.error("[Debug] Registration failed:", error);
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 max-w-xl mx-auto"
      encType="multipart/form-data"
    >
      {schoolName && (
        <div className="mb-6">
          <h2 className="text-sm text-muted-foreground">
            Registering student for:{" "}
            <span className="font-medium text-foreground">{schoolName}</span>
          </h2>
        </div>
      )}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Student Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter student name"
          />
          {errors.name && (
            <Alert variant="destructive">{errors.name.message}</Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Input id="class" {...register("class")} placeholder="Enter class" />
          {errors.class && (
            <Alert variant="destructive">{errors.class.message}</Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Input
            id="section"
            {...register("section")}
            placeholder="Enter section"
          />
          {errors.section && (
            <Alert variant="destructive">{errors.section.message}</Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="roll_number">Roll Number</Label>
          <Input
            id="roll_number"
            {...register("roll_number")}
            placeholder="Enter roll number"
          />
          {errors.roll_number && (
            <Alert variant="destructive">{errors.roll_number.message}</Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image</Label>
          <Input
            id="image"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <p className="text-sm text-muted-foreground">
            Accepted formats: JPG, JPEG, PNG.
          </p>
          {fileError && (
            <Alert variant="destructive">{fileError}</Alert>
          )}
        </div>
        {imageUrl && (
          <div className="mt-2 flex items-center">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-24 w-24 object-cover rounded border shadow"
              style={{ background: "#f3f4f6" }}
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isRegistering} className="w-full">
        {isRegistering
          ? (submitLabel ? submitLabel.replace(/e$/, "ing...") : "Registering...")
          : (submitLabel || "Register Student")}
      </Button>
    </form>
  );
}
