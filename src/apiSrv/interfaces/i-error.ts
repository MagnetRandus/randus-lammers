interface iError {
  statusCode: number;
  code: string;
  requestId: string;
  date: string;
  body: string;
  headers: Headers;
}

interface Headers {}
