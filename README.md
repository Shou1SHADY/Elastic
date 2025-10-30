# Elastic - Custom Manufacturing Web Application

This is a modern, responsive, and animated web application for "Elastic," a B2B company specializing in custom rubber keychains and patches. The application is built with Next.js and features a rich, interactive user experience, internationalization support (English and Arabic), and integrated AI capabilities for content generation and customer interaction.

## ✨ Features

- **Modern & Responsive Design**: A sleek and professional UI built with Tailwind CSS and ShadCN UI components, ensuring a great experience on all devices.
- **Advanced Animations**: Smooth, interactive animations powered by GSAP and ScrollTrigger, creating an engaging user journey.
- **Internationalization (i18n)**: Full support for English and Arabic, with language detection and easy switching.
- **AI-Powered Features**:
    - **Automatic Inquiry Responses**: Generates draft email responses to customer inquiries submitted through the contact form.
    - **Product Description Generation**: AI-driven tool to create unique and engaging product descriptions.
    - **Content Translation**: Seamlessly translates contact form content between English and Arabic.
- **Interactive Process Visualization**: A dynamic timeline on the "Process" page that visualizes the production journey, complete with a scroll-based progress bar.
- **Component-Based Architecture**: Built with reusable React components for maintainability and scalability.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (or your preferred package manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/elastic-app.git
    cd elastic-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Genkit/Google AI API keys.
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### Running the Development Server

To start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## 🔧 Available Scripts

-   `npm run dev`: Starts the Next.js development server.
-   `npm run build`: Creates an optimized production build of the application.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
-   `npm run genkit:dev`: Starts the Genkit development server for testing AI flows.

## 📂 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── [lang]/             # Internationalized routes (en, ar)
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── portfolio/
│   │   │   └── process/
│   │   ├── globals.css         # Global styles and Tailwind directives
│   │   └── layout.tsx          # Root layout
│   ├── ai/                     # Genkit AI integration
│   │   ├── flows/              # AI-powered flows (e.g., translation, response generation)
│   │   └── genkit.ts           # Genkit configuration
│   ├── components/             # Reusable React components
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Page sections (Hero, About, etc.)
│   │   ├── shared/             # Shared components (Logo, etc.)
│   │   └── ui/                 # ShadCN UI components
│   ├── data/                   # Static data (e.g., product information)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and libraries
│   └── middleware.ts           # Next.js middleware for internationalization
├── public/                     # Static assets
└── tailwind.config.ts          # Tailwind CSS configuration
```

## 🌍 Internationalization (i18n)

The application supports English (`en`) and Arabic (`ar`).
- **Routing**: The `middleware.ts` file handles locale detection based on browser preferences and prefixes the URL path with the appropriate language code (e.g., `/en/about` or `/ar/about`).
- **Content**: Page and component content is stored in translation objects and rendered based on the current locale.
- **Directionality**: The `dir` attribute (`ltr` or `rtl`) is set on the `<html>` element to ensure correct layout for each language.

## 🤖 AI Integration with Genkit

The application leverages Genkit to integrate with Google's generative AI models.
- **Location**: All AI-related code is located in the `src/ai/` directory.
- **Flows**: Genkit `flows` are defined in `src/ai/flows/` to handle specific tasks like generating text, translating content, and creating draft responses. These server-side functions are called directly from client components.

## 🎬 Animations with GSAP

GSAP is used for creating high-performance animations.
- **ScrollTrigger**: Most animations are triggered on scroll to create an engaging, interactive experience as the user navigates the page.
- **Responsive Animations**: GSAP's `matchMedia` is used to apply different animations for desktop and mobile, ensuring optimal performance and aesthetics on all devices.
- **Component-Scoped Animations**: Animations are defined within the components they affect, using `useEffect` and `useRef` hooks for proper setup and cleanup.
