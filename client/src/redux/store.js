import {configureStore, combineSlices} from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice.js';
import themeReducer from '../redux/theme/themeSlice.js'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';




const rootReducer = combineSlices({
  user:userReducer,
  theme:themeReducer,
})
const persistConfig = {
  key:'root',
  storage,
  version:1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false}),
})

export const persistor = persistStore(store)



