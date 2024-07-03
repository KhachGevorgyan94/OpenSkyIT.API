"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConversationStatusEnum;
(function (ConversationStatusEnum) {
    ConversationStatusEnum[ConversationStatusEnum["draft"] = 1] = "draft";
    ConversationStatusEnum[ConversationStatusEnum["active"] = 2] = "active";
    ConversationStatusEnum[ConversationStatusEnum["finished"] = 3] = "finished"; // Only OrderConversation may be set to finished, when one day passed after order finished or canceled
})(ConversationStatusEnum = exports.ConversationStatusEnum || (exports.ConversationStatusEnum = {}));
var MessageMediaTypeEnum;
(function (MessageMediaTypeEnum) {
    MessageMediaTypeEnum[MessageMediaTypeEnum["text"] = 1] = "text";
    MessageMediaTypeEnum[MessageMediaTypeEnum["photo"] = 2] = "photo";
    MessageMediaTypeEnum[MessageMediaTypeEnum["audio"] = 3] = "audio";
    MessageMediaTypeEnum[MessageMediaTypeEnum["supportTemplate"] = 4] = "supportTemplate";
    MessageMediaTypeEnum[MessageMediaTypeEnum["orderTemplate"] = 5] = "orderTemplate";
})(MessageMediaTypeEnum = exports.MessageMediaTypeEnum || (exports.MessageMediaTypeEnum = {}));
var MessageTypeEnum;
(function (MessageTypeEnum) {
    MessageTypeEnum[MessageTypeEnum["question"] = 1] = "question";
    MessageTypeEnum[MessageTypeEnum["answer"] = 2] = "answer";
})(MessageTypeEnum = exports.MessageTypeEnum || (exports.MessageTypeEnum = {}));
var OperatorConversationListTypeEnum;
(function (OperatorConversationListTypeEnum) {
    OperatorConversationListTypeEnum[OperatorConversationListTypeEnum["conversation"] = 1] = "conversation";
    OperatorConversationListTypeEnum[OperatorConversationListTypeEnum["order"] = 2] = "order";
})(OperatorConversationListTypeEnum = exports.OperatorConversationListTypeEnum || (exports.OperatorConversationListTypeEnum = {}));
