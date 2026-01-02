import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SEOContentProps {
  title: string;
  content: string;
}

export default function SEOContent({ title, content }: SEOContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600 flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2">
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  );
}
