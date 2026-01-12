# Organisms

Organisms are complex UI components composed of molecules and atoms, forming distinct sections of an interface.

## Available Organisms

### Data Table

Powerful table for displaying and managing data.

```vue
<ad-data-table 
  :value="users" 
  :columns="columns"
  :paginator="true"
  :rows="10"
/>
```

### Dialog

Modal dialog for user interactions.

```vue
<ad-dialog 
  v-model:visible="showDialog" 
  header="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
</ad-dialog>
```

### Accordion

Collapsible content sections.

```vue
<ad-accordion :panels="panels" />
```

### Menu

Dropdown menu for actions.

```vue
<ad-menu :model="menuItems" />
```

### Chart

Data visualization component.

```vue
<ad-chart 
  type="bar" 
  :data="chartData" 
  :options="chartOptions"
/>
```

### Card

Container with header and content areas.

```vue
<ad-card>
  <template #header>Card Title</template>
  <template #content>
    Main content goes here
  </template>
  <template #footer>
    <ad-button label="Action" />
  </template>
</ad-card>
```

### Tabs

Tabbed navigation for content organization.

```vue
<ad-tabs :tabs="tabs" />
```

## Complex Compositions

Organisms can contain other organisms:

```vue
<ad-card>
  <template #content>
    <ad-data-table :value="data" />
  </template>
  <template #footer>
    <ad-dialog v-model:visible="showEdit">
      <ad-form @submit="handleSubmit" />
    </ad-dialog>
  </template>
</ad-card>
```

## Styling Organisms

Organisms use CSS modules for encapsulated styling:

```scss
.ad-data-table {
  background: var(--surface-card);
  border-radius: 0.5em;
  overflow: hidden;
}
```

