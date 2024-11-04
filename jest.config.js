module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^routers/(.*)$": "<rootDir>/src/routers/$1",
    "^appRedux/(.*)$": "<rootDir>/src/appRedux/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
