import { createTheme } from '@mantine/core';
import type { CSSVariablesResolver } from '@mantine/core';

export const atlasTheme = createTheme({
  primaryColor: 'teal',
  primaryShade: { light: 9, dark: 4 },
  fontFamily: 'var(--atlas-font-family, "Noto Sans Arabic Variable", system-ui, sans-serif)',
  headings: { fontFamily: 'var(--atlas-heading-font-family, "Free Palestine", "Noto Sans Arabic Variable", system-ui, sans-serif)', fontWeight: '400' },
  fontSizes: { xs: '0.875rem', sm: '1rem', md: '1rem', lg: '1.125rem', xl: '1.375rem' },
  lineHeights: { xs: '1.8', sm: '1.85', md: '1.9', lg: '1.8', xl: '1.7' },
  defaultRadius: 'md',
  focusRing: 'auto',
  autoContrast: true,
  respectReducedMotion: true,
});

export const atlasCssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-dimmed': '#5e6b63',
    '--mantine-color-placeholder': '#66736b',
  },
  dark: {
    '--mantine-color-dimmed': '#a8b7ad',
    '--mantine-color-placeholder': '#a8b7ad',
  },
});
