import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ZoomIn } from 'lucide-react';
import projectService from '../backend/appwrite/config.js';

// Modal Component
const VideoModal = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const [videoRatio, setVideoRatio] = useState(16/9);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                const { videoWidth, videoHeight } = videoRef.current;
                setVideoRatio(videoWidth / videoHeight);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8" 
            onClick={onClose}
        >
            <div 
                className="relative bg-gray-900 rounded-xl p-4"
                style={{
                    width: `min(${Math.round(videoRatio * 70)}vh, 90vw)`,
                    maxWidth: '1200px'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
                >
                    <X size={20} />
                </button>

                <video 
                    ref={videoRef}
                    controls 
                    autoPlay 
                    className="w-full rounded-lg"
                    src={video.videoUrl}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

// New Photo Modal Component
// const PhotoModal = ({ photo, onClose }) => {
//     return (
//         <div 
//             className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8" 
//             onClick={onClose}
//         >
//             <div 
//                 className="relative bg-gray-900 rounded-xl p-4 max-w-4xl"
//                 onClick={e => e.stopPropagation()}
//             >
//                 <button 
//                     onClick={onClose}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
//                 >
//                     <X size={20} />
//                 </button>

//                 <img 
//                     src={photo.photoUrl}
//                     alt={photo.title}
//                     className="w-full rounded-lg"
//                 />
//             </div>
//         </div>
//     );
// };
const PhotoModal = ({ photo, onClose }) => {
    const imageRef = useRef(null);
    const [imageRatio, setImageRatio] = useState(16/9);

    useEffect(() => {
        const handleImageLoad = () => {
            if (imageRef.current) {
                const { naturalWidth, naturalHeight } = imageRef.current;
                setImageRatio(naturalWidth / naturalHeight);
            }
        };

        // If image is already loaded
        if (imageRef.current?.complete) {
            handleImageLoad();
        }

        const currentImageRef = imageRef.current;
        currentImageRef?.addEventListener('load', handleImageLoad);

        return () => {
            currentImageRef?.removeEventListener('load', handleImageLoad);
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8" 
            onClick={onClose}
        >
            <div 
                className="relative bg-gray-900 rounded-xl p-4"
                style={{
                    width: `min(${Math.round(imageRatio * 70)}vh, 90vw)`,
                    maxWidth: '1200px'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
                >
                    <X size={20} />
                </button>

                <img 
                    ref={imageRef}
                    src={photo.photoUrl}
                    alt={photo.title}
                    className="w-full rounded-lg"
                    onError={(e) => {
                        e.target.src = 'fallback-image-url'; // Add a fallback image URL
                        console.error('Error loading image');
                    }}
                />
            </div>
        </div>
    );
};

const SocialMediaMarketing = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    // States for photos
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const videoRefs = useRef({});

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoData = await projectService.getVideosByCategory('product');
                const photoData = await projectService.getPhotosByCategory();
                setVideos(videoData);
                setPhotos(photoData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                Error loading videos: {error}
            </div>
        );
    }

    return (
        <div className="py-8 overflow-hidden">
            <div className="relative">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
                
                {/* Sliding Track */}
                <div className="flex gap-6 animate-slide-left">
                    {[...videos, ...videos].map((video, index) => (
                        <div 
                            key={`${video.id}-${index}`}
                            className="flex-none w-[400px] aspect-video relative group cursor-pointer overflow-hidden rounded-xl"
                        >
                            <div className="relative h-full transform transition-transform duration-300 group-hover:scale-105">
                                <video
                                    ref={el => videoRefs.current[`${video.id}-${index}`] = el}
                                    className="w-full h-full object-cover"
                                    src={video.videoUrl}
                                    muted
                                    playsInline
                                    loop
                                    onMouseEnter={e => {
                                        try {
                                            e.target.play();
                                        } catch (error) {
                                            console.error('Error playing video:', error);
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        try {
                                            e.target.pause();
                                            e.target.currentTime = 0;
                                        } catch (error) {
                                            console.error('Error pausing video:', error);
                                        }
                                    }}
                                />

                                {/* Hover Overlay with Play Button */}
                                <div 
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                             transition-all duration-300 ease-in-out flex items-center justify-center"
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <Play className="text-white w-16 h-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative mt-16">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
                
                <div className="flex gap-6 animate-slide-right">
                    {[...photos, ...photos].map((photo, index) => (
                        <div 
                            key={`${photo.id}-${index}`}
                            className="flex-none w-[400px] aspect-video relative group cursor-pointer overflow-hidden rounded-xl"
                        >
                            <div className="relative h-full transform transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={photo.photoUrl}
                                    alt={photo.title}
                                    className="w-full h-full object-cover"
                                />

                                <div 
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                             transition-all duration-300 ease-in-out flex items-center justify-center"
                                    onClick={() => setSelectedPhoto(photo)}
                                >
                                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <ZoomIn className="text-white w-16 h-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Video Modal */}
            {selectedVideo && (
                <VideoModal 
                    video={selectedVideo} 
                    onClose={() => setSelectedVideo(null)} 
                />
            )}

            {selectedPhoto && (
                <PhotoModal 
                    photo={selectedPhoto} 
                    onClose={() => setSelectedPhoto(null)} 
                />
            )}

            {/* Animation Styles */}
            {/* <style jsx global>{`
                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-slide {
                    animation: slide 40s linear infinite;
                }

                .animate-slide:hover {
                    animation-play-state: paused;
                }
            `}</style> */}
             <style jsx global>{`
                @keyframes slide-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes slide-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-slide-left {
                    animation: slide-left 40s linear infinite;
                }

                .animate-slide-right {
                    animation: slide-right 40s linear infinite;
                }

                .animate-slide-left:hover,
                .animate-slide-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default SocialMediaMarketing;