import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Briefcase, FileText, MessageSquare, Pen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Pen className="h-6 w-6" />
            <span className="font-bold text-xl">Canvas AI Editor</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant={isActive('/cases') ? "default" : "ghost"} asChild>
              <Link href="/cases" className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Cases
              </Link>
            </Button>
            <Button variant={isActive('/editor') ? "default" : "ghost"} asChild>
              <Link href="/editor" className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Editor
              </Link>
            </Button>
            <Button variant={isActive('/chat') ? "default" : "ghost"} asChild>
              <Link href="/chat" className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
}
