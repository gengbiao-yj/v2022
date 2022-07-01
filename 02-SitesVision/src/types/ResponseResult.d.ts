interface ResponseResult<T> {
  code: number;
  message: string;
  data: T;
}

export { ResponseResult };
