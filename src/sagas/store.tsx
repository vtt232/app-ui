
import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'



import userReducer from './reducers/userReducers';
import rootSaga from './rootSaga';
import createSagaMiddleware from '@redux-saga/core';



const configStore = () => {
    const sagaMiddleware = createSagaMiddleware();



    const store = configureStore({
        reducer:{
            userReducer: userReducer,
        },
        middleware: [sagaMiddleware],
    })

    sagaMiddleware.run(rootSaga);

    return store

}

export default configStore