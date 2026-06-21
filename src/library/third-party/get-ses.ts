import { SESv2Client } from "@aws-sdk/client-sesv2";

const region = process.env.AWS_REGION
const accessKey = process.env.SES_ACCESS_KEY
const secretKey = process.env.SES_SECRET_KEY

if (!region || !accessKey || !secretKey){
  throw new Error("Get SES: One of the following is missing: region, access key or secret key")
}

export const sesv2client = new SESv2Client({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  },
  apiVersion: "2019-09-27"
}); 
