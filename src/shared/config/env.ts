const NEXTCLOUD_SERVER = String(process.env.NEXTCLOUD_SERVER);
const NEXTCLOUD_USERNAME = String(process.env.NEXTCLOUD_USERNAME);
const NEXTCLOUD_TOKEN = String(process.env.NEXTCLOUD_TOKEN);
const NEXTCLOUD_ENDPOINT = String(process.env.NEXTCLOUD_ENDPOINT || "remote.php/dav/files");
const NEXTCLOUD_FOLDER = String(process.env.NEXTCLOUD_FOLDER || "/");

if (!NEXTCLOUD_SERVER) throw new Error("NEXTCLOUD_SERVER is not defined");
if (!NEXTCLOUD_USERNAME) throw new Error("NEXTCLOUD_USERNAME is not defined");
if (!NEXTCLOUD_TOKEN) throw new Error("NEXTCLOUD_TOKEN is not defined");
if (!NEXTCLOUD_ENDPOINT) throw new Error("NEXTCLOUD_ENDPOINT is not defined");
if (!NEXTCLOUD_FOLDER) throw new Error("NEXTCLOUD_FOLDER is not defined");

export {
  NEXTCLOUD_SERVER,
  NEXTCLOUD_USERNAME,
  NEXTCLOUD_TOKEN,
  NEXTCLOUD_ENDPOINT,
  NEXTCLOUD_FOLDER,
};
