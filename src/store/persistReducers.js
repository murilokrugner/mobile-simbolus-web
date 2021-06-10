import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReucer = persistReducer(
    {
      key: 'mobilesimbolus',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReucer;
};
