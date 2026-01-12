# Configuration

Learn how to configure your Nucleify application.

## Environment Variables

Nucleify uses `.env` files for configuration:

```env
APP_NAME=Nucleify
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

NUXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Nuxt Configuration

The `nuxt.config.ts` file controls frontend settings:

```typescript
export default defineNuxtConfig({
  srcDir: 'nuxt',
  alias: {
    atomic: '~/atomic',
  },
  components: [
    { path: '~/atomic/atom', prefix: 'ad' },
    { path: '~/atomic/molecule', prefix: 'ad' },
    { path: '~/atomic/organism', prefix: 'ad' },
  ],
})
```

## Module Configuration

Each module has its own `config.json`:

```json
{
  "name": "nuc_module_name",
  "description": "Module description",
  "version": "0.0.1",
  "category": "core",
  "installed": true,
  "enabled": true
}
```

## Laravel Configuration

Laravel configuration files are in the `config/` directory:

- `app.php` - Application settings
- `database.php` - Database connections
- `modules.php` - Module loading settings

## Customization

### Colors

Customize colors in SCSS variables:

```scss
$primary-color: #6366f1;
$secondary-color: #8b5cf6;
```

### Typography

Font settings are in the Nuxt config:

```typescript
googleFonts: {
  families: {
    'Space+Grotesk': [400, 500, 600, 700],
  },
}
```

