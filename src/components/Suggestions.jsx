import React from 'react';

function Suggestions({ suggestions, onSuggestionSelect }) {
  if (suggestions.length === 0) return null;

  return (
    <ul className="suggestions-list">
      <p style={{ display: "flex", justifyContent: "center" }}>Suggestions</p>
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          onClick={() => onSuggestionSelect(suggestion)}
          style={{ cursor: "pointer", padding: "5px", backgroundColor: "#f0f0f0", listStyleType: "none", borderBottom: "1px solid #ccc" }}
        >
          {suggestion.title}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;