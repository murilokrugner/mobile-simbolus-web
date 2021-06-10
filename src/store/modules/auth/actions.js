export function signInRequest(company, email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {company, email, password},
  };
}

export function signInSuccess(token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
