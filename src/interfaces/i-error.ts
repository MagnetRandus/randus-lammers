/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
interface iError {
  statusCode: number;
  code: string;
  requestId: string;
  date: string;
  body: string;
  headers: Headers;
}

interface Headers {}
