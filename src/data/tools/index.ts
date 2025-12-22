import type { Tool } from '../../types';
import { SERVICE_TOOLS } from './service';
import { HACKTOOLS_REGISTRY } from './components';

export * from './common';

// TOOLS is the complete tool registry used by search
// HACKTOOLS_REGISTRY contains all component-based tools
// SERVICE_TOOLS contains data-driven tools
export const TOOLS: Tool[] = [
    ...HACKTOOLS_REGISTRY,
    ...SERVICE_TOOLS,
];

