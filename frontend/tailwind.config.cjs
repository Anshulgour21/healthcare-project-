module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-secondary': 'var(--surface-secondary)',
        border: 'var(--border)',
        heading: 'var(--heading)',
        body: 'var(--body)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        
        // Legacy mappings to prevent breaking existing components before they are updated
        foreground: 'var(--heading)',
        muted: 'var(--surface-secondary)',
        'muted-foreground': 'var(--body)',
        card: 'var(--surface)',
        'card-foreground': 'var(--heading)',
        destructive: 'var(--error)',
        'destructive-foreground': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        hero: ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        heading: ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'card-title': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        body: ['18px', { lineHeight: '1.6' }],
        small: ['15px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        card: '24px',
        button: '18px',
        input: '18px',
        dialog: '28px',
        
        // Legacy mappings
        lg: '24px',
        md: '18px',
        sm: '12px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.02)',
        premium: '0 8px 30px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        220: '220ms',
      }
    },
  },
  plugins: []
};
