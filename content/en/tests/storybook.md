# Storybook

Storybook is used for developing and documenting UI components in isolation.

---

## Access

Available at `http://localhost:6006` after starting Nuxt with `make dev`.

---

## Structure

Stories are placed alongside components:

```
nuxt/atomic/atom/button/
├── index.vue             # Component
├── index.ts              # Export
└── index.stories.ts      # Story
```

### Available Stories

| Category | Components |
|----------|-----------|
| Atoms | Avatar, Badge, Button, Checkbox, Divider, Heading, Icon, Image, InputMask, InputNumber, InputOtp, InputText, Knob, Label, Paragraph, ProgressBar, ProgressSpinner, RadioButton, SelectButton, Skeleton, Slider, Tag, Textarea |
| Molecules | Anchor, Tile |
| Organisms | Accordion, Card |

---

## Writing Stories

### Basic Story

```typescript
import { AdButton } from '.'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Button',
  component: AdButton,
  args: {
    label: 'Button',
  },
} satisfies Meta<typeof AdButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

### Full Configuration

```typescript
import { AdButton } from '.'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/Button',
  component: AdButton,
  args: {
    adType: 'main',
    label: 'Button',
    icon: '',
    loading: false,
    disabled: false,
    size: 'small',
    severity: undefined,
    variant: undefined,
  },
  argTypes: {
    adType: {
      control: 'select',
      options: ['main', 'activity', 'article', 'contact', 'money', 'user'],
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'] 
    },
    variant: { 
      control: 'select', 
      options: ['outlined', 'text', 'link'] 
    },
    onclick: { action: 'clicked' },
  },
} satisfies Meta<typeof AdButton>

export default meta
type Story = StoryObj<typeof meta>

export const Button: Story = {}
```

### Input Story

```typescript
import { AdInputText } from '.'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Atoms/InputText',
  component: AdInputText,
  args: {
    value: '',
    size: 'small',
    variant: 'outlined',
    invalid: false,
    disabled: false,
    placeholder: 'Enter text...',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof AdInputText>

export default meta
type Story = StoryObj<typeof meta>

export const InputText: Story = {}
```

---

## Story Variants

```typescript
export const Default: Story = {}

export const Loading: Story = {
  args: { loading: true, label: 'Loading...' },
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
}

export const WithIcon: Story = {
  args: { icon: 'pi pi-check', label: 'With Icon' },
}

export const Primary: Story = {
  args: { severity: 'primary', label: 'Primary' },
}

export const Success: Story = {
  args: { severity: 'success', label: 'Success' },
}

export const Danger: Story = {
  args: { severity: 'danger', label: 'Danger' },
}

export const Small: Story = {
  args: { size: 'small', label: 'Small' },
}

export const Large: Story = {
  args: { size: 'large', label: 'Large' },
}

export const Outlined: Story = {
  args: { variant: 'outlined', label: 'Outlined' },
}
```

---

## Control Types

| Control | Type | Usage |
|---------|------|-------|
| `select` | Dropdown | Predefined options |
| `boolean` | Checkbox | True/false |
| `text` | Text input | Strings |
| `number` | Number input | Numbers |
| `range` | Slider | Numeric range |
| `color` | Color picker | Colors |
| `object` | JSON editor | Objects |

### Control Examples

```typescript
argTypes: {
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
  },
  disabled: {
    control: 'boolean',
  },
  label: {
    control: 'text',
  },
  count: {
    control: 'number',
    min: 0,
    max: 100,
  },
  opacity: {
    control: { type: 'range', min: 0, max: 1, step: 0.1 },
  },
  onClick: {
    action: 'clicked',
  },
}
```

---

## Story Organization

### Naming Convention

```
Atoms/ComponentName       → Atoms/Button
Molecules/ComponentName   → Molecules/SearchBar
Organisms/ComponentName   → Organisms/Header
Templates/TemplateName    → Templates/Dashboard
```

### Grouping

```typescript
const meta = {
  title: 'Atoms/Forms/InputText',
  component: AdInputText,
}

// Result:
// Atoms
//   └── Forms
//       └── InputText
```

---

## Actions

```typescript
argTypes: {
  onClick: { action: 'clicked' },
  onSubmit: { action: 'submitted' },
  onChange: { action: 'changed' },
}
```

---

## Decorators

```typescript
const meta = {
  title: 'Atoms/Button',
  component: AdButton,
  decorators: [
    () => ({
      template: '<div style="padding: 3rem;"><story /></div>',
    }),
  ],
}
```

---

## Custom Render

```typescript
export const WithSlots: Story = {
  render: (args) => ({
    components: { AdCard },
    setup() {
      return { args }
    },
    template: `
      <AdCard v-bind="args">
        <template #title>Card Title</template>
        <template #content>
          <p>Content here.</p>
        </template>
      </AdCard>
    `,
  }),
}
```

---

## Commands

```bash
# Start Storybook (via Nuxt)
make dev
# Open http://localhost:6006

# Build for production
npx storybook build

# Standalone
npx storybook dev -p 6006
```

---

## Best Practices

1. **Place stories next to components** - `index.stories.ts`
2. **Follow Atomic Design** hierarchy in titles
3. **Define all props** in `args`
4. **Use `argTypes`** for controls
5. **Create variants** - Loading, Disabled, sizes, severities
6. **Use actions** for event logging
7. **Add decorators** for styling
8. **Test all states** in separate stories
