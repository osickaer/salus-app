declare global {
  interface ChatConversation {
    conversationId: string;
    user: string;
    conversationDesc: string;
    createdAt: string;
  }

  interface Message {
    chatId: string;
    role: "user" | "assistant";
    message: string;
  }
}

export {}; // This makes it a module and avoids TypeScript errors
