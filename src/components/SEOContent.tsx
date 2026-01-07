import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SEOContentProps {
  title: string;
  content: string;
}

export default function SEOContent({ title, content }: SEOContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-black via-neutral-950 to-black border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        aria-expanded={isExpanded}
      >
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2">
          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed [&>p]:text-gray-300 [&>p>strong]:text-white [&>ul>li]:text-gray-300 [&>ol>li]:text-gray-300 [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>h4]:text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  );
}
