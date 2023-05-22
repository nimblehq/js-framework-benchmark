module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/app/tests/setup-test-env.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  testURL: `http://localhost`,
  transformIgnorePatterns: [
    "/node_modules/(?!(@remix-run/web-fetch|@remix-run/web-blob|@remix-run/web-stream|@remix-run/web-form-data|@remix-run/web-file|@web3-storage/multipart-parser)/)",
  ],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
