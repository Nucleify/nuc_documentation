# Quick Start

Get up and running with Nucleify in minutes.

## Your First Module

Modules are the building blocks of Nucleify applications. Each module is a self-contained unit that can include:

- Vue components
- PHP controllers and models
- API routes
- Tests
- Styles

## Module Structure

A typical module looks like this:

```
modules/
└── nuc_example/
    ├── app/
    │   ├── Http/Controllers/
    │   ├── Models/
    │   └── Services/
    ├── atomic/
    │   ├── bosons/
    │   ├── pages/
    │   └── templates/
    ├── config.json
    ├── index.ts
    ├── nuc_example.php
    └── nuc_example.ts
```

## Creating Components

Nucleify uses Atomic Design methodology:

### Atoms
The smallest building blocks - buttons, inputs, labels.

### Molecules
Simple combinations of atoms - form fields, cards.

### Organisms
Complex UI components - navigation, data tables.

## Best Practices

1. **Keep modules focused** - Each module should do one thing well
2. **Use TypeScript** - Type safety prevents runtime errors
3. **Follow conventions** - Consistent naming makes code readable
4. **Write tests** - Ensure your modules work as expected

## Next Steps

Learn more about [Modules](/docs/core-concepts/modules) and how to organize your application.

