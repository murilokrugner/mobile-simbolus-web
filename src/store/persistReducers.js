import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReucer = persistReducer(
    {
      key: 'belaschedule',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReucer;
};
