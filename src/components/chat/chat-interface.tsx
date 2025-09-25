"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import apiService, { Case } from "@/lib/api";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, Message } from "./message";

interface ChatInterfaceProps {
  caseData?: Case;
}

export function ChatInterface({ caseData }: ChatInterfaceProps = {}) {
  // Generate initial message based on whether we have case context
  const initialMessages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: caseData 
        ? `Hello! I'm your AI assistant for the case "${caseData.title}". How can I help you today?` 
        : "Hello! I'm your AI assistant. How can I help you with your appeal drafting today?",
      timestamp: new Date(),
    },
  ];
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Try to use the real API, but fall back to mock if it fails
      try {
        const response = await apiService.sendChatMessage(input, caseData?.id);
        
        const botMessage: Message = {
          id: response.id || uuidv4(),
          role: "assistant",
          content: response.message.content,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } catch (apiError) {
        console.warn("API call failed, using mock response", apiError);
        
        // Simulate API call for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Customize the response based on case context if available
        const botMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: generateMockResponse(input, caseData),
          timestamp: new Date(),
        };
      
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
      console.error("Error in chat:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateMockResponse = (input: string, caseContext?: Case): string => {
    // Use case context to provide more tailored responses if available
    if (caseContext) {
      if (input.toLowerCase().includes("case")) {
        return `This case "${caseContext.title}" (Case #${caseContext.case_number}) involves ${caseContext.client_name}. The case is currently ${caseContext.status}. Would you like me to help you with specific aspects of this case?`;
      }
      
      if (input.toLowerCase().includes("client")) {
        return `The client for this case is ${caseContext.client_name}. What specific information about the client do you need help with?`;
      }
    }
    
    // Default responses
    if (input.toLowerCase().includes("appeal")) {
      return "For your appeal draft, I recommend focusing on clear, concise language and including all relevant supporting evidence. Would you like me to review a specific section of your appeal?";
    } else if (input.toLowerCase().includes("help")) {
      return "I can help you draft appeals, review text for clarity, suggest improvements to your arguments, or answer questions about the appeal process. What specific assistance do you need today?";
    } else {
      return "I understand. To provide the most helpful assistance, could you share more details about your appeal case or what specific aspect you're working on?";
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="px-4">
        <CardTitle>
          {caseData 
            ? `AI Assistant - ${caseData.title}`
            : "Chat with AI Assistant"
          }
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto px-4 pt-0 pb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}