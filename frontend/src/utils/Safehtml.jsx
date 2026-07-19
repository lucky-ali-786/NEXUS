import React from 'react';
import DOMPurify from 'dompurify';

const SafeHTML = ({ htmlContent }) => {
  // 1. Sanitize the incoming HTML string
  // This removes <script> tags, onerror attributes, etc.
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  // 2. Render the safe HTML
  return (
    <div 
      className="rich-text-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
};

export default SafeHTML;