export interface CreateDmChatBody {
  receiverNumber: string;
}
export enum MessageEnum {
  text = "text",
  image = "image",
  video = "video",
  voice = "voice",
  doc = "doc",
}
export interface SendDmBody {
  chatId: string;
  receiverNumber: string;
  messageContent: string;
  messageType: MessageEnum;
  replyedTo: null | string;
  attachement: string;
}

export interface leaveGroupBody {
  chatId: string
}