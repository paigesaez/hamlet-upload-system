'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Card, CardBody, Divider, DatePicker, Chip, Spinner } from '@nextui-org/react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

// Dynamic import to avoid SSR hydration issues with react-select
const SearchableDropdown = dynamic(() => import('./SearchableDropdown'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-14 bg-gray-50 rounded-lg animate-pulse" />
  )
});

interface FileWithProgress {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

// Icon components using SVG
const CloudUploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Meeting bodies available for different place types
const MEETING_BODIES = {
  city: ['City Council', 'Planning Commission', 'Zoning Board', 'Parks & Recreation', 'Police Commission'],
  county: ['County Board', 'County Commission', 'Planning Board', 'Sheriff Department'],
  state: ['State Legislature', 'State Senate', 'State Assembly', 'Environmental Board'],
  township: ['Township Board', 'Township Planning', 'Township Zoning'],
  village: ['Village Board', 'Village Council', 'Village Planning'],
  borough: ['Borough Council', 'Borough Planning', 'Borough Zoning']
};

export default function HamletBatchUpload() {
  const [audioFiles, setAudioFiles] = useState<FileWithProgress[]>([]);
  const [agendaFiles, setAgendaFiles] = useState<FileWithProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [metadata, setMetadata] = useState({
    cityCountyState: [] as string[],
    placeType: '',
    meetingDate: '',
    body: '',
    meetingType: '',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dateValue, setDateValue] = useState<any>(null);
  const [validationStatus, setValidationStatus] = useState({
    notionExists: null as boolean | null,
    filesUploaded: null as boolean | null,
    pipelineStatus: null as string | null,
    isValidating: false
  });
  const [availableBodies, setAvailableBodies] = useState<string[]>([]);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const agendaInputRef = useRef<HTMLInputElement>(null);

  const handleFileAdd = (newFiles: File[], type: 'audio' | 'agenda') => {
    const fileList = newFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: 'pending' as const
    }));

