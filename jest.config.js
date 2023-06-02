export default {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      testMatch: ['**/*.test.ts'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.json',
        },
      },
  }