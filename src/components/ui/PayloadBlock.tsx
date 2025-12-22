import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface PayloadBlockProps {
    title?: string;
    content: string | string[];
    language?: string;
    className?: string;
    actions?: React.ReactNode;
}

export function PayloadBlock({ title, content, language = 'text-green-400', className = '', actions }: PayloadBlockProps) {
    const [copied, setCopied] = useState(false);

    // Normalize content to string for display and copy
    const textContent = Array.isArray(content) ? content.join('\n') : content;

    // Determine the number of lines to adjust height or styling if needed
    const isMultiLine = Array.isArray(content) && content.length > 1;

    const handleCopy = () => {
        navigator.clipboard.writeText(textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`group relative ${className}`}>
            {title && (
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center justify-between">
                    <span>{title}</span>
                </div>
            )}

            <div className="relative">
                <pre className="bg-black border border-white/10 rounded-lg p-4 text-sm font-mono font-light overflow-x-auto">
                    {textContent.split('\n').map((line, i) => {
                        // Check if line is a comment (starts with #)
                        if (line.trim().startsWith('#')) {
                            return (
                                <span key={i} className="block text-yellow-400 font-bold border-l-2 border-yellow-400/50 pl-2 mb-1 mt-2 first:mt-0 opacity-90">
                                    {line}
                                </span>
                            );
                        }
                        // Empty lines - reduced spacing
                        if (!line.trim()) {
                            return <span key={i} className="block h-2"></span>;
                        }
                        // Normal code lines
                        return (
                            <span key={i} className={`block ${language} pl-2 hover:bg-white/5 transition-colors rounded whitespace-pre-wrap break-all`}>
                                {line}
                            </span>
                        );
                    })}
                </pre>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    {actions}
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                        className="bg-[#0d1117]/80 hover:bg-[#a2ff00]/10 hover:text-[#a2ff00] text-gray-500 border border-white/5 backdrop-blur-sm"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
