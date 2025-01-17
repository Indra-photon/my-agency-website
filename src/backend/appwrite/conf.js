const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collections: {
        video: String(import.meta.env.VITE_APPWRITE_COLLECTION_VIDEO_ID),
        photo: String(import.meta.env.VITE_APPWRITE_COLLECTION_PHOTO_ID),
        design: String(import.meta.env.VITE_APPWRITE_COLLECTION_DESIGN_ID)
    },
    buckets: {
        video: String(import.meta.env.VITE_APPWRITE_BUCKET_VIDEO_ID),
        photo: String(import.meta.env.VITE_APPWRITE_BUCKET_PHOTO_ID),
        design: String(import.meta.env.VITE_APPWRITE_BUCKET_DESIGN_ID)
    }
};

export default conf;