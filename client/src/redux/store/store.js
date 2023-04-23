import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../rootReducer';

//Si esta dentro de whitelist, se persiste
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['client', 'cart', 'filters', 'filter', 'admin'],
  debug: true,
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
//export const getPersistor = () => persistor;

export const resetPersist = async () => {
  await clearState();
};

export const clearState = async () => {
  await persistor.pause();
  await persistor.purge();
  await persistor.flush();
  await localStorage.removeItem('persist:root');
  await window.localStorage.clear();
  await window.sessionStorage.clear();
  //recarga la pagina
  await window.location.reload();
  await persistor.persist();
};



export default store;