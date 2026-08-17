//#region node_modules/.nitro/vite/services/ssr/assets/media-CqgNq6ku.js
var IMAGE_MIME_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/avif"
];
var VIDEO_MIME_TYPES = [
	"video/mp4",
	"video/webm",
	"video/quicktime"
];
function isAllowedImage(mimeType) {
	return IMAGE_MIME_TYPES.includes(mimeType) || mimeType.startsWith("image/");
}
function isAllowedVideo(mimeType) {
	return VIDEO_MIME_TYPES.includes(mimeType) || mimeType.startsWith("video/");
}
function formatBytes(bytes, decimals = 1) {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function validateMediaFile(file) {
	const isImage = isAllowedImage(file.type);
	const isVideo = isAllowedVideo(file.type);
	if (!isImage && !isVideo) throw new Error(`File "${file.name}" has an invalid format. Allowed: JPG, PNG, WebP, GIF, AVIF, MP4, WebM, MOV.`);
	if (isImage && file.size > 10485760) throw new Error(`Image "${file.name}" (${formatBytes(file.size)}) exceeds the 10 MB limit.`);
	if (isVideo && file.size > 52428800) throw new Error(`Video "${file.name}" (${formatBytes(file.size)}) exceeds the 50 MB limit.`);
	return {
		isImage,
		isVideo
	};
}
//#endregion
export { validateMediaFile as n, formatBytes as t };
