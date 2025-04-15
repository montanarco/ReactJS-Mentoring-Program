/// <reference types="vite/client" />
interface ImportMetaEnv {
    MOVIE_API_BASE_URL: string;
    // Add other variables if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}