import { takeEvery, call, put } from '@redux-saga/core/effects'
import { requestSagaFetch, sagaEditDataFetch, dataLoad, dataSuccess, dataError, sagaAddDataFetch, sagaDeleteDataFetch } from '../reducer/postSlice'
import axios from 'axios'

export function* fetchDataSagaList() {
    yield takeEvery(requestSagaFetch, fetchData)
    yield takeEvery(sagaAddDataFetch, fetchAddData)
    yield takeEvery(sagaDeleteDataFetch, fetchDeleteData)
    yield takeEvery(sagaEditDataFetch, fetchEditData)
}

function* fetchData() {
    yield put(dataLoad())
    try {
        const url = 'http://localhost:4000/vaccine'
        const response = yield call(axios.get, url)
        yield put(dataSuccess(response.data))
    } catch (err) {
        yield put(dataError(err.message))
    }
}


function* fetchAddData(action) {
    const url = 'http://localhost:4000/vaccine'
    const response = yield call(axios.post, url, action.payload)
    try {
        const url = 'http://localhost:4000/vaccine'
        const response = yield call(axios.get, url)
        yield put(dataSuccess(response.data))
    } catch (err) {
        yield put(dataError(err.message))
    }
}


function* fetchDeleteData(action) {
    const url = `http://localhost:4000/vaccine/${action.payload}`
    const response = yield call(axios.delete, url)
    try {
        const url = 'http://localhost:4000/vaccine'
        const response = yield call(axios.get, url)
        yield put(dataSuccess(response.data))
    } catch (err) {
        yield put(dataError(err.message))
    }
}


function* fetchEditData(action) {
    const url = `http://localhost:4000/vaccine/${action.payload.id}`
    const response = yield call(axios.put, url, action.payload)
    try {
        const url = 'http://localhost:4000/vaccine'
        const response = yield call(axios.get, url)
        yield put(dataSuccess(response.data))
    } catch (err) {
        yield put(dataError(err.message))
    }
}
