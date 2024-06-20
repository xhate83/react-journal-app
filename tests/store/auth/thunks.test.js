import { singInWithGoogle, loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { startLoginWithEmailPassword, startGoogleSignIn, startRegisterUserWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { testUser } from '../../fixtures/authFixtures';


jest.mock('../../../src/firebase/providers');

describe('pruebas en auth thunks', () => {
    const dispatch = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login -exito ', async () => { 
        const loginData = {ok: true, ...testUser };
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout con error', async () => { 
        const loginData = {ok: false, errorMessage: 'Error en google' };
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - exito', async () => {

        const loginData = {ok: true, ...testUser };
        const formData = {email: testUser.email, password: '123456'}

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - error', async () => {

        const loginData = {ok: false, errorMessage: 'Error en email' };
        const formData = {email: testUser.email, password: '123456'}

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));

    });

    test('startRegisterUserWithEmailPassword debe de llamar checkingCredentials y login - exito', async () => {

        const loginData = {ok: true, ...testUser };
        const formData = {email: testUser.email, password: '123456', displayName: testUser.displayName}

        await registerUserWithEmailPassword.mockResolvedValue(loginData);
        await startRegisterUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({
            uid: loginData.uid,
            displayName: loginData.displayName,
            email: loginData.email,
            photoURL: loginData.photoURL
        }
        ));

    });

    test('startRegisterUserWithEmailPassword debe de llamar checkingCredentials y login - error', async () => {

        const loginData = {ok: false, errorMessage: 'Error en email' };
        const formData = {email: testUser.email, password: '123456', displayName: testUser.displayName}

        await registerUserWithEmailPassword.mockResolvedValue(loginData);
        await startRegisterUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));

    });

    test('startLogout debe de llamar logoutFirebase, clearNotesLogout y logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout());

    });

    
})