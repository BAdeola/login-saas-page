/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeando as variáveis CSS para o Tailwind
        'brand': {
          DEFAULT: 'var(--brand-primary)',
          fade: 'var(--brand-primary-fade)',
          hover: 'var(--brand-primary-hover)',
          border: 'var(--brand-primary-border)',
        },
        'surface': {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)',
          hover: 'var(--surface-hover)',
        },
        'system': {
          text: {
            primary: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            muted: 'var(--text-muted)',
            accent: 'var(--text-accent)',
          },
          border: {
            subtle: 'var(--border-subtle)',
            default: 'var(--border-default)',
            strong: 'var(--border-strong)',
          },
          error: {
            DEFAULT: 'var(--error-color)',
            bg: 'var(--error-bg)',
            hover: 'var(--error-hover)',
          }
        },
        'chart': {
          tooltip: 'var(--chart-tooltip-bg)',
          line: 'var(--chart-line)',
          grid: 'var(--chart-grid)',
          axis: 'var(--chart-axis)',
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))',
      }
    },
  },
  plugins: [],
}