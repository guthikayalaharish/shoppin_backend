import React from "react";

function Results({ data }) {
  return (
    <div>
      <h2>Crawled Results</h2>
      {Object.entries(data).map(([domain, urls]) => (
        <div key={domain}>
          <h3>{domain}</h3>
          <ul>
            {urls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Results;
