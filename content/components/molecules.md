# Molecules

Molecules are combinations of atoms that form simple, functional components.

## Available Molecules

### Float Label

Combines an input with an animated floating label.

```html
<ad-float-label>
  <ad-input-text id="email" v-model="email" />
  <label for="email">Email</label>
</ad-float-label>
```

### Anchor

Enhanced link component with icon support.

```html
<ad-anchor 
  href="/dashboard" 
  label="Dashboard"
  icon="pi pi-home"
/>
```

### Tile

Card-like container for content grouping.

```html
<ad-tile>
  <template #header>Title</template>
  <template #content>Content goes here</template>
</ad-tile>
```

## Creating Molecules

Molecules combine atoms to create reusable patterns:

```html
<template>
  <div class="form-field">
    <ad-label :for="id">{{ label }}</ad-label>
    <ad-input-text :id="id" v-model="modelValue" />
    <ad-paragraph v-if="error" class="error">{{ error }}</ad-paragraph>
  </div>
</template>

<script setup lang="ts">
interface FormFieldProps {
  id: string
  label: string
  modelValue: string
  error?: string
}

const props = defineProps<FormFieldProps>()
const emit = defineEmits(['update:modelValue'])
</script>
```

## Best Practices

1. **Keep molecules simple** - They should do one thing well
2. **Compose from atoms** - Don't duplicate atom functionality
3. **Use props for customization** - Make molecules flexible
4. **Emit events** - Let parents handle side effects

