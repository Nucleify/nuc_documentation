# Atomic Design

Nucleify implements Atomic Design methodology to create consistent, reusable UI components.

## What is Atomic Design?

Atomic Design is a methodology for creating design systems. It breaks down interfaces into fundamental building blocks:

## Hierarchy

### Bosons (Foundation)

The invisible building blocks - types, utilities, constants:

```typescript
// Types
export interface ButtonInterface {
  label: string
  variant?: 'primary' | 'secondary'
}

// Utils
export function formatDate(date: Date): string {
  return date.toLocaleDateString()
}
```

### Atoms

The smallest visual components:

- Buttons
- Inputs
- Labels
- Icons

```vue
<template>
  <button :class="$style['ad-button']">
    <slot />
  </button>
</template>
```

### Molecules

Combinations of atoms:

- Form fields (label + input)
- Cards with actions
- Navigation items

### Organisms

Complex, reusable UI sections:

- Data tables
- Navigation bars
- Dialogs

### Templates

Page-level layouts that arrange organisms.

### Pages

Specific instances of templates with real content.

## Component Naming

All atomic components use the `ad-` prefix:

- `<ad-button>` - Atom
- `<ad-float-label>` - Molecule
- `<ad-data-table>` - Organism

## Styling

Components use CSS Modules with SCSS:

```scss
.ad-button {
  background: var(--primary-color);
  border-radius: 0.5em;
  padding: 0.75em 1.5em;
}
```

