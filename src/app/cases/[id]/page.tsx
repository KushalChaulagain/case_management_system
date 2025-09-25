"use client";

import { CaseDetail } from "@/components/cases/case-detail";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { apiService, Case } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Mock data for offline development
const MOCK_CASES: Record<string, Case> = {
  '1': {
    id: '1',
    title: 'Johnson v. State Insurance',
    client_name: 'Robert Johnson',
    case_number: 'INS-2023-1245',
    description: 'Insurance claim appeal for medical procedure denial',
    status: 'active',
    created_at: '2023-11-15T10:30:00Z',
    updated_at: '2023-12-02T15:45:00Z',
  },
  '2': {
    id: '2',
    title: 'Martinez Family Trust',
    client_name: 'Elena Martinez',
    case_number: 'TR-2024-0089',
    description: 'Trust modification and estate planning',
    status: 'pending',
    created_at: '2024-02-10T09:15:00Z',
    updated_at: '2024-02-28T11:20:00Z',
  },
  '3': {
    id: '3',
    title: 'Smith Corporate Restructuring',
    client_name: 'Smith Technologies Inc.',
    case_number: 'CORP-2023-5678',
    description: 'Corporate restructuring and regulatory compliance',
    status: 'closed',
    created_at: '2023-08-05T14:00:00Z',
    updated_at: '2024-01-15T16:30:00Z',
  }
};

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCaseDetails = async () => {
      setIsLoading(true);
      
      try {
        const fetchedCase = await apiService.getCase(caseId);
        setCaseData(fetchedCase);
      } catch (error) {
        console.warn("Failed to fetch case from API, using mock data", error);
        
        // Use mock data if API call fails
        if (MOCK_CASES[caseId]) {
          setCaseData(MOCK_CASES[caseId]);
        } else {
          toast.error("Case not found");
          router.push("/cases");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCaseDetails();
  }, [caseId, router]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/cases">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Cases
            </Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p>Loading case details...</p>
          </div>
        ) : caseData ? (
          <CaseDetail caseData={caseData} />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Case not found</p>
            <Button variant="link" asChild>
              <Link href="/cases">Return to cases list</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
