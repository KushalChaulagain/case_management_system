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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Appeal Draft Editor</h1>
              <p className="text-gray-500">
                Edit your appeal draft and get AI-powered suggestions
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with AI
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Canvas Editor</CardTitle>
                  <CardDescription>
                    Use the toolbar to format text and add new elements
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <CanvasEditor />
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>AI Suggestions</CardTitle>
                  </div>
                  <CardDescription>
                    Select text on the canvas and click "Send to AI" to get feedback
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <div className="text-center py-12 text-gray-500">
                    <p>Select text on the canvas to get AI feedback</p>
                  </div>
                  {/* This area will be populated with AI feedback when text is sent */}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle>Recent Drafts</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Appeal Draft 1</div>
                      <div className="text-sm text-gray-500">Last edited: 2 hours ago</div>
                    </div>
                    <div className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Medical Appeal</div>
                      <div className="text-sm text-gray-500">Last edited: Yesterday</div>
                    </div>
                    <div className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Insurance Claim</div>
                      <div className="text-sm text-gray-500">Last edited: 3 days ago</div>
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
