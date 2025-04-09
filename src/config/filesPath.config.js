import { ip } from "./dbCon.config";
const backendUploadDirectoryURL = `${ip}`;
const oneImageToAvatarUploadURL = `${backendUploadDirectoryURL}/upload/images`
export {backendUploadDirectoryURL, oneImageToAvatarUploadURL};