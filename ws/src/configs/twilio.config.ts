import twilio from "twilio";
import { twilioAccountSid, twilioAuthToken, twilioVirtualNumber, } from "./env.config.js";

const client = twilio(twilioAccountSid, twilioAuthToken);

export default async function sendOtp(otp: string, number: string) {
  const message = await client.messages.create({
    body: otp,  // body of message
    to: number, // recipient number
    from: twilioVirtualNumber // The number from the message will be sent
  });
  return message.status
}