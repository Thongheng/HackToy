import React from 'react';
import type { Tool, GlobalInputs } from '../../types';
import { Settings as SettingsIcon } from 'lucide-react';
import { PayloadBlock } from '../ui';
import { ToolHeader } from '../ui/ToolHeader';

interface ToolRendererProps {
    tool: Tool;
    inputs: GlobalInputs;
    toolArgs: Record<string, any>;
    updateArg: (key: string, value: any) => void;
    handleCopy: (text: string) => void;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({
    tool,
    inputs,
    toolArgs,
    updateArg,
}) => {

    // If tool has a custom component, render it directly
    if (tool.component) {
        const Component = tool.component;
        return <Component />;
    }

    const generatedCommand = tool.generate(inputs, toolArgs);
    const hasConfiguration = tool.args && tool.args.length > 0;

    return (
        <div className="animate-fade-in">
            {/* Standardized Header */}
            <ToolHeader
                title={tool.name}
                description={tool.desc}
            />

            {/* Configuration Panel */}
            {hasConfiguration && (
                <div className="htb-card mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 tracking-widest mb-4">
                        <SettingsIcon size={14} />
                        Configuration
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {tool.args?.map((arg) => {
                            if (arg.type === 'toggle') {
                                return (
                                    <label key={arg.key} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={!!toolArgs[arg.key]}
                                                onChange={(e) => updateArg(arg.key, e.target.checked)}
                                            />
                                            <div className={`w-10 h-6 rounded-full transition-colors ${toolArgs[arg.key] ? 'bg-htb-green' : 'bg-[#0d1117] border border-white/10'
                                                }`} />
                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${toolArgs[arg.key] ? 'translate-x-4' : ''
                                                }`} />
                                        </div>
                                        <span className="text-sm text-gray-300">{arg.label}</span>
                                    </label>
                                );
                            }
                            if (arg.type === 'text') {
                                return (
                                    <div key={arg.key} className="flex flex-col min-w-[150px]">
                                        <label className="text-xs font-bold uppercase text-gray-500 mb-1">{arg.label}</label>
                                        <input
                                            type="text"
                                            value={toolArgs[arg.key] || ''}
                                            onChange={(e) => updateArg(arg.key, e.target.value)}
                                            placeholder={arg.placeholder}
                                            className="htb-input"
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}

            {/* Command Output */}
            <PayloadBlock content={generatedCommand} />
        </div>
    );
};

export default ToolRenderer;
