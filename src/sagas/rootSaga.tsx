import { all } from "redux-saga/effects";
import watcherUsersSaga from "./handlers/userHandler";

function* rootSaga() {
    yield all([watcherUsersSaga()])
}

export default rootSaga