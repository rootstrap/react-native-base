class InterceptorManager {
  handlers = [];

  use(fullfill, failure) {
    this.handlers.push({
      fullfill,
      failure,
    });
  }

  remove(index) {
    this.handlers.splice(index, 1);
  }

  async applyFullfillHandlers(data) {
    let result = data;

    // eslint-disable-next-line
    for (const handler of this.handlers) {
      const { fullfill } = handler;
      result = fullfill ? await fullfill(result) : result; // eslint-disable-line
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
