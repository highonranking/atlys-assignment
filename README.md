# foo-rum - Social Feed Application

A modern, responsive social feed application built with React, TypeScript, and Tailwind CSS. This project was created as part of the Atlys Frontend Hiring Assignment.

![foo-rum](./Screenshot%202025-11-25%20at%207.24.13%20PM.png)

## 🚀 Live Demo

- **Live URL**: [Deploy and add link here]
- **GitHub Repository**: [Add repository link here]

## ✨ Features

### Core Functionality
- **Authentication System**
  - Sign In / Sign Up pages with form validation
  - Modal-based authentication for unauthenticated users
  - Persistent sessions using localStorage
  - Pre-configured test accounts
  
- **Feed Page**
  - Create and publish new posts
  - Rich text editor toolbar (formatting options show alerts as per requirements)
  - View all posts in a clean, scrollable feed
  - Post interaction buttons (like, comment, share - show alerts as per requirements)
  
- **User Experience**
  - Smooth animations and transitions throughout
  - Responsive design that works on all devices
  - Keyboard accessibility (ESC to close modals)
  - Clean, modern UI matching the Figma design

### Technical Highlights
- ✅ **TypeScript** for type safety and better developer experience
- ✅ **React Context API** for state management
- ✅ **React Router** for navigation
- ✅ **TailwindCSS** for styling (minimal external dependencies)
- ✅ **Custom animations** with CSS keyframes
- ✅ **Component-based architecture** for maintainability

## 🛠️ Technology Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.5 (Rolldown)
- **Styling**: TailwindCSS 3.4.17
- **Routing**: React Router DOM 7.1.1

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone [repository-url]
   cd atlys-assignment
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to \`http://localhost:5173\`

## 🧪 Test Accounts

Use these pre-configured accounts to test the application:

| Email | Password |
|-------|----------|
| demo@example.com | password123 |
| test@user.com | testpass |

You can also create your own account using the Sign Up page!

## 📁 Project Structure

\`\`\`
atlys-assignment/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Modal.tsx       # Modal wrapper component
│   │   ├── Post.tsx        # Individual post card
│   │   └── PostEditor.tsx  # Post creation editor
│   ├── context/            # React Context providers
│   │   └── AuthContext.tsx # Authentication state management
│   ├── pages/              # Page components
│   │   ├── Feed.tsx        # Main feed page
│   │   ├── SignIn.tsx      # Sign in page
│   │   └── SignUp.tsx      # Sign up page
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind
├── public/                 # Static assets
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
\`\`\`

## 🚀 Build & Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

### Deploy to Vercel
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Deploy to Netlify
\`\`\`bash
npm i -g netlify-cli
netlify deploy
\`\`\`

## 📝 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## 🎯 Features Implementation

### Implemented ✅
- [x] Feed page as landing page
- [x] Sign In page with validation
- [x] Sign Up page with validation
- [x] Modal authentication for unauthenticated users
- [x] Post creation with input field and publish button
- [x] New posts appear in feed
- [x] Alert for unimplemented features (toolbar buttons, interactions)
- [x] TypeScript throughout
- [x] Smooth animations and transitions
- [x] Responsive design
- [x] No external UI libraries
- [x] Test accounts configured

## 🤔 What Was Fun/Challenging

### Fun
- Implementing smooth animations and micro-interactions
- Creating a clean, reusable component architecture
- Matching the design pixel-perfectly
- Building the rich text editor toolbar UI

### Challenging
- Getting the exact spacing and typography to match the design
- Implementing proper TypeScript types for all components
- Creating performant animations without libraries
- Managing authentication flow with modals and routing

## 📄 License

This project was created for the Atlys Frontend Hiring Assignment.

---

**Note**: This project demonstrates frontend development skills including React, TypeScript, state management, component design, and attention to detail. No backend or API implementation was required as per the assignment guidelines.
