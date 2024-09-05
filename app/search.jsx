"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Search({ initialResults }) {
  const router = useRouter();
  const { query } = router.query;
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [results, setResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(
            `http://localhost:3000/items/search?query=${query}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch search results");
          }
          const data = await res.json();
          if (data.length === 0) {
            setError("No products found.");
            setResults([]);
          } else {
            setResults(data);
          }
        } catch (err) {
          setError(err.message || "An error occurred. Please try again later.");
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/",
      query: { query: searchQuery },
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a mobile phone..."
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}
      <ul className="space-y-2">
        {results.length > 0 &&
          results.map((item) => (
            <li key={item.id} className="text-lg bg-gray-100 p-2 rounded">
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
