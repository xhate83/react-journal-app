import { singInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";


export const startLoginWithEmailPassword = ( {email, password}) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({email, password});

        if( !result.ok ) return dispatch(logout({
            errorMessage: result.errorMessage
        }))
        
        dispatch(login(result));
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();

        if( !result.ok ) return dispatch(logout({
            errorMessage: result.errorMessage
        }))
        
        dispatch(login(result));
    }
}

export const startRegisterUserWithEmailPassword = ({email, password, displayName}) => {

    return async( dispatch ) => {
        dispatch(checkingCredentials());

        const {ok, errorMessage, uid, photoURL} = await registerUserWithEmailPassword({email, password, displayName});

        if( !ok ) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}));
    
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(logout())
    }
}