/** @type {import('tailwindcss').Config} */

// Site-wide palette based on the nextbrain design reference: one navy brand
// colour, slate neutrals and a single orange accent.
//
// The large SkillVerse / workshop landing pages were authored with many
// decorative hues (red, purple, pink, indigo, sky...). Instead of rewriting
// thousands of class names, those hue scales are remapped to the navy scale
// below so every page renders in the same restrained palette. Green/emerald
// (WhatsApp, success ticks), amber/yellow (ratings) and orange (accent) keep
// their meaning and are left untouched.
const navy = {
	50: '#F3F6FC',
	100: '#E6ECF8',
	200: '#CBD7EE',
	300: '#A5B8E0',
	400: '#6F8CCB',
	500: '#496DC7',
	600: '#1F3C88',
	700: '#1A3373',
	800: '#162B61',
	900: '#112250',
	950: '#0B1736',
};

const slate = {
	50: '#F8FAFC',
	100: '#F1F5F9',
	200: '#E2E8F0',
	300: '#CBD5E1',
	400: '#94A3B8',
	500: '#64748B',
	600: '#475569',
	700: '#334155',
	800: '#1E293B',
	900: '#0F172A',
	950: '#020617',
};

// Green / amber / orange keep their strong shades (WhatsApp, success ticks,
// ratings, accent), but their pale 50-200 tints, which the landing pages
// used as panel backgrounds, become neutral so pages stay calm.
const defaults = require('tailwindcss/colors');
const neutralTints = (scale) => ({ ...scale, 50: slate[50], 100: slate[100], 200: slate[200] });

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '1rem', sm: '1.5rem' },
			screens: {
				'2xl': '1200px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
			},
			colors: {
				// Brand tokens used by the rebuilt components.
				nb: {
					blue: '#1F3C88',
					'blue-hover': '#496DC7',
					ink: '#0F172A',
					ink2: '#1E293B',
					footer: '#1E1F22',
					text: '#0F172A',
					muted: '#334155',
					line: '#E2E8F0',
					soft: '#F3F5F9',
					orange: '#F5A623',
					purple: '#8A38F5',
				},
				blue: navy,
				indigo: navy,
				violet: navy,
				purple: navy,
				fuchsia: navy,
				pink: navy,
				rose: navy,
				red: navy,
				sky: navy,
				cyan: navy,
				emerald: neutralTints(defaults.emerald),
				green: neutralTints(defaults.green),
				teal: neutralTints(defaults.teal),
				lime: neutralTints(defaults.lime),
				amber: neutralTints(defaults.amber),
				yellow: neutralTints(defaults.yellow),
				orange: neutralTints(defaults.orange),
				slate,
				gray: slate,
				zinc: slate,
				neutral: slate,

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'3xl': '20px',
			},
			// One soft elevation instead of heavy drop shadows.
			boxShadow: {
				lg: '0 4px 24px rgba(15, 23, 42, 0.08)',
				xl: '0 4px 24px rgba(15, 23, 42, 0.08)',
				'2xl': '0 8px 40px rgba(15, 23, 42, 0.12)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			// Hover "zoom" effects are neutralised (only used as hover:/group-hover:).
			scale: {
				105: '1',
				110: '1',
			},
			// Keep the interface calm: decorative looping animations are disabled.
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				pulse: 'none',
				bounce: 'none',
				ping: 'none',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
