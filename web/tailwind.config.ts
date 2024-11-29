import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'diagonal-swipe': {
          '0%': { transform: 'translateX(-100%) translateY(100%)' },
          '100%': { transform: 'translateX(100%) translateY(-100%)' },
        },
      },
      animation: {
        'diagonal-swipe': 'diagonal-swipe 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
