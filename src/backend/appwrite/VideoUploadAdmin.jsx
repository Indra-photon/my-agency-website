import React, { useState, useRef } from 'react';
import { Upload, X, Video, Image as ImageIcon, Loader } from 'lucide-react';
import projectService from '../appwrite/config.js';

const VideoUploadAdmin = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        videoFile: null,
        thumbnail: null
    });
    
    const [preview, setPreview] = useState({
        video: null,
        thumbnail: null
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        // Update form data
        setFormData(prev => ({
            ...prev,
            [type]: file
        }));

        // Create preview
        const fileUrl = URL.createObjectURL(file);
        setPreview(prev => ({
            ...prev,
            [type === 'videoFile' ? 'video' : 'thumbnail']: fileUrl
        }));
    };

    const clearFile = (type) => {
        if (type === 'video') {
            setFormData(prev => ({ ...prev, videoFile: null }));
            setPreview(prev => ({ ...prev, video: null }));
            if (videoInputRef.current) videoInputRef.current.value = '';
        } else {
            setFormData(prev => ({ ...prev, thumbnail: null }));
            setPreview(prev => ({ ...prev, thumbnail: null }));
            if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await projectService.uploadVideoWithDetails(formData);
            setSuccess(true);
            // Reset form
            setFormData({
                title: '',
                description: '',
                category: '',
                videoFile: null,
                thumbnail: null
            });
            setPreview({ video: null, thumbnail: null });
            if (videoInputRef.current) videoInputRef.current.value = '';
            if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
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
                        Upload New <span className="text-blue-500">Work</span>
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Add your latest video project to the portfolio
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
                        <p className="text-green-500">Video uploaded successfully!</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900/50 p-8 rounded-xl border border-gray-800">
                    {/* File Upload Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Video Upload */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">
                                Video File
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                {preview.video ? (
                                    <div className="relative rounded-lg overflow-hidden">
                                        <video 
                                            src={preview.video} 
                                            className="w-full aspect-video object-cover"
                                            controls
                                        />
                                        <button
                                            type="button"
                                            onClick={() => clearFile('video')}
                                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={16} className="text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                        onClick={() => videoInputRef.current?.click()}
                                    >
                                        <Video className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-400">Click to upload video</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={videoInputRef}
                                    onChange={(e) => handleFileChange(e, 'videoFile')}
                                    accept="video/*"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">
                                Thumbnail Image
                                <span className="text-gray-500 ml-1">(Optional)</span>
                            </label>
                            <div className="relative">
                                {preview.thumbnail ? (
                                    <div className="relative rounded-lg overflow-hidden">
                                        <img 
                                            src={preview.thumbnail} 
                                            alt="Thumbnail preview"
                                            className="w-full aspect-video object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => clearFile('thumbnail')}
                                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={16} className="text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                        onClick={() => thumbnailInputRef.current?.click()}
                                    >
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-400">Click to upload thumbnail</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={thumbnailInputRef}
                                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
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
                                placeholder="Enter video title"
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
                                placeholder="Enter video description"
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
                                <option value="social-media">Social Media</option>
                                <option value="product">Product</option>
                                <option value="commercial">Commercial</option>
                                <option value="animation">Animation</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !formData.videoFile}
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
                                Upload Video
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadAdmin;