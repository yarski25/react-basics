//@ts-ignore
import nodeFetch from 'node-fetch';
//@ts-ignore
global.fetch = nodeFetch;
//@ts-ignore
global.Request = nodeFetch.Request;
import '@testing-library/jest-dom';
