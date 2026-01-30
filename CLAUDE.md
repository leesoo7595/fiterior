# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fiterior is a React Native mobile application built with Expo and TypeScript, targeting iOS, Android, and Web platforms.

## Development Commands

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run web version
```

## Tech Stack

- **Framework**: Expo 54 with React Native 0.81
- **Language**: TypeScript (strict mode)
- **React**: Version 19 with New Architecture enabled
- **Platforms**: iOS, Android, Web

## Architecture

This is currently a starter project with minimal structure:
- `App.tsx` - Main application component
- `index.ts` - Entry point that registers the root component
- `assets/` - App icons and splash images
- `app.json` - Expo configuration (app name, icons, platform settings)
