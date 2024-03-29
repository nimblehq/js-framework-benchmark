module.exports = {
  verbose: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/app/tests/jest.ts',
    '<rootDir>/app/tests/database.ts',
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  testURL: `http://localhost`,
  transformIgnorePatterns: [
    '/node_modules/(?!(@remix-run/web-fetch|@remix-run/web-blob|@remix-run/web-stream|@remix-run/web-form-data|@remix-run/web-file|@web3-storage/multipart-parser|uuid)/)',
  ],
  moduleNameMapper: {
    // Handle absolute imports in Remix
    '~/(.*)': '<rootDir>/app/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFiles: ['dotenv/config'],
};
