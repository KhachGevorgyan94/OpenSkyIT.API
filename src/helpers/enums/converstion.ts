export enum ConversationStatusEnum {
  draft = 1, // Conversation is draft, when it contains only template message for user
  active,    // Conversation is active, when one of participants has written message
  finished   // Only OrderConversation may be set to finished, when one day passed after order finished or canceled
}

export enum MessageMediaTypeEnum {
  text = 1,
  photo,
  audio,
  supportTemplate,
  orderTemplate
}

export enum MessageTypeEnum {
  question = 1,
  answer
}

export enum OperatorConversationListTypeEnum {
  conversation = 1,
  order
}