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

export function validateMediaFile(file: File): { isImage: boolean; isVideo: boolean } {
  const isImage = isAllowedImage(file.type);
  const isVideo = isAllowedVideo(file.type);

  if (!isImage && !isVideo) {
    throw new Error("Only JPG/PNG/WebP/GIF images or MP4/WebM videos are allowed");
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image file size exceeds the 10 MB limit");
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    throw new Error("Video file size exceeds the 50 MB limit");
  }

  return { isImage, isVideo };
}
