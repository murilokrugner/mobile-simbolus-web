import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

// import history from '~/services/history';
import api from '../../../services/api';

import {
  recoverPasswordSuccess,
  recoverPasswordFailure,
  resetPasswordFailure,
  resetPasswordSuccess,
} from './actions';

export function* recoverPassword({ payload }) {
  try {
    const { email } = payload;

    yield call(api.post, 'forgotpassword', {
      email,
    });

    if (!email) {
      toast.error('Esse e-mail não existe');
      return;
    }

    yield put(recoverPasswordSuccess(email));
    toast.success('E-mail enviado!');
    toast.info('Verifique seu e-mail para alterar sua senha :)');
  } catch (err) {
    toast.error('Falha no envio do e-mail, tente novamente');
    yield put(recoverPasswordFailure());
  }
}

export function* resetPassword({ payload }) {
  try {
    const { email, password, token } = payload;

    yield call(api.put, 'resetpassword', {
      email,
      password,
      token,
    });

    yield put(resetPasswordSuccess(email, password, token));

    // history.push('/');
    toast.success('Senha alterada! Faça login');
  } catch (err) {
    toast.error('Falha, verifique seus dados!');

    yield put(resetPasswordFailure());
  }
}

export default all([
  takeLatest('@password/RECOVER_PASSWORD_REQUEST', recoverPassword),
  takeLatest('@password/RESET_PASSWORD_REQUEST', resetPassword),
]);
