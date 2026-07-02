module.exports = [
  {
    ignores: ['src/**/*.ts', 'src/**/*.tsx', 'vite.config.ts'],
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
