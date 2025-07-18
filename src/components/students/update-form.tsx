'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UpdateFormProps {
  studentId: string;
  initialData: {
    class: string;
    section: string;
  };
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export function UpdateForm({ studentId, initialData }: UpdateFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Invalid file type. Only JPG, JPEG, or PNG files are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5MB limit.';
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const fileError = validateFile(selectedFile);
    if (fileError) {
      setError(fileError);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('class', formData.class);
      formDataToSend.append('section', formData.section);
      if (file) {
        formDataToSend.append('image', file);
      }

      const response = await fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      router.push('/students');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Student Information</CardTitle>
        <CardDescription>
          Make changes to the student&apos;s class information and profile image.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="class">Class</Label>
            <Input
              type="text"
              id="class"
              placeholder="Enter class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="section">Section</Label>
            <Input
              type="text"
              id="section"
              placeholder="Enter section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="image">Profile Image</Label>
            <Input
              type="file"
              id="image"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              Accepted formats: JPG, JPEG, PNG. Maximum size: 5MB
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/students')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Student'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}