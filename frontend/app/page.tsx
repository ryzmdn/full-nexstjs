import { Dashboard } from "./components/dashboard";

interface Response {
  status: string;
  message: string;
  timestamp: string;
}

async function getBackendStatus(): Promise<{
  data: Response | null;
  error: string | null;
}> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    const response = await fetch(`${apiUrl}/health/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        data: null,
        error: `Failed to fetch: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error:
        err instanceof Error ? err.message : "Failed to connect to backend",
    };
  }
}

export default async function Home() {
  const { data: health, error } = await getBackendStatus();

  return <Dashboard initialHealth={health} initialError={error} />;
}
