function ObjectMake<T>(params: T): T {
  return {
    ...params,
  };
}
export default ObjectMake;
