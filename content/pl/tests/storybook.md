# Storybook

Storybook służy do rozwijania i dokumentowania komponentów UI w izolacji.

---

## Dostęp

Dostępny pod adresem `http://localhost:6006` po uruchomieniu Nuxt komendą `make dev`.

---

## Struktura

Stories umieszczane są obok komponentów:

```
nuxt/atomic/atom/button/
├── index.vue             # Komponent
├── index.ts              # Eksport
└── index.stories.ts      # Story
```

### Dostępne stories

| Kategoria | Komponenty |
|-----------|-----------|
| Atoms | Avatar, Badge, Button, Checkbox, Divider, Heading, Icon, Image, InputMask, InputNumber, InputOtp, InputText, Knob, Label, Paragraph, ProgressBar, ProgressSpinner, RadioButton, SelectButton, Skeleton, Slider, Tag, Textarea |
| Molecules | Anchor, Tile |
| Organisms | Accordion, Card |

---

## Pisanie stories

### Podstawowa story

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

### Pełna konfiguracja

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

### Story inputa

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
    placeholder: 'Wpisz tekst...',
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

## Warianty story

```typescript
export const Default: Story = {}

export const Loading: Story = {
  args: { loading: true, label: 'Ładowanie...' },
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Wyłączony' },
}

export const WithIcon: Story = {
  args: { icon: 'pi pi-check', label: 'Z ikoną' },
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
  args: { size: 'small', label: 'Mały' },
}

export const Large: Story = {
  args: { size: 'large', label: 'Duży' },
}

export const Outlined: Story = {
  args: { variant: 'outlined', label: 'Outlined' },
}
```

---

## Typy kontrolek

| Kontrolka | Typ | Użycie |
|-----------|-----|--------|
| `select` | Dropdown | Predefiniowane opcje |
| `boolean` | Checkbox | True/false |
| `text` | Pole tekstowe | Stringi |
| `number` | Pole numeryczne | Liczby |
| `range` | Suwak | Zakres numeryczny |
| `color` | Wybór koloru | Kolory |
| `object` | Edytor JSON | Obiekty |

### Przykłady kontrolek

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

## Organizacja stories

### Konwencja nazewnictwa

```
Atoms/NazwaKomponentu       → Atoms/Button
Molecules/NazwaKomponentu   → Molecules/SearchBar
Organisms/NazwaKomponentu   → Organisms/Header
Templates/NazwaTemplate     → Templates/Dashboard
```

### Grupowanie

```typescript
const meta = {
  title: 'Atoms/Forms/InputText',
  component: AdInputText,
}

// Rezultat:
// Atoms
//   └── Forms
//       └── InputText
```

---

## Akcje

```typescript
argTypes: {
  onClick: { action: 'clicked' },
  onSubmit: { action: 'submitted' },
  onChange: { action: 'changed' },
}
```

---

## Dekoratory

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

## Customowy render

```typescript
export const WithSlots: Story = {
  render: (args) => ({
    components: { AdCard },
    setup() {
      return { args }
    },
    template: `
      <AdCard v-bind="args">
        <template #title>Tytuł karty</template>
        <template #content>
          <p>Treść tutaj.</p>
        </template>
      </AdCard>
    `,
  }),
}
```

---

## Komendy

```bash
# Uruchom Storybook (przez Nuxt)
make dev
# Otwórz http://localhost:6006

# Zbuduj na produkcję
npx storybook build

# Samodzielnie
npx storybook dev -p 6006
```

---

## Dobre praktyki

1. **Umieszczaj stories obok komponentów** - `index.stories.ts`
2. **Podążaj za Atomic Design** w tytułach
3. **Definiuj wszystkie propsy** w `args`
4. **Używaj `argTypes`** dla kontrolek
5. **Twórz warianty** - Loading, Disabled, sizes, severities
6. **Używaj akcji** do logowania zdarzeń
7. **Dodawaj dekoratory** dla stylowania
8. **Testuj wszystkie stany** w osobnych stories
