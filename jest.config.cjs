// module.exports = {
//     transform: {
//       '^.+\\.js$': 'babel-jest', // Transforms JS files using Babel
//     },
//   };
  

  // jest.config.cjs

// module.exports = {
//   collectCoverage: true,
//   coverageDirectory: "./coverage",
//   coverageReporters: [
//     "text",
//     "lcov"
//   ],
//   testEnvironment: "node",
//   forceExit:true,
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
//   }
// };


module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Specify test file patterns
  testMatch: [
    "**/tests/**/*.test.js",
    "**/tests/**/*.spec.js"
  ],
  
  // Ignore certain directories
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],

  // Code coverage configuration
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: [
    "text",
    "lcov"
  ],

  // Setup files after environment
  setupFilesAfterEnv: ['./jest.setup.js'],

  // Transformation for JS, JSX, TS, TSX files
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  }
};

