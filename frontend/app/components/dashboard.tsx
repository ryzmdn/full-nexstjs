"use client";

import { useState } from "react";

interface Response {
  status: string;
  message: string;
  timestamp: string;
}

interface Props {
  initialHealth: Response | null;
  initialError: string | null;
}

export function Dashboard({
  initialHealth,
  initialError,
}: Readonly<Props>) {
  const [health, setHealth] = useState<Response | null>(initialHealth);
  const [error, setError] = useState<string | null>(initialError);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
      const response = await fetch(`${apiUrl}/health/status`);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      setHealth(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to connect to backend",
      );
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-12 px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            NestJS + Next.js Integration
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Full-stack boilerplate app by <a href="https://github.com/ryzmdn" target="_blank" rel="noopener noreferrer" className="font-semibold">Ryzmdn</a>
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Backend API Status
            </h2>

            {loading && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                Checking backend...
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Connection Error
                </p>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  Make sure the backend is running on <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="font-medium underline">http://localhost:3001</a>
                </p>
              </div>
            )}

            {health && !error && (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Backend is running
                  </p>
                </div>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div>
                    <dt className="font-medium text-green-900 dark:text-green-100">
                      Status:
                    </dt>
                    <dd className="text-green-700 dark:text-green-300">
                      {health.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-green-900 dark:text-green-100">
                      Message:
                    </dt>
                    <dd className="text-green-700 dark:text-green-300">
                      {health.message}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-green-900 dark:text-green-100">
                      Timestamp:
                    </dt>
                    <dd className="text-green-700 dark:text-green-300">
                      {new Date(health.timestamp).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Getting Started
            </h2>
            <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  1
                </span>
                <span>
                  Backend runs on{" "}
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-700">
                    http://localhost:3001/api/v1
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  2
                </span>
                <span>
                  Frontend runs on{" "}
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-700">
                    http://localhost:3000
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  3
                </span>
                <span>
                  Use API utilities from{" "}
                  <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-700">
                    lib/api.ts
                  </code>{" "}
                  to call the backend
                </span>
              </li>
            </ol>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              API Usage Example
            </h2>
            <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100 dark:bg-gray-950">
              {`import { apiGet, apiPost } from '@/lib/api';

// GET request
const data = await apiGet('/endpoint');

// POST request
const response = await apiPost('/endpoint', {
  key: 'value'
});`}
            </pre>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-blue-500"
        >
          {loading ? "Refreshing..." : "Refresh Status"}
        </button>
      </main>
    </div>
  );
}
