import { Suspense } from "react";
import Search from "./Search.jsx";

async function fetchItems() {
  const res = await fetch("http://localhost:3000/items");
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json();
}

export default async function Home() {
  const initialResults = await fetchItems();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Mobile Phone Search
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <Search initialResults={initialResults} />
        </Suspense>
      </div>
    </div>
  );
}
