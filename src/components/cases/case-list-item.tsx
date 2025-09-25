"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Case } from "@/lib/api";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Folder, User } from "lucide-react";
import Link from "next/link";

interface CaseListItemProps {
  caseItem: Case;
}

export function CaseListItem({ caseItem }: CaseListItemProps) {
  // Format the date using date-fns
  const formattedDate = formatDistanceToNow(new Date(caseItem.updated_at), { addSuffix: true });
  const formattedFullDate = format(new Date(caseItem.updated_at), 'MMM d, yyyy');
  
  // Determine the badge color based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'closed':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  // Status labels with proper capitalization
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'closed':
        return 'Closed';
      case 'pending':
        return 'Pending';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <Link href={`/cases/${caseItem.id}`} className="block w-full">
      <Card className="hover:bg-gray-50 transition-colors cursor-pointer shadow-sm border-gray-200">
        <CardHeader className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Folder className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{caseItem.title}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-gray-500">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1 text-gray-700">{caseItem.case_number}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center">
                  <User className="h-3.5 w-3.5 mr-1.5" />
                  <span className="text-sm">{caseItem.client_name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 w-full md:w-auto">
            <Badge variant={getBadgeVariant(caseItem.status)} className="px-3 py-1 text-xs">
              {getStatusLabel(caseItem.status)}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span title={formattedFullDate}>Updated {formattedDate}</span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}