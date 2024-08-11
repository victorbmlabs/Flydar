import { Client, Databases } from "node-appwrite"

const APPWRITE_ENDPOINT = import.meta.env.APPWRITE_ENDPOINT;
const APPWRITE_API_KEY = import.meta.env.APPWRITE_API_KEY;
const FLYDAR_PROJECT_ID = import.meta.env.FLYDAR_PROJECT_ID;

const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(FLYDAR_PROJECT_ID)
    .setKey(APPWRITE_API_KEY)
;

const databases = new Databases(client);
