"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  
  return (
    <div className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src="/bot-avatar.png" />
          <AvatarFallback className="bg-primary/90 text-white font-medium">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`rounded-2xl px-5 py-3.5 max-w-[85%] shadow-sm ${
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-sm" 
          : "bg-white border border-gray-100 rounded-tl-sm"
      }`}>
        <p className="text-base leading-relaxed">{message.content}</p>
        <div className={`text-xs mt-2 flex justify-end ${isUser ? "text-primary-foreground/80" : "text-gray-500"}`}>
          {formattedTime}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src="/user-avatar.png" />
          <AvatarFallback className="bg-gray-800 text-white font-medium">UN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}