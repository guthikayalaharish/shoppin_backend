import React, { useState } from "react";

function DomainInput({ onResults }) {
  const [domains, setDomains] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domains: domains.split(",").map(d => d.trim()) }),
      });

      if (!response.ok) throw new Error("Failed to fetch results");

      const data = await response.json();
      onResults(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch results");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder="Enter domains separated by commas"
        />
        <button type="submit">Crawl</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default DomainInput;
