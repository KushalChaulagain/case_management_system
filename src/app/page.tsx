"use client";

import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Redirect to cases page if user is already in the system
  // In a real app, this would check for authentication status
  useEffect(() => {
    // This is just a demo redirect
    // In production, you'd check if user is logged in first
    // router.push("/cases");
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Legal Case Management
                  </h1>
                  <p className="text-gray-500 md:text-xl dark:text-gray-400">
                    Manage legal cases with powerful AI tools. Create, edit, and improve your
                    appeal drafts with our advanced AI assistant. Get instant feedback and
                    organize all your case documents in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/cases">
                      View Cases
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/editor">
                      Try Editor
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-gray-100 sm:w-full lg:order-last">
                {/* Placeholder for screenshot/video of the editor */}
                <div className="flex h-full items-center justify-center text-gray-400">
                  Application Preview
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Briefcase className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Case Management</CardTitle>
                  <CardDescription>
                    Organize and access all your legal cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Keep all case documents, communications, and drafts organized in one centralized system for easy access.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Canvas Editor</CardTitle>
                  <CardDescription>
                    Edit text directly on canvas with intuitive controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Our canvas editor allows for precise text placement and editing with professional formatting options.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>AI Drafting</CardTitle>
                  <CardDescription>
                    Get intelligent feedback on your appeal drafts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Select text regions and send them to our AI for suggestions, improvements, and professional rewriting.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>AI Chat</CardTitle>
                  <CardDescription>
                    Chat with our AI assistant for guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Get help with your appeals through our conversational AI assistant that understands legal context.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-gray-500 md:text-left">
            © {new Date().getFullYear()} Canvas AI Editor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}