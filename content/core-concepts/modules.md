# Modules

Modules are the core organizational unit in Nucleify. They encapsulate related functionality into reusable, self-contained packages.

## Module Anatomy

Each module consists of:

### Configuration (`config.json`)

```json
{
  "name": "nuc_example",
  "description": "Example module description",
  "version": "0.0.1",
  "category": "core",
  "installed": true,
  "enabled": true
}
```

### PHP Entry Point (`nuc_example.php`)

The Laravel service provider for your module:

```php
<?php

namespace Modules\nuc_example;

use Illuminate\Support\ServiceProvider;

class nuc_example extends ServiceProvider
{
    public function boot(): void
    {
        // Register migrations, routes, etc.
    }
}
```

### TypeScript Entry Point (`nuc_example.ts`)

Register Vue components globally:

```typescript
import type { App } from 'vue'

export function registerNucExample(app: App<Element>): void {
  // Register components
}
```

## Module Categories

Nucleify organizes modules into categories:

- **Core** - Essential framework functionality
- **Feature** - Application features
- **Utility** - Helper modules

## Creating a New Module

1. Create the module folder in `modules/`
2. Add the required files (`config.json`, entry points)
3. Register the module in the application

## Best Practices

- Follow the naming convention: `nuc_modulename`
- Keep related functionality together
- Export everything through `index.ts`
- Write comprehensive tests

