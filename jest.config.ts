import type { Config } from 'jest';

export default (): Config => {
  return {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleDirectories: ['node_modules', 'src'],
  };
};
