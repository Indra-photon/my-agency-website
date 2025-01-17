import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import projectService from '../appwrite/config.js';

const PhotoUploadAdmin = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        photoFile: null
    });
    
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const photoInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Update form data
        setFormData(prev => ({
            ...prev,
            photoFile: file
        }));

        // Create preview
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
    };

    const clearFile = () => {
        setFormData(prev => ({ ...prev, photoFile: null }));
        setPreview(null);
        if (photoInputRef.current) photoInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validate inputs
            if (!formData.title || !formData.photoFile) {
                throw new Error('Title and photo are required');
            }

            await projectService.uploadPhotoWithDetails(formData);
            
            setSuccess(true);
            // Reset form
            setFormData({
                title: '',
                description: '',
                category: '',
                photoFile: null
            });
            setPreview(null);
            if (photoInputRef.current) photoInputRef.current.value = '';

            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">
                        Upload New <span className="text-blue-500">Photo</span>
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Add your latest photo to the portfolio
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-3">
                        <X className="text-red-500" size={20} />
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg flex items-center gap-3">
                        <Upload className="text-green-500" size={20} />
                        <p className="text-green-500">Photo uploaded successfully!</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900/50 p-8 rounded-xl border border-gray-800">
                    {/* Photo Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">
                            Photo
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                            {preview ? (
                                <div className="relative rounded-lg overflow-hidden">
                                    <img 
                                        src={preview} 
                                        alt="Preview"
                                        className="w-full aspect-video object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <X size={16} className="text-white" />
                                    </button>
                                </div>
                            ) : (
                                <div 
                                    className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                    onClick={() => photoInputRef.current?.click()}
                                >
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-400">Click to upload photo</p>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={photoInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Text Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Title
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                placeholder="Enter photo title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                rows="4"
                                placeholder="Enter photo description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white transition-colors"
                            >
                                <option value="">Select Category</option>
                                <option value="product">Product Photography</option>
                                <option value="commercial">Commercial</option>
                                <option value="portrait">Portrait</option>
                                <option value="event">Event</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !formData.photoFile}
                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload size={20} />
                                Upload Photo
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PhotoUploadAdmin;