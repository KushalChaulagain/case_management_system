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
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6 lg:px-8">
        <div className="mr-6 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Pen className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl">Canvas AI Editor</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button 
              variant={isActive('/cases') ? "default" : "ghost"} 
              className={isActive('/cases') ? "bg-primary text-white" : "hover:bg-gray-100"} 
              asChild
            >
              <Link href="/cases" className="flex items-center px-4 py-2">
                <Briefcase className="mr-2 h-5 w-5" />
                Cases
              </Link>
            </Button>
            <Button 
              variant={isActive('/editor') ? "default" : "ghost"} 
              className={isActive('/editor') ? "bg-primary text-white" : "hover:bg-gray-100"} 
              asChild
            >
              <Link href="/editor" className="flex items-center px-4 py-2">
                <FileText className="mr-2 h-5 w-5" />
                Editor
              </Link>
            </Button>
            <Button 
              variant={isActive('/chat') ? "default" : "ghost"} 
              className={isActive('/chat') ? "bg-primary text-white" : "hover:bg-gray-100"} 
              asChild
            >
              <Link href="/chat" className="flex items-center px-4 py-2">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-8 mx-2" />
            <Avatar className="h-9 w-9 border-2 border-gray-200">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary text-white font-medium">UN</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
}