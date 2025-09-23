'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Progress,
} from '@nextui-org/react';
import { CloudUpload, Delete, Description, CheckCircle } from '@mui/icons-material';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  { value: 'legal', label: 'Legal Document' },
  { value: 'financial', label: 'Financial Report' },
  { value: 'technical', label: 'Technical Documentation' },
  { value: 'marketing', label: 'Marketing Material' },
  { value: 'other', label: 'Other' },
];

export default function FormUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      toast.success(`${droppedFiles.length} file(s) added`);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      toast.success(`${selectedFiles.length} file(s) added`);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast.success('File removed');
  };

  const onSubmit = async (data: FormData) => {
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      toast.success('Form and files uploaded successfully!');
      reset();
      setFiles([]);
      setUploadProgress(0);
    }, 2500);

    console.log('Form data:', data);
    console.log('Files:', files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col gap-2 p-6">
        <h2 className="text-2xl font-bold text-primary-default">Upload Form</h2>
        <p className="text-gray-600">Fill in the details and upload your files</p>
      </CardHeader>
      <CardBody className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register('title')}
            label="Title"
            placeholder="Enter form title"
            variant="bordered"
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
            className="w-full"
          />

          <Textarea
            {...register('description')}
            label="Description"
            placeholder="Enter a detailed description"
            variant="bordered"
            minRows={3}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
            className="w-full"
          />

          <Select
            {...register('category')}
            label="Category"
            placeholder="Select a category"
            variant="bordered"
            isInvalid={!!errors.category}
            errorMessage={errors.category?.message}
            className="w-full"
          >
            {categories.map((category) => (
              <SelectItem key={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            {...register('tags')}
            label="Tags"
            placeholder="Enter tags separated by commas"
            variant="bordered"
            className="w-full"
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Files</label>

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary-default bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />

              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop files here, or click to select files
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {files.length} file(s) selected
                </p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Description className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => removeFile(index)}
                    >
                      <Delete className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {uploading && (
            <Progress
              value={uploadProgress}
              className="w-full"
              color="primary"
              showValueLabel={true}
            />
          )}

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="flat"
              onPress={() => {
                reset();
                setFiles([]);
              }}
              isDisabled={uploading}
            >
              Clear
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={uploading}
              startContent={!uploading && <CheckCircle />}
            >
              {uploading ? 'Uploading...' : 'Submit Form'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}