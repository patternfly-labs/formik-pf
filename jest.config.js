module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/storybook-static/',
  ],
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@openshift|@patternfly|@redhat-cloud-services|lodash-es|@popperjs|i18next)',
  ],
};
