import { createReducer } from '@rootstrap/redux-tools';
import { loginSuccess, signUpSuccess, logoutSuccess, updateSession } from '../actions/userActions';

const initialState = {
    user: null,
    info: null,
};

interface Session {
    user: string;
    email: string;
    info: string;
}

const handleLoginSuccess = (state: Session, payload: string) => {
    state.user = payload;
};

const handleLogoutSuccess = () => {
    return initialState;
};

const handleUpdateSession = (state: Session, payload: string) => {
    state.info = payload;
};

export default createReducer(initialState, {
    [loginSuccess]: handleLoginSuccess,
    [logoutSuccess]: handleLogoutSuccess,
    [signUpSuccess]: handleLoginSuccess,
    [updateSession]: handleUpdateSession,
});
