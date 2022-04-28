module.exports = {
  displayName: 'api-e2e',
  preset: './jest.preset.js',
  collectCoverage: false,
  rootDir: '/usr/src/app',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/?(*.)+(e2e).[jt]s?(x)'],
};
