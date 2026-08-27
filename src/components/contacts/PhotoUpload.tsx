"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";

interface PhotoUploadProps {
  currentPhoto?: string | null;
  name: string;
}

export default function PhotoUpload({ currentPhoto, name }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentPhoto ?? null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setError("Photo must be under 2MB");
      return;
    }

    // Read and convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPreview(null);
    setError(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="h-20 w-20 rounded-full object-cover aspect-square border-2 border-hairline"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-hairline">
            <Camera className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
          </div>
        )}
        <div className="flex-1 space-y-2">
          <label className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-md cursor-pointer transition-colors">
            <Camera className="h-4 w-4" strokeWidth={2} />
            {preview ? "Change photo" : "Upload photo"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
          {preview && (
            <button
              type="button"
              onClick={clearPhoto}
              className="flex items-center gap-1.5 text-sm text-destructive hover:underline"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
              Remove photo
            </button>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <input type="hidden" name={name} value={preview ?? ""} />
    </div>
  );
}
