// frontend/jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', 
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react',
                esModuleInterop: true,
            },
        },
    },
    testMatch: [
        '**/src/**/*.test.tsx',
        '**/src/**/*.test.ts',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // ここを追加
};


