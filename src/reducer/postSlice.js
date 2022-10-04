import { createSlice, createAction } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        data: [],
        error: '',
    },
    reducers: {
        dataLoad: (state) => {
            state.loading = true
            state.data = []
            state.err = ''
        },
        dataSuccess: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.err = ''
        },
        dataError: (state, action) => {
            state.loading = false
            state.data = []
            state.err = action.payload
        }
    }
})

export const requestSagaFetch = createAction("requestSagaFetch")
export const sagaAddDataFetch = createAction("sagaAddDataFetch")
export const sagaDeleteDataFetch = createAction("sagaDeleteDataFetch")
export const sagaEditDataFetch = createAction("sagaEditDataFetch")


export default postSlice.reducer

export const { dataLoad, dataSuccess, dataError } = postSlice.actions