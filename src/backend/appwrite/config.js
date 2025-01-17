import conf from "./conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class ProjectService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Upload video file to specific video bucket
    async uploadVideo(file) {
        try {
            const response = await this.bucket.createFile(
                conf.buckets.video, // Using specific video bucket
                ID.unique(),
                file
            );
            return response.$id;
        } catch (error) {
            console.log("Appwrite service :: uploadVideo :: error", error);
            throw error;
        }
    }

    // Upload thumbnail for video
    async uploadThumbnail(file) {
        try {
            const response = await this.bucket.createFile(
                conf.buckets.video, // Using same bucket for thumbnails
                ID.unique(),
                file
            );
            return response.$id;
        } catch (error) {
            console.log("Appwrite service :: uploadThumbnail :: error", error);
            throw error;
        }
    }

    // Create video document with metadata
    async createVideoDocument({
        title,
        description,
        category,
        videoFileId,
        thumbnailId
    }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.collections.video, // Using specific video collection
                ID.unique(),
                {
                    title,
                    description,
                    category,
                    videoFile: videoFileId,
                    thumbnailId: thumbnailId,
                    type: 'video',
                }
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: createVideoDocument :: error", error);
            throw error;
        }
    }

    // Get video file URL
    async getVideoFileView(fileId) {
        try {
            return this.bucket.getFileView(conf.buckets.video, fileId);
        } catch (error) {
            console.log("Appwrite service :: getVideoFileView :: error", error);
            throw error;
        }
    }

    // Combined function to upload video and create document
    async uploadVideoWithDetails({
        title,
        description,
        category,
        videoFile,
        thumbnail
    }) {
        try {
            // Upload video file
            const videoFileId = await this.uploadVideo(videoFile);
            
            // Upload thumbnail if provided
            let thumbnailId = null;
            if (thumbnail) {
                thumbnailId = await this.uploadThumbnail(thumbnail);
            }

            // Create document with all details
            const document = await this.createVideoDocument({
                title,
                description,
                category,
                videoFileId,
                thumbnailId
            });

            return {
                success: true,
                documentId: document.$id,
                videoFileId,
                thumbnailId
            };
        } catch (error) {
            console.log("Appwrite service :: uploadVideoWithDetails :: error", error);
            throw error;
        }
    }

    // Get all videos
    async getAllVideos() {
        try {
            const videos = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.collections.video
            );

            // Process each video to include URLs
            const processedVideos = await Promise.all(videos.documents.map(async video => {
                const videoUrl = video.videoFile ? 
                    await this.getVideoFileView(video.videoFile) : 
                    null;
                const thumbnailUrl = video.thumbnail ? 
                    await this.getVideoFileView(video.thumbnail) : 
                    null;

                return {
                    id: video.$id,
                    title: video.title,
                    description: video.description,
                    category: video.category,
                    videoUrl: videoUrl,
                    thumbnail: thumbnailUrl,
                    uploadDate: video.uploadDate
                };
            }));

            return processedVideos;
        } catch (error) {
            console.log("Appwrite service :: getAllVideos :: error", error);
            throw error;
        }
    }

    // Get videos by category
    async getVideosByCategory() {
        try {
            const videos = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.collections.video,
            );

            // Process videos similar to getAllVideos
            const processedVideos = await Promise.all(videos.documents.map(async video => {
                const videoUrl = video.videoFile ? 
                    await this.getVideoFileView(video.videoFile) : 
                    null;
                const thumbnailUrl = video.thumbnail ? 
                    await this.getVideoFileView(video.thumbnail) : 
                    null;

                return {
                    id: video.$id,
                    title: video.title,
                    description: video.description,
                    category: video.category,
                    videoUrl: videoUrl,
                    thumbnail: thumbnailUrl,
                    uploadDate: video.uploadDate
                };
            }));

            return processedVideos;
        } catch (error) {
            console.log("Appwrite service :: getVideosByCategory :: error", error);
            throw error;
        }
    }

    // Upload photo file
    async uploadPhoto(file) {
        try {
            const response = await this.bucket.createFile(
                conf.buckets.photo,  // Using photo bucket ID
                ID.unique(),
                file
            );
            return response.$id;
        } catch (error) {
            console.log("Appwrite service :: uploadPhoto :: error", error);
            throw error;
        }
    }

    // Create photo document with metadata
    async createPhotoDocument({
        title,
        description,
        category,
        photoId
    }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.collections.photo,  // Using photo collection ID
                ID.unique(),
                {
                    title,
                    description,
                    category,
                    photoId: photoId,
                }
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: createPhotoDocument :: error", error);
            throw error;
        }
    }

    // Combined function to handle both photo upload and document creation
    async uploadPhotoWithDetails({
        title,
        description,
        category,
        photoFile
    }) {
        try {
            // First upload the photo
            const photoId = await this.uploadPhoto(photoFile);

            // Then create the document
            const document = await this.createPhotoDocument({
                title,
                description,
                category,
                photoId
            });

            return {
                success: true,
                documentId: document.$id,
                photoId
            };
        } catch (error) {
            console.log("Appwrite service :: uploadPhotoWithDetails :: error", error);
            throw error;
        }
    }

    // Get all photos
    async getAllPhotos() {
        try {
            const photos = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.collections.photo
            );

            // Process each photo to include URLs
            const processedPhotos = await Promise.all(photos.documents.map(async photo => {
                const photoUrl = photo.photoFile ? 
                    await this.getFileView(photo.photoId) : 
                    null;

                return {
                    id: photo.$id,
                    title: photo.title,
                    description: photo.description,
                    category: photo.category,
                    photoUrl: photoUrl,
                    uploadDate: photo.uploadDate
                };
            }));

            return processedPhotos;
        } catch (error) {
            console.log("Appwrite service :: getAllPhotos :: error", error);
            throw error;
        }
    }

    // Get photos by category
    async getPhotosByCategory() {
        try {
            const photos = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.collections.photo,
            );

            // Process photos with URLs
            const processedPhotos = await Promise.all(photos.documents.map(async photo => {
                const photoUrl = photo.photoId ? 
                    await this.getPhotoFileView(photo.photoId) : 
                    null;

                return {
                    id: photo.$id,
                    title: photo.title,
                    description: photo.description,
                    category: photo.category,
                    photoUrl: photoUrl,
                    uploadDate: photo.uploadDate
                };
            }));
            console.log(processedPhotos);
            
            return processedPhotos;
        } catch (error) {
            console.log("Appwrite service :: getPhotosByCategory :: error", error);
            throw error;
        }
    }

    // Get file view (using photo bucket)
    async getPhotoFileView(fileId) {
        try {
            return this.bucket.getFileView(conf.buckets.photo, fileId);
        } catch (error) {
            console.log("Appwrite service :: getPhotoFileView :: error", error);
            throw error;
        }
    }
}

const projectService = new ProjectService();
export default projectService;