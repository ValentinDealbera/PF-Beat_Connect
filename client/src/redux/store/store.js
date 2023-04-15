import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from '../rootReducer';

//Si esta dentro de whitelist, se persiste
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['client', 'cart', 'filters'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: persistMiddleware,
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
export const useAppDispatch = () => useDispatch();

export const persistor = persistStore(store);

export default store;