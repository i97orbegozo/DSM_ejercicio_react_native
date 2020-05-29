import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';

import { persistReducer, persistStore  } from 'redux-persist';
//import { AsyncStorage } from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

// Necesario instalar los siguientes paquetes
// yarn add react-persist



    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['favoritos']
    }

    const reducersCombined = combineReducers({
        excursiones,
        comentarios,
        cabeceras,
        actividades,
        favoritos
    })

    const persistedReducer = persistReducer(persistConfig, reducersCombined);
  
    const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    const persistor = persistStore(store);
    export { persistor , store };
    
