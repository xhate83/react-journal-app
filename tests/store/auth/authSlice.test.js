import { authSlice, login, logout, checkingCredentials } from "../../../src/store/auth/authSlice";
import { initialState, testUser, authenticatedState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => { 

    test('debe regresar el estado inicial y llamarse auth', () => { 
        
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('debe realizar la autenticacion', () => { 
        const state = authSlice.reducer(initialState, login(testUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: testUser.uid,
            email: testUser.email,
            displayName: testUser.displayName,
            photoURL: testUser.photoURL,
            errorMessage: null
        })

    })

    test('debe realiza el logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    })

    test('debe realiza el logout con argumentos', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    })

    test('debe cambiar el status a checking', () => {

        const errorMessage = 'Credenciales no validas';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    })
})