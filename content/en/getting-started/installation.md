# Installation

This guide will walk you through installing Nucleify and its dependencies.

## Prerequisites

Before installing Nucleify, make sure you have:

- **Node.js** 20.x or higher
- **PHP** 8.2 or higher
- **Composer** 2.x
- **Git**

## Quick Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/szymcode/nucleify.git
cd nucleify
```

### Install PHP Dependencies

```bash
composer install
```

### Install Node Dependencies

```bash
npm install
```

### Environment Setup

Copy the environment file and configure your settings:

```bash
cp .env.example .env
php artisan key:generate
```

## Development Server

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Next Steps

Now that you have Nucleify installed, check out the [Quick Start](/docs/getting-started/quick-start) guide to create your first module.

