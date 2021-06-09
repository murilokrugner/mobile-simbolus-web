export function recoverPasswordRequest(email) {
  return {
    type: '@password/RECOVER_PASSWORD_REQUEST',
    payload: { email },
  };
}

export function recoverPasswordSuccess(email) {
  return {
    type: '@password/RECOVER_PASSWORD_SUCCESS',
    payload: { email },
  };
}

export function recoverPasswordFailure() {
  return {
    type: '@password/RECOVER_PASSWORD_FAILURE',
  };
}

export function resetPasswordRequest(email, password, token) {
  return {
    type: '@password/RESET_PASSWORD_REQUEST',
    payload: { email, password, token },
  };
}

export function resetPasswordSuccess(email, password, token) {
  return {
    type: '@password/RESET_PASSWORD_SUCCESS',
    payload: { email, password, token },
  };
}

export function resetPasswordFailure() {
  return {
    type: '@password/RESET_PASSWORD_FAILURE',
  };
}
