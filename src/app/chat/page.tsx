"use client";

import { ChatInterface } from "@/components/chat/chat-interface";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, FileText, MessageSquare } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[calc(100vh-10rem)]">
          <div className="md:col-span-2 h-full flex flex-col">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-7 w-7 mr-3 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
              </div>
              <p className="text-gray-500 text-lg">Get help with your case and draft appeals with AI guidance</p>
            </div>
            <div className="flex-grow">
              <ChatInterface />
            </div>
          </div>
          
          <div className="col-span-1 space-y-8">
            <Card className="shadow-md border-gray-200">
              <CardHeader className="px-6 py-5">
                <CardTitle className="text-xl">Suggested Prompts</CardTitle>
                <CardDescription className="text-gray-500 mt-1.5">
                  Click on any prompt to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <div 
                      key={index} 
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-gray-200">
              <CardHeader className="px-6 py-5">
                <CardTitle className="text-xl">Your Documents</CardTitle>
                <CardDescription className="text-gray-500 mt-1.5">
                  Recently accessed documents
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium">Appeal Draft 1</span>
                    </div>
                    <Button variant="ghost" size="sm" className="px-3">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="font-medium">Medical Appeal</span>
                    </div>
                    <Button variant="ghost" size="sm" className="px-3">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-gray-200">
              <CardHeader className="px-6 py-5">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <CardTitle className="text-xl">Back to Editor</CardTitle>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <p className="text-gray-500 mb-5">
                  Return to the canvas editor to continue working on your appeal draft
                </p>
                <Button asChild className="w-full py-2.5" size="lg">
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