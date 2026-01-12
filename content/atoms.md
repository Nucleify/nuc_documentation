# Atoms

Atoms are the smallest, most fundamental building blocks in Nucleify's Atomic Design system.

## Available Atoms

Nucleify provides a comprehensive set of atomic components:

### Button

Interactive button component with multiple variants.

```vue
<ad-button label="Click me" />
<ad-button label="Primary" severity="primary" />
<ad-button label="Disabled" disabled />
```

### Input Text

Text input field for user data entry.

```vue
<ad-input-text v-model="value" placeholder="Enter text" />
```

### Checkbox

Boolean selection component.

```vue
<ad-checkbox v-model="checked" label="Accept terms" />
```

### Icon

Display icons from the icon library.

```vue
<ad-icon icon="pi pi-check" />
<ad-icon icon="pi pi-times" size="large" />
```

### Badge

Small status indicator.

```vue
<ad-badge value="5" />
<ad-badge value="New" severity="success" />
```

### Tag

Label for categorization.

```vue
<ad-tag value="Active" severity="success" />
<ad-tag value="Pending" severity="warning" />
```

### Skeleton

Loading placeholder component.

```vue
<ad-skeleton width="100%" height="2rem" />
```

## Styling Atoms

Each atom supports consistent styling through:

- CSS classes
- Severity variants
- Size modifiers
- Custom styles

```vue
<ad-button 
  label="Custom" 
  class="custom-button"
  :style="{ borderRadius: '2em' }"
/>
```

