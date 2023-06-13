const promiseWrapper = (promise) => {
  let status = 'pending';
  let result;

  const suspender = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'success':
          return result;
        case 'error':
          throw result;
        default:
          throw new Error('Unknown status');
      }
    },
  };
};

export default promiseWrapper;
