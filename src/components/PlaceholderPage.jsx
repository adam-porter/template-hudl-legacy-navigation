import React from 'react';

const PlaceholderPage = ({ teamName, navItemLabel }) => {
  return (
    <main className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-context">
          <h1 className="placeholder-page-title">{navItemLabel}</h1>
          <p className="placeholder-team-role">{teamName}</p>
        </div>
        <div className="placeholder-text">[ Page Intentionally Left Blank ]</div>
      </div>
    </main>
  );
};

export default PlaceholderPage;
