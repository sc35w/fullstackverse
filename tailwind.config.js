/** @type {import('tailwindcss').Config} */

// Fullstackverse design system: warm off-white, ink, stone. One system for
// the whole site; values come from the CSS variables in src/index.css.
//
// The large SkillVerse / workshop landing pages were authored with Tailwind's
// default hue scales (blue, purple, slate, emerald...). Those scales are
// remapped below to the brand's warm neutrals so every page renders in the
// same restrained palette without rewriting thousands of class names.

const v = (name) => `var(--${name})`;

// Warm neutral scale, light -> dark (bg ... ink).
const stone = {
	50: '#FAF8F4',
	100: '#F4F1EB',
	200: '#EAE4DA',
	300: '#D9D2C7',
	400: '#BEB5A8',
	500: '#8A837A',
	600: '#686158',
	700: '#4A453E',
	800: '#312E28',
	900: '#211F1A',
	950: '#161511',
};

// Former brand hues collapse onto the ink end of the same scale, so a
// "primary blue" button becomes ink and a pale "blue-50" panel becomes stone.
const inkScale = { ...stone, 500: '#5C564E', 600: '#211F1A', 700: '#2B2823', 800: '#211F1A', 900: '#161511' };

// Muted semantic hues kept only for meaning (success, rating, warning).
const olive = { 50: '#F3F2EA', 100: '#E8E7D9', 200: '#D3D2BA', 300: '#B5B592', 400: '#8E9168', 500: '#6E7448', 600: '#56603A', 700: '#454D30', 800: '#353B26', 900: '#272B1D', 950: '#181B12' };
const ochre = { 50: '#F7F1E5', 100: '#EFE3C8', 200: '#E2CB97', 300: '#D2AE62', 400: '#C3943C', 500: '#A87A2A', 600: '#8A6221', 700: '#6C4C1B', 800: '#523A16', 900: '#3D2B11', 950: '#24190A' };

module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '20px', md: '40px', xl: '56px' },
			screens: { '2xl': '1440px' },
		},
		extend: {
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				display: ['Georgia', 'Times New Roman', 'serif'],
				mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
			},
			colors: {
				// Design tokens
				canvas: v('color-bg'),
				surface: v('color-surface'),
				'surface-alt': v('color-surface-alt'),
				ink: v('color-text'),
				'ink-hover': v('color-accent-hover'),
				'ink-2': v('color-text-secondary'),
				'ink-3': v('color-text-muted'),
				line: v('color-border'),
				'line-dark': v('color-border-dark'),

				// Pure white/black become the warm surface and ink.
				white: '#FAF8F4',
				black: '#211F1A',

				// Remapped Tailwind scales (see note above)
				slate: stone,
				gray: stone,
				zinc: stone,
				neutral: stone,
				stone,
				blue: inkScale,
				indigo: inkScale,
				violet: inkScale,
				purple: inkScale,
				fuchsia: inkScale,
				pink: inkScale,
				rose: inkScale,
				red: inkScale,
				sky: inkScale,
				cyan: inkScale,
				emerald: olive,
				green: olive,
				teal: olive,
				lime: olive,
				amber: ochre,
				yellow: ochre,
				orange: ochre,

				// shadcn-style ui component tokens
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
				secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
				destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
				muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
				accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
				popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
				card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
			},
			// Near-square geometry everywhere; `full` stays for dots and avatars.
			borderRadius: {
				none: '0',
				sm: v('radius-sm'),
				DEFAULT: v('radius-sm'),
				md: v('radius-sm'),
				lg: v('radius-md'),
				xl: v('radius-md'),
				'2xl': v('radius-md'),
				'3xl': v('radius-md'),
			},
			// Hierarchy comes from borders and type, not drop shadows.
			boxShadow: {
				sm: 'none',
				DEFAULT: 'none',
				md: 'none',
				lg: 'none',
				xl: 'none',
				'2xl': 'none',
				overlay: '0 24px 64px -32px rgba(33, 31, 26, 0.35)',
			},
			maxWidth: {
				container: v('container'),
			},
			transitionTimingFunction: {
				editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
			},
			keyframes: {
				'accordion-down': { from: { height: 0 }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: 0 } },
			},
			// Calm interface: decorative looping animations are disabled.
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				pulse: 'none',
				bounce: 'none',
				ping: 'none',
				spin: 'none',
			},
			// Hover "zoom" effects are neutralised (only used as hover:/group-hover:).
			scale: {
				105: '1',
				110: '1',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
