import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from './account/accountSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderReducer from './order/orderSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ["account"]
}
const rootReducer = combineReducers({
  account: accountReducer,
  order: orderReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)

// export const store = configureStore({
//   reducer: {
//     account: accountReducer,
//   },
// });
