"use client";

import { CaseListItem } from "@/components/cases/case-list-item";
import { NewCaseDialog } from "@/components/cases/new-case-dialog";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiService, Case } from "@/lib/api";
import { Briefcase, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Mock data for offline development
const MOCK_CASES: Case[] = [
  {
    id: '1',
    title: 'Johnson v. State Insurance',
    client_name: 'Robert Johnson',
    case_number: 'INS-2023-1245',
    description: 'Insurance claim appeal for medical procedure denial',
    status: 'active',
    created_at: '2023-11-15T10:30:00Z',
    updated_at: '2023-12-02T15:45:00Z',
  },
  {
    id: '2',
    title: 'Martinez Family Trust',
    client_name: 'Elena Martinez',
    case_number: 'TR-2024-0089',
    description: 'Trust modification and estate planning',
    status: 'pending',
    created_at: '2024-02-10T09:15:00Z',
    updated_at: '2024-02-28T11:20:00Z',
  },
  {
    id: '3',
    title: 'Smith Corporate Restructuring',
    client_name: 'Smith Technologies Inc.',
    case_number: 'CORP-2023-5678',
    description: 'Corporate restructuring and regulatory compliance',
    status: 'closed',
    created_at: '2023-08-05T14:00:00Z',
    updated_at: '2024-01-15T16:30:00Z',
  }
];

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        const fetchedCases = await apiService.getCases();
        setCases(fetchedCases);
      } catch (error) {
        console.warn("Failed to fetch cases from API, using mock data", error);
        // Use mock data if API call fails
        setCases(MOCK_CASES);
        toast.info("Using demo data - API connection not available");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCases();
  }, []);
  
  // Filter cases based on search term and status filter
  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = searchTerm === "" || 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.case_number.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 page-container">
        <div className="page-header flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <Briefcase className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="page-title">Cases</h1>
              <p className="page-description">Manage and access your legal cases</p>
            </div>
          </div>
          <NewCaseDialog />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 my-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search cases..."
              className="pl-10 py-6 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] py-6">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-500">Loading cases...</p>
            </div>
          ) : filteredCases.length > 0 ? (
            filteredCases.map(caseItem => (
              <CaseListItem key={caseItem.id} caseItem={caseItem} />
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">No cases found matching your criteria</p>
              <Button variant="outline" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}