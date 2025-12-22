# Tool Registry Structure

This folder contains tool definitions in two formats:

## Command Generators (Root Level)

Files at the root level define **command-generating tools** that output terminal commands:

- **`web.ts`** - Web pentesting commands (Subfinder, FFUF, httpx, etc.)
- **`windows.ts`** - Windows commands (AMSI bypass, Defender exclusions, etc.)
- **`service.ts`** - Service enumeration commands
- **`other.ts`** - Miscellaneous commands
- **`common.ts`** - Shared helper functions and argument definitions (not tool definitions)

**Example**: User fills form → Tool returns `subfinder -d example.com -silent`

---

## Interactive Components (`components/`)

The `components/` subfolder contains **interactive React component tools** with rich UIs:

- **`common.ts`** - Common tools (Reverse Shell Generator, MSFVenom Builder, CVE Research, Nmap Parser)
- **`web.ts`** - Web security tools (XSS, SQLi, SSTI, LFI/RFI, XXE)
- **`web-extra.ts`** - Additional web tools (NoSQLi, CSRF, JWT, SSRF, Web Shells, etc.)
- **`windows.ts`** - Windows tools (PowerShell, File Transfer, Obfuscation, Host Enumeration)
- **`linux.ts`** - Linux enumeration tools
- **`mobile.ts`** - Mobile security tools (Frida, ADB)

**Example**: User opens XSSTool → Sees dropdowns, payload lists, copy buttons, all interactive

---

## Main Export

**`index.ts`** - Combines both command generators and interactive components into a single `TOOLS` array for the application.

---

## Why Two Types?

This structure comes from merging multiple pentesting tool projects:
- **Command generators**: Quick, copy-paste workflows for terminal usage
- **Interactive components**: Complex tools with state, validation, and live preview

Both serve different use cases and are kept separate for clarity.
