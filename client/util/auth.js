export const confirmRole = (role) => ((nextState, replace) => {
    if (store.getState().user.role !== role) {
      replace({ pathname: '/', state: { nextPathname: nextState.location.pathname } });
    }
  });