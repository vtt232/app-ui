import {call,put,takeEvery} from "redux-saga/effects"

import {getUser} from "../requests/requestsUser"
import {requestUserInfor, requestUserInforSuccess, requestUserInforFailed} from "../actions/index"
import { User } from "../../Type/UserType"



function* handleGetUser()  {
    try {
        const user: User  = yield call(getUser)
        yield put(requestUserInforSuccess(user))
    }catch(err) {
        const error: Error = err as Error;
        yield put(requestUserInforFailed(error.message))
    }
}





function* watcherUsersSaga() {
    yield takeEvery(requestUserInfor.type, handleGetUser)
}

export default watcherUsersSaga
