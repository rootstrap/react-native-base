import produce from 'immer';

export default (initialState, actionHandlers) => (state = initialState, action) =>
  produce(state, draft =>
    actionHandlers[action.type] ? actionHandlers[action.type](draft, action) : state
  );
