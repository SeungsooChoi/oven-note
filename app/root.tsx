import {
  Form,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { supabase } from "./utils/supabase.server";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


// 로그인 상태 로드
export async function loader({ request }: LoaderFunctionArgs) {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user || null }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* 헤더 (흰색) */}
        <header className="w-full p-6 bg-white text-black flex justify-between items-center border-b border-gray-300">
          <h1 className="text-2xl font-bold">🍰 My Recipe</h1>
          <nav>
            <a href="/" className="text-gray-600 hover:text-black px-4">Home</a>
            <a href="/recipes" className="text-gray-600 hover:text-black px-4">Recipes</a>
            <a href="/upload" className="text-gray-600 hover:text-black px-4">Upload</a>
            {user ? (
              <Form method="post" action="/logout" className="inline-block">
                <button type="submit" className="text-gray-600 hover:text-black px-4">로그아웃</button>
              </Form>
            ) : (
              <>
                <a href="/login" className="text-gray-600 hover:text-black px-4">로그인</a>
                <a href="/signup" className="text-gray-600 hover:text-black px-4">회원가입</a>
              </>
            )}
          </nav>
        </header>

        {/* 메인 영역 (흰색) */}
        <main className="flex-1 bg-white">
          <Outlet />
        </main>

        {/* 푸터 (흰색) */}
        <footer className="w-full p-10 bg-white text-gray-600 border-t border-gray-300 text-sm">
          <div className="max-w-5xl mx-auto flex justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">My Recipe</h2>
              <p>© 2025 My Recipe. All rights reserved.</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Links</h2>
              <a href="/" className="block hover:text-black">Home</a>
              <a href="/recipes" className="block hover:text-black">Recipes</a>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Subscribe</h2>
              <input type="email" placeholder="you@example.com" className="p-2 border rounded-md w-48 mt-2" />
            </div>
          </div>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
