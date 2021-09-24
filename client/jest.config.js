const config = require('kcd-scripts/jest')

module.exports = {
  ...config,
  // we have no coverageThreshold on this project...
  coverageThreshold: {},
  roots: ['<rootDir>/__tests__'],
  modulePaths: ['<rootDir>/__tests__'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup-env.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  moduleNameMapper: {},
  testMatch: ["<rootDir>/__tests__/**/*.(js|jsx)"],
}
