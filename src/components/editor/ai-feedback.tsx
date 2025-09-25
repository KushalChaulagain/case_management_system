"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import apiService, { Case } from "@/lib/api";
import { Check, Copy, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AIFeedbackProps {
  selectedText: string;
  onApplyFeedback: (text: string) => void;
  caseData?: Case;
}

export function AIFeedback({ selectedText, onApplyFeedback, caseData }: AIFeedbackProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const generateFeedback = async () => {
    if (!selectedText) {
      toast.error("Please select text to analyze");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to use the real API, but fall back to mock if it fails
      try {
        const response = await apiService.getTextFeedback(selectedText, caseData?.id);
        setFeedback(response.improved_text);
        toast.success("AI feedback generated successfully!");
      } catch (apiError) {
        console.warn("API call failed, using mock response", apiError);
        
        // Simulate API call for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock feedback - this would come from your LLM
        setFeedback(generateMockFeedback(selectedText));
        toast.success("AI feedback generated successfully!");
      }
    } catch (error) {
      toast.error("Failed to get AI feedback. Please try again.");
      console.error("Error getting feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateMockFeedback = (text: string): string => {
    // This is just a placeholder
    let improvedText = text
      .replace(/I believe/gi, "Evidence shows")
      .replace(/maybe/gi, "demonstrably")
      .replace(/good/gi, "substantial")
      .replace(/bad/gi, "detrimental");
      
    // Add case-specific references if case data is available
    if (caseData) {
      improvedText = improvedText
        .replace(/the client/gi, caseData.client_name)
        .replace(/this case/gi, `case ${caseData.case_number}`);
    }
    
    if (text.length < 50) {
      return `Your text is quite brief. Consider expanding with more supporting evidence: "${improvedText}"`;
    } else {
      return `I suggest rephrasing for more clarity and persuasiveness: "${improvedText}"`;
    }
  };
  
  const copyToClipboard = () => {
    if (!feedback) return;
    
    navigator.clipboard.writeText(feedback);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleApplyFeedback = () => {
    if (feedback) {
      onApplyFeedback(feedback.replace(/^"(.+)"$/, "$1")); // Remove quotes if present
      toast.success("Applied AI feedback to canvas!");
    }
  };
  
  const provideFeedbackRating = (positive: boolean) => {
    // This would send feedback rating to your backend
    toast.success(`Thank you for your ${positive ? "positive" : "negative"} feedback!`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          AI Appeal Feedback
        </h3>
        <Button 
          onClick={generateFeedback}
          disabled={!selectedText || isLoading}
        >
          {isLoading ? "Generating..." : "Generate Feedback"}
        </Button>
      </div>
      
      {selectedText && (
        <Card className="p-3 bg-muted/50">
          <p className="text-sm font-medium mb-1">Selected Text:</p>
          <p className="text-sm italic">{selectedText}</p>
        </Card>
      )}
      
      {feedback && (
        <div className="space-y-4">
          <Separator />
          
          <div className="bg-muted/30 border border-primary/20 rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm">AI Suggestion:</p>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm">{feedback}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => provideFeedbackRating(true)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => provideFeedbackRating(false)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Not Helpful
              </Button>
            </div>
            
            <Button onClick={handleApplyFeedback}>
              Apply to Canvas
            </Button>
          </div>
        </div>
      )}
      
      {!selectedText && !feedback && (
        <div className="text-center py-8 text-gray-500">
          <p>Select text on the canvas to get AI feedback</p>
        </div>
      )}
    </div>
  );
}
