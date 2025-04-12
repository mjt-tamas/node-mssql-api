module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/common/test.setup.ts'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
};
