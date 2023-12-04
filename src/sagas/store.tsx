
import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'



import userReducer from './reducers/userReducers';
import rootSaga from './rootSaga';
import createSagaMiddleware from '@redux-saga/core';
import modalReducer from './reducers/modalReducers';



const configStore = () => {
    const sagaMiddleware = createSagaMiddleware();



    const store = configureStore({
        reducer:{
            userReducer: userReducer,
            modalReducer: modalReducer,
        },
        middleware: [sagaMiddleware],
    })

    sagaMiddleware.run(rootSaga);

    return store

}

export default configStore