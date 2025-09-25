"use client";

import { ChatInterface } from "@/components/chat/chat-interface";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  // Example suggested prompts that could be used to start conversations
  const suggestedPrompts = [
    "Help me draft an insurance claim appeal",
    "Review my medical appeal for clarity",
    "What information should I include in my appeal?",
    "Help me structure my arguments effectively"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
          <div className="md:col-span-2 h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-4">AI Assistant</h1>
            <div className="flex-grow">
              <ChatInterface />
            </div>
          </div>
          
          <div className="col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Prompts</CardTitle>
                <CardDescription>
                  Click on any prompt to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <div 
                      key={index} 
                      className="p-2 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Appeal Draft 1</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Medical Appeal</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Back to Editor</CardTitle>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Return to the canvas editor to continue working on your appeal draft
                </p>
                <Button asChild className="w-full">
                  <Link href="/editor" className="flex items-center justify-center">
                    Go to Editor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
