module.exports = {
    root: true,
    extends: ['next', 'next/core-web-vitals', 'eslint:recommended', 'plugin:react/recommended'],
    plugins: ['unused-imports'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js no requiere importar React en cada archivo
      'unused-imports/no-unused-imports': 'error', // Marca los imports no utilizados como error
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // Otras reglas personalizadas que desees agregar
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
  