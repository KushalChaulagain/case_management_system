import axios from 'axios';

// Configure axios instance with base URL and defaults
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: ChatMessage;
  id: string;
}

export interface FeedbackRequest {
  text: string;
}

export interface FeedbackResponse {
  original_text: string;
  feedback: string;
  improved_text: string;
}

export interface Case {
  id: string;
  title: string;
  client_name: string;
  case_number: string;
  description: string;
  status: 'active' | 'closed' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  case_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// API Functions
export const apiService = {
  // Case management endpoints
  async getCases(): Promise<Case[]> {
    const response = await api.get('/cases');
    return response.data;
  },

  async getCase(caseId: string): Promise<Case> {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  },

  async createCase(caseData: Partial<Case>): Promise<Case> {
    const response = await api.post('/cases', caseData);
    return response.data;
  },

  async updateCase(caseId: string, caseData: Partial<Case>): Promise<Case> {
    const response = await api.put(`/cases/${caseId}`, caseData);
    return response.data;
  },

  async deleteCase(caseId: string): Promise<void> {
    await api.delete(`/cases/${caseId}`);
  },

  // Chat endpoints
  async sendChatMessage(message: string, caseId?: string): Promise<ChatResponse> {
    const response = await api.post('/chat', { message, case_id: caseId });
    return response.data;
  },

  async getChatHistory(caseId?: string): Promise<ChatMessage[]> {
    const url = caseId ? `/chat/history?case_id=${caseId}` : '/chat/history';
    const response = await api.get(url);
    return response.data;
  },

  // Document and drafting endpoints
  async getTextFeedback(text: string, caseId?: string): Promise<FeedbackResponse> {
    const response = await api.post('/documents/feedback', { text, case_id: caseId });
    return response.data;
  },
  
  async getDocuments(caseId: string): Promise<Document[]> {
    const response = await api.get(`/cases/${caseId}/documents`);
    return response.data;
  },

  async getDocument(caseId: string, documentId: string): Promise<Document> {
    const response = await api.get(`/cases/${caseId}/documents/${documentId}`);
    return response.data;
  },

  async createDocument(caseId: string, title: string, content: string): Promise<Document> {
    const response = await api.post(`/cases/${caseId}/documents`, { title, content });
    return response.data;
  },

  async updateDocument(caseId: string, documentId: string, data: Partial<Document>): Promise<Document> {
    const response = await api.put(`/cases/${caseId}/documents/${documentId}`, data);
    return response.data;
  },

  async deleteDocument(caseId: string, documentId: string): Promise<void> {
    await api.delete(`/cases/${caseId}/documents/${documentId}`);
  },
};

export default apiService;
