# Canvas AI Editor

A professional Next.js application for legal case management with AI-powered document editing and assistance.

## Features

- **Case Management**: Organize and manage all your legal cases in one place
- **Document Management**: Create, edit and organize documents for each case
- **Canvas Editor**: Edit text directly on canvas with intuitive controls
- **AI Chatbot**: Get case-specific assistance and guidance from AI
- **AI Appeal Feedback**: Select text regions and get AI-powered suggestions for improvement
- **Professional Design**: Clean and modern UI with responsive design

## Tech Stack

- **Frontend**: Next.js with TypeScript and App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Canvas Editing**: Fabric.js for interactive canvas editing
- **State Management**: React hooks for local state, context API for global state
- **API Integration**: Axios for connecting to FastAPI backend
- **UI Components**: React with shadcn/ui for accessible components

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- FastAPI backend running (default: http://localhost:8000)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/canvas-ai-editor.git
cd canvas-ai-editor
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
canvas-ai-editor/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── cases/          # Case management pages
│   │   ├── editor/         # Standalone editor page
│   │   └── chat/           # Standalone chat page
│   ├── components/
│   │   ├── cases/          # Case management components
│   │   ├── chat/           # Chat components
│   │   ├── editor/         # Canvas editor components
│   │   ├── navigation/     # Navigation components
│   │   └── ui/             # Shadcn UI components
│   ├── lib/
│   │   ├── api.ts          # API service
│   │   └── utils.ts        # Utility functions
│   └── styles/             # Global styles
├── public/                 # Static assets
└── .env.local              # Environment variables
```

## API Integration

The frontend connects to a FastAPI backend with the following endpoints:

### Case Management
- `/cases` - List, create, update, delete cases
- `/cases/:id` - Get case details
- `/cases/:id/documents` - List case documents
- `/cases/:id/documents/:documentId` - Manage individual documents

### AI Features
- `/chat` - Chat with AI assistant (with optional case context)
- `/documents/feedback` - Get AI feedback on document text

Each component is designed to work with or without case context, making the application flexible for different usage scenarios.

## Application Architecture

### Core Components

#### Case Management
- **Cases List**: View and filter all cases
- **Case Detail**: View case information with tabbed interface for tools
- **Document List**: Manage documents for each case

#### Canvas Editor
- **Fabric.js Canvas**: Free-form text editing and formatting
- **AI Integration**: Select text and get AI feedback
- **Document Saving**: Auto-saves to the backend (when in case context)

#### AI Assistant
- **Chat Interface**: Real-time conversation with AI
- **Context-Aware**: Adapts responses based on case information
- **Suggested Prompts**: Helps users get started with relevant questions

### Data Flow

1. User selects a case from the cases list
2. Case context is loaded and passed to all tools
3. Tools (editor, chat) adapt their interfaces based on the case context
4. API calls include case IDs to maintain context server-side
5. Document changes are tracked and saved with case association

### Offline Support

The application gracefully handles offline or development scenarios by:
- Using mock data when API calls fail
- Providing complete functionality without backend connectivity
- Showing appropriate notifications about connection status

## License

MIT