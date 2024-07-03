// tests/setup/vitest-setup.js
import { expect, describe, test, beforeAll, afterAll, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dotenv from 'dotenv';

// .env.test ファイルを読み込む
dotenv.config({ path: '.env.test' });

const mock = new MockAdapter(axios);

// グローバルにモックを設定する
mock.onGet('/api/default').reply(200, { message: 'default response' });

global.expect = expect;
global.describe = describe;
global.test = test;
global.beforeAll = beforeAll;
global.beforeEach = beforeEach;
global.afterAll = afterAll;

export { mock }; // モックをエクスポートしてテストファイルで使えるようにする
