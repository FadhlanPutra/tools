import '@testing-library/jest-dom/vitest';
global.atob = (str) => Buffer.from(str, 'base64').toString('binary')
global.btoa = (str) => Buffer.from(str, 'binary').toString('base64')