# Atoms

Atoms are the smallest, most fundamental building blocks in Nucleify's Atomic Design system.

## Available Atoms

Nucleify provides a comprehensive set of atomic components:

### Button

Interactive button component with multiple variants.

```html
<ad-button label="Click me" />
<ad-button label="Primary" severity="primary" />
<ad-button label="Disabled" disabled />
```

### Input Text

Text input field for user data entry.

```html
<ad-input-text v-model="value" placeholder="Enter text" />
```

### Checkbox

Boolean selection component.

```html
<ad-checkbox v-model="checked" label="Accept terms" />
```

### Icon

Display icons from the icon library.

```html
<ad-icon icon="pi pi-check" />
<ad-icon icon="pi pi-times" size="large" />
```

### Badge

Small status indicator.

```html
<ad-badge value="5" />
<ad-badge value="New" severity="success" />
```

### Tag

Label for categorization.

```html
<ad-tag value="Active" severity="success" />
<ad-tag value="Pending" severity="warning" />
```

### Skeleton

Loading placeholder component.

```html
<ad-skeleton width="100%" height="2rem" />
```

## Styling Atoms

Each atom supports consistent styling through:

- CSS classes
- Severity variants
- Size modifiers
- Custom styles

```html
<ad-button 
  label="Custom" 
  class="custom-button"
  :style="{ borderRadius: '2em' }"
/>
```

