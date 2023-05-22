module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  testURL: `http://localhost`,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
