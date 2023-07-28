module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   settings: {
      react: {
         version: 'detect',
      },
   },
   extends: [
      'standard-with-typescript',
      'plugin:react/recommended',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier-plugin-tailwindcss',
   ],
   overrides: [
      {
         env: {
            node: true,
         },
         files: ['.eslintrc.{js,cjs}'],
         parserOptions: {
            sourceType: 'script',
         },
      },
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react', 'prettier', 'prettier-plugin-tailwindcss'],
   rules: { 'prettier/prettier': 'error' },
};
