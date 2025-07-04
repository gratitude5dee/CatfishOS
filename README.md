***

# CatfishOS

<div align="center">
  <img src="https://raw.githubusercontent.com/user-attachments/assets/13175865-c840-41da-a711-2e2124d7759d" alt="CatfishOS Logo" width="150">
  <h1>CatfishOS</h1>
  <p><strong>A feature-rich, open-source Tinder-clone built with React, TypeScript, Vite, and Supabase.</strong></p>
  <p>A perfect starting point for your next-generation social engineering or psuedo-dating application, complete with real-time chat, profile swiping, and a beautiful, customizable UI. Built for the US Navy and the Ukranian Army during the National Defense Hackathon. </p>
</div>

<p align="center">
  <!-- Placeholder for actual repo path -->
  <a href="https://github.com/your-username/CatfishOS-main/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="License"></a>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

<!-- 
<p align="center">
  <img src="<URL_TO_YOUR_APP_SCREENSHOT_OR_GIF>" alt="CatfishOS Demo">
</p>
-->

## ✨ Features

-   **🚀 Modern Tech Stack:** Built with **React**, **TypeScript**, and **Vite + SWC** for a fast, type-safe, and enjoyable developer experience.
-   **🔥 Real-time Backend:** Powered by **Supabase** for database, authentication, and real-time chat functionality via PostgreSQL subscriptions.
-   **📱 Tinder-like Swiping:** A fluid and interactive card-swiping interface using **Framer Motion**.
-   **💬 Real-time Messaging:** A complete chat interface that updates instantly when new messages arrive.
-   **💅 Beautiful & Customizable UI:** A gorgeous, ready-to-use component library from **shadcn/ui** and **Tailwind CSS**.
-   **⚡ Optimized Data Fetching:** Uses **TanStack Query (React Query)** for efficient caching, optimistic updates, and data synchronization.
-   **🧩 Well-structured Codebase:** Logically organized into pages, reusable components, and Supabase integrations, making it easy to understand and extend.
-   **🔒 Secure & Type-Safe:** Fully typed from the database schema to the UI components.

## 🛠️ Tech Stack

-   **Framework:** [React 18](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/) with [SWC](https://swc.rs/)
-   **Backend:** [Supabase](https://supabase.com/) (Database, Auth, Real-time)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## ✅ Prerequisites

Before you start, make sure you have the following:

-   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
-   A package manager like `npm`, `yarn`, or `bun`
-   A free [Supabase account](https://supabase.com/dashboard)

## 🚀 Quick Start & Installation

Get the project up and running on your local machine in just a few steps.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CatfishOS-main.git
cd CatfishOS-main
```

### 2. Install Dependencies

Choose your favorite package manager and install the project dependencies.

```bash
# Using npm
npm install

# Using Yarn
yarn install

# Using Bun
bun install
```

### 3. Set Up Your Supabase Backend

This project requires a Supabase project to handle the backend.

1.  **Create a Supabase Project:**
    -   Go to the [Supabase Dashboard](https://supabase.com/dashboard).
    -   Click "New project" and give it a name (e.g., `catfish-os`).
    -   Save your **Database Password** securely.
    -   Wait for the project to be created.

2.  **Get Supabase Credentials:**
    -   Navigate to your project's dashboard.
    -   Go to **Project Settings** (the gear icon in the left sidebar).
    -   Click on the **API** tab.
    -   You will find your **Project URL** and your `anon` **public** key.

3.  **Create Environment Variables File:**
    -   In the root of your cloned repository, create a file named `.env.local`.
    -   Copy the content below into the file and replace the placeholders with your Supabase credentials.

    **.env.local**
    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    > **Note:** The `VITE_` prefix is required by Vite to expose these variables to your frontend code.

4.  **Set Up the Database Schema:**
    -   In your Supabase project dashboard, navigate to the **SQL Editor**.
    -   Click **+ New query**.
    -   Copy the entire SQL script below, paste it into the editor, and click **RUN**.

    ```sql
    -- Create the profiles table
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      name TEXT NOT NULL,
      age INT NOT NULL,
      bio TEXT,
      distance TEXT NOT NULL,
      education TEXT,
      gender TEXT,
      height TEXT,
      is_verified BOOLEAN DEFAULT false,
      location TEXT NOT NULL,
      looking_for TEXT,
      occupation TEXT,
      photos TEXT[],
      tags TEXT[]
    );
    
    -- Create the chats table
    CREATE TABLE public.chats (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      profile_id_1 UUID REFERENCES public.profiles(id),
      profile_id_2 UUID REFERENCES public.profiles(id),
      -- Ensure a chat between two users is unique
      CONSTRAINT unique_chat UNIQUE (profile_id_1, profile_id_2)
    );

    -- Create the messages table
    CREATE TABLE public.messages (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      chat_id UUID REFERENCES public.chats(id),
      sender_id UUID REFERENCES public.profiles(id),
      content TEXT NOT NULL
    );

    -- Enable Row Level Security (RLS) for all tables
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
    
    -- Note: You will need to create RLS policies to allow users to access their own data.
    -- Example for profiles (allows anyone to view profiles):
    -- CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);
    ```

### 4. Run the Development Server

You're all set! Start the development server:

```bash
npm run dev
```

The application will now be running on `http://localhost:8080`.

## ⚙️ Configuration

The primary configuration is done through environment variables.

-   `VITE_SUPABASE_URL`: The URL for your Supabase project API.
-   `VITE_SUPABASE_ANON_KEY`: The public anonymous key for your Supabase project.

These are stored in the `.env.local` file, which is ignored by Git to keep your credentials safe.

## 🧪 Testing

This project is not yet configured with a testing framework. Adding tests is a fantastic way to contribute! We recommend:

-   [**Vitest**](https://vitest.dev/): For unit and integration testing.
-   [**React Testing Library**](https://testing-library.com/docs/react-testing-library/intro/): For component testing.
-   [**Playwright**](https://playwright.dev/) or [**Cypress**](https://www.cypress.io/): For end-to-end testing.

## 🚀 Deployment

This Vite application can be deployed to any static hosting provider.

### Recommended Providers:

-   [Vercel](https://vercel.com)
-   [Netlify](https://www.netlify.com)
-   [Cloudflare Pages](https://pages.cloudflare.com)

### General Steps:

1.  Push your code to a Git provider (GitHub, GitLab, etc.).
2.  Import your repository into your chosen hosting provider.
3.  Configure the build settings:
    -   **Build Command:** `npm run build` (or `yarn build`)
    -   **Output Directory:** `dist`
4.  **Crucially, add your environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)** in the project settings on your hosting provider's dashboard.

## 🤝 Contributing

Contributions are welcome! Whether you want to fix a bug, add a feature, or improve the documentation, please feel free to open an issue or a pull request.

1.  **Fork** the repository.
2.  **Create a new branch:** `git checkout -b feature/my-new-feature`.
3.  **Make your changes** and commit them with a clear message.
4.  **Push** to your branch.
5.  **Open a Pull Request**.

## 📜 License

This project is distributed under the MIT License. See the `LICENSE` file for more information. (Note: A `LICENSE` file should be added to the repository).

## 🙏 Acknowledgments

-   **Supabase** for providing an incredible open-source backend solution.
-   **shadcn** for the fantastic `shadcn/ui` component library.
-   The **Vite** and **React** teams for building amazing tools for web development.
-   The **Lovable.dev** team, who likely generated the initial boilerplate for this project.
