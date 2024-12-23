import React, { useState } from "react";

function App() {
    const [domains, setDomains] = useState("");
    const [results, setResults] = useState(null);

    const handleCrawl = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/crawl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ domains: domains.split(",").map((d) => d.trim()) }),
            });
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching crawl results:", error);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 >Product URL Crawler</h1>
            <textarea
                placeholder="Enter the domains you want to..."
                rows={4}
                cols={50}
                value={domains}
                onChange={(e) => setDomains(e.target.value)}
            ></textarea>
            <br />
            <button  onClick={handleCrawl}>Crawl</button>
            <div style={{ marginTop: "20px" }}>
                {results && (
                    <div>
                        <h2>Results:</h2>
                        <pre>{JSON.stringify(results, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
