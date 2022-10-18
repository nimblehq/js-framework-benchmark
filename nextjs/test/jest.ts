import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Workaround for the error in js-dom >= 16 (https://stackoverflow.com/a/68468204)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
// @ts-expect-error: 'typeof TextDecoder' is not assignable to type
global.TextDecoder = TextDecoder;
