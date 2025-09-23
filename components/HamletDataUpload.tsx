'use client';

import { useState, useCallback } from 'react';
import { CloudUpload } from '@mui/icons-material';

interface FileUploadAreaProps {
  label: string;
  accept: string;
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  label,
  accept,
  onFileSelect,
  selectedFiles
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    onFileSelect(files);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onFileSelect(files);
  }, [onFileSelect]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          id={`file-input-${label.replace(/\s+/g, '-')}`}
          multiple
        />
        <label
          htmlFor={`file-input-${label.replace(/\s+/g, '-')}`}
          className="cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center mb-3">
              <CloudUpload className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Drop your files here or click to choose your files.
            </p>
          </div>
        </label>
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            {selectedFiles.map((file, index) => (
              <p key={index} className="text-sm text-gray-700">{file.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function HamletDataUpload() {
  const [formData, setFormData] = useState({
    cityCountyState: '',
    placeType: '',
    meetingDate: '',
    body: '',
    meetingType: '',
  });

  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [agendaFiles, setAgendaFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Audio Files:', audioFiles);
    console.log('Agenda Files:', agendaFiles);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-8">Hamlet Data Upload</h1>

      <form onSubmit={handleSubmit}>
        {/* City/County/State Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of the City/County/State to which the file corresponds to <span className="text-red-500">*</span>
          </label>
          <select
            name="cityCountyState"
            value={formData.cityCountyState}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value=""></option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="houston">Houston</option>
            <option value="phoenix">Phoenix</option>
          </select>
        </div>

        {/* Place Type Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Place type <span className="text-red-500">*</span>
          </label>
          <select
            name="placeType"
            value={formData.placeType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value=""></option>
            <option value="city">City</option>
            <option value="county">County</option>
            <option value="state">State</option>
            <option value="municipality">Municipality</option>
          </select>
        </div>

        {/* Meeting Date Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting date in ISO format (YYYY-MM-DD) <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Body Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body <span className="text-red-500">*</span>
          </label>
          <select
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value=""></option>
            <option value="city-council">City Council</option>
            <option value="board-supervisors">Board of Supervisors</option>
            <option value="planning-commission">Planning Commission</option>
            <option value="school-board">School Board</option>
            <option value="water-board">Water Board</option>
          </select>
        </div>

        {/* Meeting Type Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting type <span className="text-red-500">*</span>
          </label>
          <select
            name="meetingType"
            value={formData.meetingType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value=""></option>
            <option value="regular">Regular Meeting</option>
            <option value="special">Special Meeting</option>
            <option value="emergency">Emergency Meeting</option>
            <option value="workshop">Workshop</option>
            <option value="hearing">Public Hearing</option>
          </select>
        </div>

        {/* Audio File Upload */}
        <FileUploadArea
          label="Drop audio file for the meeting in mp3 or m4a format"
          accept=".mp3,.m4a"
          onFileSelect={setAudioFiles}
          selectedFiles={audioFiles}
        />

        {/* Agenda File Upload */}
        <FileUploadArea
          label="Drop agenda file in pdf or html format"
          accept=".pdf,.html"
          onFileSelect={setAgendaFiles}
          selectedFiles={agendaFiles}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
        >
          Upload Data
        </button>
      </form>
    </div>
  );
}