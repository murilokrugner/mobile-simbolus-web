import produce from 'immer';

const InitalState = {
  email: null,
  password: null,
  token: null,
  loading: false,
};

export default function password(state = InitalState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@password/RECOVER_PASSWORD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@password/RECOVER_PASSWORD_SUCCESS': {
        draft.email = action.payload.email;
        draft.loading = false;
        break;
      }
      case '@password/RECOVER_PASSWORD_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@password/RESET_PASSWORD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@password/RESET_PASSWORD_SUCCESS': {
        draft.email = action.payload.email;
        draft.password = action.payload.password;
        draft.token = action.payload.token;
        draft.loading = false;
        break;
      }
      case '@password/RESET_PASSWORD_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
