# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains Matt Godbolt's presentation materials about BBC Micro emulation and related topics. It includes multiple presentation versions for different conferences and events, all based on reveal.js HTML presentation framework.

## Repository Structure

The repository is organized into presentation directories:

- `cppcon2017/`, `cppcon2025/` - CppCon conference presentations
- `goto/`, `nng/`, `aq/`, `spacex/` - Various other conference/venue versions
- `abug2020/`, `avast/`, `demosplash2017/` - Additional presentation versions
- `drw/` the original presentation
- `reveal.js/` - Framework and tooling directories

Each presentation directory typically contains:
- `index.html` - Main presentation file with reveal.js configuration
- Slide content (HTML or Markdown files)
- Images and assets
- `reveal.js` and related framework files

## Development Commands

For presentations with package.json (like `cppcon2025/`):

```bash
npm start          # Start development server
npm run build      # Build production version  
npm run preview    # Preview production build
npm run format     # Format code with Prettier (where available)
```

For older presentations, open `index.html` directly in a browser.

## Technical Architecture

**Framework**: reveal.js for HTML-based presentations
**Build Tool**: Vite (in newer presentations) for development and building
**Content**: Mix of HTML and Markdown for slide content
**Assets**: Images, CSS, and JavaScript for presentation styling

## Working with Presentations

### Modern Presentations (cppcon2025/)
- Uses Vite with hot-reloading for Markdown changes
- Structured with separate content files
- Has proper package.json with development scripts

### Legacy Presentations
- Self-contained HTML files with embedded content
- Direct reveal.js integration without build tools
- Manual refresh required for changes

## Key Files to Understand

- `index.html` - Always the main presentation entry point
- `package.json` - Build scripts and dependencies (newer presentations)
- `vite.config.js` - Vite configuration with Markdown hot-reload
- Slide content files (varies by presentation)

## Content Guidelines

- Presentations focus on BBC Micro emulation, 6502 processor architecture, and related computing history
- Technical content includes assembly language examples and processor diagrams
- Visual style consistent with retro computing aesthetic