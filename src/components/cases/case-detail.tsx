"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Case } from "@/lib/api";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Clock, FileText, MessageCircle, MoreHorizontal, PenTool } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import to avoid SSR issues with components that use browser APIs
const ChatInterface = dynamic(
  () => import("@/components/chat/chat-interface").then(mod => ({ default: mod.ChatInterface })), 
  { ssr: false }
);
const CanvasEditor = dynamic(
  () => import("@/components/editor/canvas-editor"), 
  { ssr: false }
);

interface CaseDetailProps {
  caseData: Case;
}

export function CaseDetail({ caseData }: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState("documents");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="space-y-6">
      {/* Case Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{caseData.title}</h1>
            <Badge variant={caseData.status === 'active' ? 'default' : caseData.status === 'closed' ? 'secondary' : 'outline'}>
              {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <div className="flex items-center">
              <span className="font-medium mr-1">Client:</span> {caseData.client_name}
            </div>
            <div>•</div>
            <div className="flex items-center">
              <span className="font-medium mr-1">Case Number:</span> {caseData.case_number}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Separator />
      
      {/* Tabs for different tools */}
      <Tabs defaultValue="documents" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center">
            <PenTool className="h-4 w-4 mr-2" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
        </TabsList>
        
        {/* Documents tab content */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Case Documents</CardTitle>
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  New Document
                </Button>
              </div>
              <CardDescription>
                All documents related to this case
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Appeal Draft</p>
                      <p className="text-sm text-gray-500">Updated 3 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Open</Button>
                </div>
                
                <div className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Client Statement</p>
                      <p className="text-sm text-gray-500">Updated 1 week ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Open</Button>
                </div>
                
                <div className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Evidence Summary</p>
                      <p className="text-sm text-gray-500">Updated 2 weeks ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Open</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Case Details</CardTitle>
              <CardDescription>Additional information about this case</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-1">Description</h3>
                  <p>{caseData.description || "No description provided"}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Created</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{format(new Date(caseData.created_at), 'PPP')}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Last Updated</h3>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{formatDistanceToNow(new Date(caseData.updated_at), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Editor tab content */}
        <TabsContent value="editor">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Editor</CardTitle>
                  <CardDescription>Edit and manage appeal drafts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <CanvasEditor 
                caseData={caseData}
                documentId="sample-doc-1"
                documentTitle="Appeal Draft"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Chat tab content */}
        <TabsContent value="chat">
          <Card className="h-[calc(100vh-280px)]">
            <CardHeader className="pb-3">
              <CardTitle>Case Assistant</CardTitle>
              <CardDescription>Get help with your case using AI</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 h-full">
              <div className="h-[calc(100%-30px)]">
                <ChatInterface caseData={caseData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
