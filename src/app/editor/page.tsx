"use client";

import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic import to avoid SSR issues with fabric.js
const CanvasEditor = dynamic(
  () => import("@/components/editor/canvas-editor"),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 lg:py-10">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Appeal Draft Editor</h1>
              <p className="text-gray-500 text-lg mt-2">
                Edit your appeal draft and get AI-powered suggestions
              </p>
            </div>
            <Button variant="outline" className="px-5 py-2.5" asChild>
              <Link href="/chat" className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with AI
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="px-6 py-5">
                  <CardTitle className="text-xl">Canvas Editor</CardTitle>
                  <CardDescription className="text-gray-500 mt-1.5">
                    Use the toolbar to format text and add new elements
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                  <CanvasEditor />
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1 space-y-8">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">AI Suggestions</CardTitle>
                  </div>
                  <CardDescription className="text-gray-500 mt-1.5">
                    Select text on the canvas and click "Send to AI" to get feedback
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                  <div className="text-center py-16 text-gray-500">
                    <p>Select text on the canvas to get AI feedback</p>
                  </div>
                  {/* This area will be populated with AI feedback when text is sent */}
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-gray-200">
                <CardHeader className="px-6 py-5">
                  <CardTitle className="text-xl">Recent Drafts</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="font-medium">Appeal Draft 1</div>
                      <div className="text-sm text-gray-500 mt-1">Last edited: 2 hours ago</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="font-medium">Medical Appeal</div>
                      <div className="text-sm text-gray-500 mt-1">Last edited: Yesterday</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="font-medium">Insurance Claim</div>
                      <div className="text-sm text-gray-500 mt-1">Last edited: 3 days ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}