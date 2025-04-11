/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  // add more environment variables here as needed, e.g.:
  // readonly VITE_ANOTHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
