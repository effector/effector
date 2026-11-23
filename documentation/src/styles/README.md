# Design System Structure

This directory contains the design system for Effector documentation, organized into layers for maintainability and scalability.

## File Structure

```
styles/
├── tokens.css          # Base/primitive tokens (DO NOT USE DIRECTLY)
├── aliases.css         # Semantic tokens (USE THESE IN YOUR CODE)
├── theme-light.css     # Light theme color tokens
├── theme-dark.css      # Dark theme color tokens
├── index.css           # Main stylesheet with component styles
├── language.css        # Language-specific styles
└── expressive-code.css # Code syntax highlighting
```

## Import Order

Files are imported in a specific order in `index.css`:

1. **tokens.css** - Base design tokens (primitives)
2. **aliases.css** - Semantic aliases
3. **theme-light.css** - Light theme (default)
4. **theme-dark.css** - Dark theme overrides

## Usage Guidelines

### ✅ DO: Use Semantic Tokens

Always use semantic tokens from `aliases.css` in your code:

```css
/* Typography */
font-size: var(--text-body);        /* NOT var(--font-size-base) */
font-weight: var(--weight-heading); /* NOT var(--font-weight-semibold) */
line-height: var(--leading-body);   /* NOT var(--line-height-normal) */

/* Spacing */
margin: var(--spacing-element-gap);  /* NOT var(--space-4) */
padding: var(--space-6);             /* OK - spacing scale is fine */

/* Colors */
color: var(--theme-text);            /* Theme tokens are semantic */
background: var(--theme-bg);
```

### ❌ DON'T: Use Base Tokens Directly

Avoid using base tokens from `tokens.css` in application code:

```css
/* WRONG - Don't use base typography tokens */
font-size: var(--font-size-base);
font-weight: var(--font-weight-semibold);
line-height: var(--line-height-normal);

/* RIGHT - Use semantic aliases */
font-size: var(--text-body);
font-weight: var(--weight-heading);
line-height: var(--leading-body);
```

## Token Categories

### Spacing Semantic Tokens
- `--spacing-page-gutter` - Page horizontal padding
- `--spacing-section-gap` - Between major sections
- `--spacing-component-gap` - Between components
- `--spacing-element-gap` - Between elements
- `--spacing-text-gap` - Between text elements

### Typography Semantic Tokens
- `--text-body` - Primary body text (14px)
- `--text-body-sm` - Small text (12px)
- `--text-h1` through `--text-h6` - Heading sizes
- `--text-code` - Code block text
- `--text-code-inline` - Inline code

### Font Weight Semantic Tokens
- `--weight-body` - Body text weight (400)
- `--weight-heading` - Heading weight (600)
- `--weight-emphasis` - Emphasized text (500)
- `--weight-strong` - Strong text (700)

### Line Height Semantic Tokens
- `--leading-body` - Body text (1.5)
- `--leading-heading` - Headings (1.25)
- `--leading-code` - Code (1.5)
- `--leading-nav` - Navigation (1.375)

### Theme Color Tokens
All theme tokens are semantic and theme-aware:
- `--theme-text`, `--theme-text-light`, `--theme-text-lighter`
- `--theme-bg`, `--theme-bg-hover`, `--theme-bg-offset`
- `--theme-accent`, `--theme-text-accent`
- `--theme-divider`, `--theme-divider-light`
- And many more...

## Adding New Tokens

### Adding a Base Token
Edit `tokens.css` to add new primitive values:

```css
/* In tokens.css */
:root {
  --space-14: 3.5rem;  /* New spacing value */
}
```

### Adding a Semantic Token
Edit `aliases.css` to create semantic aliases:

```css
/* In aliases.css */
:root {
  --spacing-card-gap: var(--space-14);  /* References base token */
}
```

### Adding Theme Colors
Edit `theme-light.css` and `theme-dark.css`:

```css
/* In theme-light.css */
:root {
  --theme-sidebar-bg: hsl(var(--color-gray-100));
}

/* In theme-dark.css */
:root.theme-dark {
  --theme-sidebar-bg: hsl(var(--color-gray-900));
}
```

## Benefits of This Structure

1. **Single Source of Truth** - Base tokens in one place
2. **Semantic Naming** - Intent-based naming improves readability
3. **Easy Theming** - Theme changes don't affect base tokens
4. **Maintainability** - Changes propagate through semantic layers
5. **Scalability** - Easy to add new tokens without breaking existing code
6. **Type Safety** - Clear contract between layers

## Migration Notes

If updating existing code:
1. Find base token usage (e.g., `var(--font-size-base)`)
2. Replace with semantic token (e.g., `var(--text-body)`)
3. Test both light and dark themes
4. Verify responsive breakpoints

## Questions?

For questions about the design system structure, refer to:
- [Design Tokens Documentation](https://spectrum.adobe.com/page/design-tokens/)
- [CSS Custom Properties Best Practices](https://www.smashingmagazine.com/2018/05/css-custom-properties-strategy-guide/)
