// config.js

// Check if the app is in production or development mode and set the API base URL accordingly
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-backend-url.up.railway.app';

// Optional: You could add more configurations based on environment
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

