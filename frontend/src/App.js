import React, { useState } from "react";

function App() {
    const [domains, setDomains] = useState(""); // State for storing user input
    const [results, setResults] = useState(null); // State for storing API results

    // Function to handle the crawl button click
    const handleCrawl = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/crawl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    domains: domains.split(",").map((d) => d.trim()), // Split input by commas and trim whitespace
                }),
            });

            const data = await response.json(); // Parse JSON response
            setResults(data); // Set results in state
        } catch (error) {
            console.error("Error fetching crawl results:", error); // Log errors
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Product URL Crawler</h1>

            {/* Textarea for domain input */}
            <textarea
                placeholder="Enter domains separated by commas"
                rows={4}
                cols={50}
                value={domains}
                onChange={(e) => setDomains(e.target.value)} // Update state on input change
            ></textarea>
            <br />

            {/* Button to trigger the API request */}
            <button onClick={handleCrawl}>Crawl</button>

            {/* Display results */}
            <div style={{ marginTop: "20px" }}>
                {results && (
                    <div>
                        <h2>Results:</h2>
                        <pre>{JSON.stringify(results, null, 2)}</pre> {/* Format JSON */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
