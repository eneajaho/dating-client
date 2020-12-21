module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/',
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  moduleNameMapper: {
    "@env/(.*)$": ["<rootDir>/src/environments/$1"],
    "@app/(.*)$": ["<rootDir>/src/app/$1"],
    "@store/(.*)$": ["<rootDir>/src/app/store/$1"],
    "@core/(.*)$": ["<rootDir>/src/app/core/$1"],
    "@shared/(.*)$": ["<rootDir>/src/app/shared/$1"],
    "@layout/(.*)$": ["<rootDir>/src/app/layout/$1"],
    "@models/(.*)$": ["<rootDir>/src/app/core/models/$1"],
    "@pages/(.*)$": ["<rootDir>/src/app/pages/$1"],
    "@auth/(.*)$": ["<rootDir>/src/app/pages/auth/$1"],
    "@members/(.*)$": ["<rootDir>/src/app/pages/members/$1"],
    "@settings/(.*)$": ["<rootDir>/src/app/pages/settings/$1"]
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/(?!@ngrx)",
],
  globals: {
    'ts-jest': {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$"
    }
  },
  // testEnvironment: 'jsdom',
  // transform: {
  //   '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  // }
};
