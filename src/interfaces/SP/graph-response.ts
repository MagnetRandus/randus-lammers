interface GraphResponse<T> {
  "@odata.context": string;
  value: T[];
}

export default GraphResponse;