    if (type === 'audio') {
      setAudioFiles(prev => [...prev, ...fileList]);
    } else {
      setAgendaFiles(prev => [...prev, ...fileList]);
    }
  };

  const removeFile = (id: string, type: 'audio' | 'agenda') => {
    if (type === 'audio') {
      setAudioFiles(prev => prev.filter(f => f.id !== id));
    } else {
      setAgendaFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Update available bodies when place type changes
  useEffect(() => {
    if (metadata.placeType) {
      setAvailableBodies(MEETING_BODIES[metadata.placeType as keyof typeof MEETING_BODIES] || []);
      // Reset body selection when place type changes
      setMetadata(prev => ({ ...prev, body: '' }));
    } else {
      setAvailableBodies([]);
    }
  }, [metadata.placeType]);

  // Validate when location is selected
  useEffect(() => {
    const validateLocation = async () => {
      if (metadata.cityCountyState && metadata.cityCountyState.length > 0) {
        setValidationStatus(prev => ({ ...prev, isValidating: true }));

        // Simulate API validation for Notion entry
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate validation results
        const notionExists = Math.random() > 0.3;
        const filesUploaded = metadata.meetingDate ? Math.random() > 0.7 : false;
        const pipelineStatus = filesUploaded ? 'completed' : notionExists ? 'pending' : null;

        setValidationStatus({
          notionExists,
          filesUploaded,
          pipelineStatus,
          isValidating: false
        });
      } else {
        // Reset validation when location is cleared
        setValidationStatus({
          notionExists: null,
          filesUploaded: null,
          pipelineStatus: null,
          isValidating: false
        });
      }
    };

    validateLocation();
  }, [metadata.cityCountyState, metadata.meetingDate]);

  const uploadAndRunPipeline = async () => {
    setIsUploading(true);

    // Simulate uploading all files
    const allFiles = [...audioFiles, ...agendaFiles];

    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i];

      // Update status to uploading
      const isAudio = audioFiles.some(f => f.id === file.id);
      const setter = isAudio ? setAudioFiles : setAgendaFiles;

      setter(prev => prev.map(f =>
        f.id === file.id ? { ...f, status: 'uploading' as const } : f
      ));

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setter(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress } : f
        ));
      }

      // Mark as completed
      setter(prev => prev.map(f =>
        f.id === file.id ? { ...f, status: 'completed' as const, progress: 100 } : f
      ));
    }

    // Simulate pipeline execution
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsUploading(false);

    // Update validation status to show pipeline completed
    setValidationStatus(prev => ({
      ...prev,
      filesUploaded: true,
      pipelineStatus: 'completed'
    }));
  };

  const isFormValid = metadata.cityCountyState.length > 0 && metadata.meetingDate &&
                      (audioFiles.length > 0 || agendaFiles.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="shadow-sm">
          <CardBody className="p-0">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">Hamlet Upload System</h1>
              <p className="mt-2 text-base text-gray-600">
                Upload meeting recordings and agendas for transcription and processing
              </p>
            </div>

            {/* Validation Status - Hidden for now */}
            {false && (validationStatus.isValidating || validationStatus.notionExists !== null) && (
              <div className="px-8 pt-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {validationStatus.isValidating && (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      <span className="text-base text-gray-600">Validating...</span>
                    </div>
                  )}
                  {!validationStatus.isValidating && validationStatus.notionExists !== null && (
                    <>
                      <Chip
                        color={validationStatus.notionExists ? "success" : "warning"}
                        size="sm"
                      >
                        {validationStatus.notionExists ? "✓ Notion entry exists" : "⚠ No Notion entry"}
                      </Chip>
                      {validationStatus.filesUploaded && (
                        <Chip color="warning" size="sm">
                          ⚠ Files already uploaded
                        </Chip>
                      )}
                      {validationStatus.pipelineStatus && (
                        <Chip
                          color={validationStatus.pipelineStatus === 'completed' ? "success" : "default"}
                          size="sm"
                        >
                          Pipeline: {validationStatus.pipelineStatus}
                        </Chip>
                      )}
                      {validationStatus.filesUploaded && (
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => {
                            // Handle overwrite
                            setValidationStatus(prev => ({ ...prev, filesUploaded: false }));
                          }}
                        >
                          Overwrite existing files
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="p-8 space-y-6">
              {/* Location and Meeting Date */}
              <div className="grid grid-cols-2 gap-6">
                <SearchableDropdown
                  value={metadata.cityCountyState}
                  onChange={(value) => setMetadata(prev => ({ ...prev, cityCountyState: value as string[] }))}
                  required
                  disabled={isUploading}
                  isMulti={true}
                />

                <DatePicker
                  label="Meeting Date"
                  variant="flat"
                  value={dateValue}
                  onChange={(value) => {
                    setDateValue(value);
                    if (value) {
                      const date = `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`;
                      setMetadata(prev => ({ ...prev, meetingDate: date }));
                    }
                  }}
                  isRequired
                  className="bg-white"
                />
              </div>

              {/* Place Type, Body, and Meeting Type */}
              <div className="grid grid-cols-3 gap-6">
                {/* Place Type */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Place type</label>
                  <CreatableSelect
                    instanceId="place-type-select"
                    value={metadata.placeType ? { value: metadata.placeType, label: metadata.placeType.charAt(0).toUpperCase() + metadata.placeType.slice(1) } : null}
                    onChange={(newValue) => {
                      setMetadata(prev => ({ ...prev, placeType: newValue ? newValue.value : '' }));
                    }}
                    options={[
                      { value: 'city', label: 'City' },
                      { value: 'county', label: 'County' },
                      { value: 'state', label: 'State' },
                      { value: 'township', label: 'Township' },
                      { value: 'village', label: 'Village' },
                      { value: 'borough', label: 'Borough' }
                    ]}
                    placeholder="Select place type"
                    isDisabled={isUploading}
                    isClearable
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: '42px',
                        borderRadius: '8px',
                        borderColor: state.isFocused ? '#006FEE' : '#d4d4d8',
                        borderWidth: '2px',
                        boxShadow: 'none',
                        backgroundColor: '#FFFFFF',
                        '&:hover': { borderColor: '#006FEE' }
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#006FEE' : state.isFocused ? '#e6f1ff' : '#FFFFFF',
                        color: state.isSelected ? '#FFFFFF' : '#11181C',
                        cursor: 'pointer'
                      })
                    }}
                  />
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Body type</label>
                  <CreatableSelect
                    instanceId="body-type-select"
                    value={metadata.body ? { value: metadata.body, label: metadata.body } : null}
                    onChange={(newValue) => {
                      setMetadata(prev => ({ ...prev, body: newValue ? newValue.label : '' }));
                    }}
                    options={availableBodies.map(body => ({
                      value: body.toLowerCase().replace(/\s+/g, '-'),
                      label: body
                    }))}
                    placeholder={metadata.placeType ? "Select body type" : "Select place type first"}
                    isDisabled={isUploading || !metadata.placeType}
                    isClearable
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: '42px',
                        borderRadius: '8px',
                        borderColor: state.isFocused ? '#006FEE' : '#d4d4d8',
                        borderWidth: '2px',
                        boxShadow: 'none',
                        backgroundColor: '#FFFFFF',
                        '&:hover': { borderColor: '#006FEE' }
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#006FEE' : state.isFocused ? '#e6f1ff' : '#FFFFFF',
                        color: state.isSelected ? '#FFFFFF' : '#11181C',
                        cursor: 'pointer'
                      })
                    }}
                  />
                </div>

                {/* Meeting Type */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Meeting type</label>
                  <Select
                    instanceId="meeting-type-select"
                    value={metadata.meetingType ? { value: metadata.meetingType, label: metadata.meetingType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') } : null}
                    onChange={(newValue) => {
                      setMetadata(prev => ({ ...prev, meetingType: newValue ? newValue.value : '' }));
                    }}
                    options={[
                      { value: 'regular', label: 'Regular Meeting' },
                      { value: 'special', label: 'Special Meeting' },
                      { value: 'emergency', label: 'Emergency Meeting' },
                      { value: 'workshop', label: 'Workshop' }
                    ]}
                    placeholder="Select meeting type"
                    isDisabled={isUploading}
                    isClearable
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: '42px',
                        borderRadius: '8px',
                        borderColor: state.isFocused ? '#006FEE' : '#d4d4d8',
                        borderWidth: '2px',
                        boxShadow: 'none',
                        backgroundColor: '#FFFFFF',
                        '&:hover': { borderColor: '#006FEE' }
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#006FEE' : state.isFocused ? '#e6f1ff' : '#FFFFFF',
                        color: state.isSelected ? '#FFFFFF' : '#11181C',
                        cursor: 'pointer'
                      })
                    }}
                  />
                </div>
              </div>

              <Divider className="my-6" />

              {/* Drop Zones Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Agenda PDF Drop Zone */}
                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-2">Agenda PDF *</h3>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
                    onClick={() => agendaInputRef.current?.click()}
                  >
                    <CloudUploadIcon />
                    <p className="mt-2 text-base text-gray-600">Drop PDF here or click to browse</p>
                    <p className="text-sm text-gray-500 mt-1">PDF files only</p>
                  </div>

                  <input
                    ref={agendaInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      handleFileAdd(files.slice(0, 1), 'agenda'); // Only take first file
                    }}
                  />

                  {agendaFiles.length > 0 && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      {agendaFiles[0] && (
                        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="text-gray-400">
                              <FileIcon />
                            </div>
                            <div>
                              <p className="text-base font-medium text-gray-900">{agendaFiles[0].file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(agendaFiles[0].file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {agendaFiles[0].status === 'completed' && <CheckCircleIcon />}
                            {agendaFiles[0].status === 'uploading' && (
                              <div className="w-20">
                                <div className="bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                                    style={{ width: `${agendaFiles[0].progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            <button
                              onClick={() => removeFile(agendaFiles[0].id, 'agenda')}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              disabled={isUploading}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Audio/Video Drop Zone */}
                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-2">Audio/Video File *</h3>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
                    onClick={() => audioInputRef.current?.click()}
                  >
                    <CloudUploadIcon />
                    <p className="mt-2 text-base text-gray-600">Drop audio/video here or click to browse</p>
                    <p className="text-sm text-gray-500 mt-1">MP4, M4A, MP3, MOV</p>
                  </div>

                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="video/*,audio/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      handleFileAdd(files.slice(0, 1), 'audio'); // Only take first file
                    }}
                  />

                  {audioFiles.length > 0 && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      {audioFiles[0] && (
                        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="text-gray-400">
                              <FileIcon />
                            </div>
                            <div>
                              <p className="text-base font-medium text-gray-900">{audioFiles[0].file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(audioFiles[0].file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {audioFiles[0].status === 'completed' && <CheckCircleIcon />}
                            {audioFiles[0].status === 'uploading' && (
                              <div className="w-20">
                                <div className="bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                                    style={{ width: `${audioFiles[0].progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            <button
                              onClick={() => removeFile(audioFiles[0].id, 'audio')}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              disabled={isUploading}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  {validationStatus.filesUploaded && (
                    <p className="text-base text-warning-600">
                      Files already exist. Click &quot;Upload &amp; Run Pipeline&quot; to overwrite.
                    </p>
                  )}
                </div>
                <Button
                  color="primary"
                  size="lg"
                  onPress={uploadAndRunPipeline}
                  isDisabled={!isFormValid || isUploading}
                  isLoading={isUploading}
                >
                  {isUploading ? 'Processing...' : 'Upload & Run Pipeline'}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}