class InterceptorManager {
  handlers = [];

  use(fulfill, failure) {
    this.handlers.push({
      fulfill,
      failure,
    });
  }

  remove(index) {
    this.handlers.splice(index, 1);
  }

  async applyFulfillHandlers(data) {
    let result = data;

    // eslint-disable-next-line
    for (const handler of this.handlers) {
      const { fulfill } = handler;
      result = fulfill ? await fulfill(result) : result; // eslint-disable-line
    }
    return result;
  }

  async applyFailureHandlers(data) {
    let result = data;

    // eslint-disable-next-line
    for (const handler of this.handlers) {
      const { failure } = handler;
      result = failure ? await failure(result) : result; // eslint-disable-line
    }
    return result;
  }
}

export default InterceptorManager;
