import * as arctic from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const redirectURI = "http://localhost:5000/auth/google/callback";

// console.log(clientId, clientSecret, redirectURI)

export const google = new arctic.Google(clientId, clientSecret, redirectURI);
