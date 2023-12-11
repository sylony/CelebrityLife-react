// src/store.js
import { createStore } from 'redux';
import { message } from 'antd';
import { readLocalUser, saveToLocalUser } from '../util';

const stateData = {
    user: readLocalUser(),
    detailsInfo: {}
}

function reducer(state = stateData, action) {
    switch (action.type) {
        case 'setUser':
            if (action.payload.isExitLogin) {
                message.success(`Successfully logged out and logged in`)
                return { ...state, user: {} };
            }
            saveToLocalUser({ ...state.user, ...action.payload.user })
            return { ...state, user: { ...state.user, ...action.payload.user } };
        case 'setDetailsInfo':
            return { ...state, detailsInfo: { ...state.user, ...action.payload.detailsInfo } };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
