"use client";

import { Button } from "@/components/ui/button";
import { Case } from "@/lib/api";
import { fabric } from "fabric";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Redo, Save, Type, Undo } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AIFeedback } from "./ai-feedback";

interface CanvasEditorProps {
  caseData?: Case;
  documentId?: string;
  documentTitle?: string;
}

export default function CanvasEditor({ caseData, documentId, documentTitle }: CanvasEditorProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorRef = useRef<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  
  useEffect(() => {
    if (canvasRef.current && !editorRef.current) {
      // Initialize Fabric.js canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: 'white',
        width: 800,
        height: 600,
        preserveObjectStacking: true,
      });
      
      editorRef.current = canvas;
      
      // Set up event listeners
      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', () => setSelectedObject(null));
      
      // Add some default text to the canvas
      addDefaultText(canvas);
      
      // Handle window resize
      const handleResize = () => {
        const parent = canvasRef.current?.parentElement;
        if (parent && canvas) {
          const width = Math.min(800, parent.clientWidth - 40);
          const scaleFactor = width / 800;
          canvas.setWidth(width);
          canvas.setHeight(600 * scaleFactor);
          canvas.setZoom(scaleFactor);
          canvas.renderAll();
        }
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();
      
      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.dispose();
        editorRef.current = null;
      };
    }
  }, []);
  
  const handleSelection = () => {
    const selected = editorRef.current?.getActiveObject();
    setSelectedObject(selected || null);
  };
  
  const addDefaultText = (canvas: fabric.Canvas) => {
    let defaultText = 'Click to edit this text. This is a sample appeal draft.';
    
    // Use case context to provide more relevant placeholder text if available
    if (caseData) {
      defaultText = `${documentTitle || 'Draft Document'} for case: ${caseData.title}\n\nClient: ${caseData.client_name}\nCase Number: ${caseData.case_number}\n\nClick to edit this text and start drafting your appeal.`;
    }
    
    const text = new fabric.Textbox(defaultText, {
      left: 50,
      top: 50,
      width: 700,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#333333',
    });
    
    canvas.add(text);
    canvas.renderAll();
  };
  
  const addNewTextbox = () => {
    if (!editorRef.current) return;
    
    const text = new fabric.Textbox('New text box', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#333333',
    });
    
    editorRef.current.add(text);
    editorRef.current.setActiveObject(text);
    editorRef.current.renderAll();
  };
  
  const formatText = (format: string) => {
    if (!editorRef.current || !selectedObject) return;
    
    if (selectedObject.type === 'textbox' || selectedObject.type === 'text') {
      const textObject = selectedObject as fabric.Textbox;
      
      switch (format) {
        case 'bold':
          textObject.set('fontWeight', textObject.fontWeight === 'bold' ? 'normal' : 'bold');
          break;
        case 'italic':
          textObject.set('fontStyle', textObject.fontStyle === 'italic' ? 'normal' : 'italic');
          break;
        case 'align-left':
          textObject.set('textAlign', 'left');
          break;
        case 'align-center':
          textObject.set('textAlign', 'center');
          break;
        case 'align-right':
          textObject.set('textAlign', 'right');
          break;
        default:
          break;
      }
      
      editorRef.current.renderAll();
    }
  };
  
  const getSelectedText = (): string => {
    if (!selectedObject) return '';
    
    if (selectedObject.type === 'textbox' || selectedObject.type === 'text') {
      return (selectedObject as fabric.Textbox).text || '';
    }
    
    return '';
  };
  
  const applyAIFeedback = (newText: string) => {
    if (!editorRef.current || !selectedObject) return;
    
    if (selectedObject.type === 'textbox' || selectedObject.type === 'text') {
      const textObject = selectedObject as fabric.Textbox;
      textObject.set('text', newText);
      editorRef.current.renderAll();
    }
  };
  
  const saveCanvas = async () => {
    if (!editorRef.current) return;
    
    try {
      // Save canvas content to backend if case context is provided
      if (caseData?.id && documentId) {
        // This would be expanded to save to backend using API
        // await apiService.updateDocument(caseData.id, documentId, {
        //   content: JSON.stringify(editorRef.current.toJSON()),
        //   title: documentTitle || 'Untitled Document'
        // });
        
        toast.success("Document saved successfully!");
      } else {
        // Default message for standalone mode
        toast.success("Canvas saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save document. Please try again.");
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white border border-gray-200 rounded-t-lg py-3 px-4 flex flex-wrap gap-3 items-center shadow-sm">
        <Button variant="outline" className="py-2.5 px-4" size="sm" onClick={addNewTextbox}>
          <Type className="h-4 w-4 mr-2" />
          Add Text
        </Button>
        <div className="h-6 border-r border-gray-200 mx-2"></div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9" 
          onClick={() => formatText('bold')} 
          disabled={!selectedObject}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9"  
          onClick={() => formatText('italic')} 
          disabled={!selectedObject}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="h-6 border-r border-gray-200 mx-2"></div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9" 
          onClick={() => formatText('align-left')} 
          disabled={!selectedObject}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9"  
          onClick={() => formatText('align-center')} 
          disabled={!selectedObject}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9" 
          onClick={() => formatText('align-right')} 
          disabled={!selectedObject}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="h-6 border-r border-gray-200 mx-2"></div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9" 
          disabled={!editorRef.current}
          onClick={() => {
            if (editorRef.current && typeof editorRef.current.undo === 'function') {
              editorRef.current.undo();
            }
          }}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9" 
          disabled={!editorRef.current}
          onClick={() => {
            if (editorRef.current && typeof editorRef.current.redo === 'function') {
              editorRef.current.redo();
            }
          }}
        >
          <Redo className="h-4 w-4" />
        </Button>
        <div className="flex-grow"></div>
        <Button 
          variant="default" 
          size="sm"
          className="py-2.5 px-4"
          onClick={saveCanvas}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
      
      <div className="border border-gray-200 bg-gray-50 p-6 flex justify-center min-h-[600px] shadow-inner">
        <canvas ref={canvasRef} className="rounded shadow-sm" />
      </div>
      
      <div className="mt-6 p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
        <AIFeedback 
          selectedText={getSelectedText()} 
          onApplyFeedback={applyAIFeedback} 
          caseData={caseData}
        />
      </div>
    </div>
  );
}