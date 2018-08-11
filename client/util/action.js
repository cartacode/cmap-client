/**
 * Creates the function to dispatch all action type derivatives for the given action.
 * @param   {Object}    config          The configuration object.
 * @param   {Function}  config.action   The action function.
 * @param   {Object}    [config.header] The action header.
 * @param   {Object}    config.type     The action type.
 * @returns {Function}
 */
export function createAction({ action, header = {}, type }) {
  return async(dispatch) => {
    dispatch({ type: type.REQUEST, header });

    try {
      dispatch({ type: type.SUCCESS, header, payload: await action() });
    } catch (error) {
      dispatch({ type: type.FAILURE, header, error });
      
      alert('API ERROR:'+JSON.stringify(error));
    }
  };
}

/**
 * Creates the failure, request, and success type derivatives for the given action identifier.
 * @param   {string}  id  The identifier of the action.
 * @returns {Object}
 */
export function createActionType(id) {
  return {
    FAILURE: `${id}__FAILURE`,
    REQUEST: `${id}__REQUEST`,
    SUCCESS: `${id}__SUCCESS`,
  };
}
