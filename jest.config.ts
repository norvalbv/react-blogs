import type { Config } from 'jest';

export default (): Config => {
  return {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '\\.css\\.ts$': '@vanilla-extract/jest-transform',
    },
    moduleDirectories: ['node_modules', 'src'],
  };
};
