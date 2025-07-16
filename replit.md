# Visual JS IDE

## Overview

This is a visual JavaScript IDE built with React and TypeScript that allows users to create applications using a drag-and-drop block-based interface. The application generates JavaScript, HTML, and CSS code from visual blocks and provides a live preview of the created application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks (useState, useCallback) with custom hooks
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Drag & Drop**: React DnD with HTML5 backend
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store
- **API**: RESTful endpoints for project management

### Key Design Decisions

1. **Monorepo Structure**: Uses a shared folder for common types and schemas between client and server
2. **Block-Based System**: Visual programming interface with draggable blocks representing code elements
3. **Real-time Code Generation**: Automatically generates JavaScript, HTML, and CSS from visual blocks
4. **Live Preview**: Embedded iframe showing real-time preview of the generated application
5. **Local Storage**: Client-side project persistence with localStorage as fallback

## Key Components

### Visual Editor Components
- **VisualCanvas**: Drop zone for placing code blocks
- **BlocksSidebar**: Categorized palette of available blocks
- **DroppedBlock**: Individual block instances with property editors
- **DraggableBlock**: Draggable block templates from the sidebar

### Code Generation
- **CodeGenerator**: Converts visual blocks to JavaScript, HTML, and CSS
- **LivePreview**: Displays generated code in real-time
- **CodeView**: Syntax-highlighted code display with tabs

### Project Management
- **TopToolbar**: Main application toolbar with file operations
- **ExportModal**: Export functionality for generated code
- **Project Storage**: Local and server-side project persistence

## Data Flow

1. **Block Creation**: Users drag blocks from sidebar to canvas
2. **Property Editing**: Blocks can be configured through property panels
3. **Code Generation**: Visual blocks are continuously converted to code
4. **Live Preview**: Generated code is displayed in real-time iframe
5. **Project Persistence**: Projects saved to localStorage and optionally to server

## External Dependencies

### Core Libraries
- **React**: UI framework with hooks and context
- **TypeScript**: Static typing throughout the application
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI primitives
- **React DnD**: Drag and drop functionality
- **Wouter**: Lightweight routing

### Development Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production
- **PostCSS**: CSS processing with Tailwind

### Backend Dependencies
- **Express**: Web application framework
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL provider
- **Zod**: Schema validation library

## Deployment Strategy

### Development
- **Dev Server**: Vite development server with HMR
- **Database**: Uses DATABASE_URL environment variable
- **Hot Reload**: Full stack development with automatic reloading

### Production
- **Build Process**: Vite builds client, ESBuild bundles server
- **Static Assets**: Client built to dist/public directory
- **Server**: Express serves both API and static assets
- **Database**: PostgreSQL via Neon Database connection

### Environment Configuration
- **NODE_ENV**: Controls development vs production behavior
- **DATABASE_URL**: PostgreSQL connection string
- **Replit Integration**: Special handling for Replit development environment

The application follows a modern full-stack TypeScript architecture with a focus on developer experience and visual programming capabilities. The block-based system allows non-programmers to create applications while generating clean, readable code.