interface AsyncRequest<T> {
  data: T[];
  delay?: number;
}

export const asyncRequest = <T>({ data, delay = 200 }: AsyncRequest<T>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const asyncRequestFake = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 200);
  });
};
