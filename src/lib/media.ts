export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export const VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export function isAllowedImage(mimeType: string): boolean {
  return IMAGE_MIME_TYPES.includes(mimeType) || mimeType.startsWith("image/");
}

export function isAllowedVideo(mimeType: string): boolean {
  return VIDEO_MIME_TYPES.includes(mimeType) || mimeType.startsWith("video/");
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function validateMediaFile(file: File): { isImage: boolean; isVideo: boolean } {
  const isImage = isAllowedImage(file.type);
  const isVideo = isAllowedVideo(file.type);

  if (!isImage && !isVideo) {
    throw new Error(`File "${file.name}" has an invalid format. Allowed: JPG, PNG, WebP, GIF, AVIF, MP4, WebM, MOV.`);
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    throw new Error(`Image "${file.name}" (${formatBytes(file.size)}) exceeds the 10 MB limit.`);
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    throw new Error(`Video "${file.name}" (${formatBytes(file.size)}) exceeds the 50 MB limit.`);
  }

  return { isImage, isVideo };
}

export function validateMediaFiles(files: FileList | File[]): Array<{ file: File; isImage: boolean; isVideo: boolean }> {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) {
    throw new Error("No files selected.");
  }
  return fileArray.map((file) => {
    const info = validateMediaFile(file);
    return { file, ...info };
  });
}


