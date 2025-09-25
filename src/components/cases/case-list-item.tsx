"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Case } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { Folder } from "lucide-react";
import Link from "next/link";

interface CaseListItemProps {
  caseItem: Case;
}

export function CaseListItem({ caseItem }: CaseListItemProps) {
  // Format the date using date-fns
  const formattedDate = formatDistanceToNow(new Date(caseItem.updated_at), { addSuffix: true });
  
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

  return (
    <Link href={`/cases/${caseItem.id}`} className="block w-full">
      <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
        <CardHeader className="p-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <Folder className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{caseItem.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{caseItem.case_number}</span>
                <span>•</span>
                <span>{caseItem.client_name}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={getBadgeVariant(caseItem.status)}>
              {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
            </Badge>
            <span className="text-xs text-gray-500">Updated {formattedDate}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
