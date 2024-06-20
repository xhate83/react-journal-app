
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password});
    }
}));

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => (fn) => fn(),
}));


const store  = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas de Login Page', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>

                    <LoginPage/>
                </MemoryRouter>

            </Provider>
        )
        
        expect(screen.getAllByText('Ingresar').length).toBeGreaterThanOrEqual(1)

    });

    test('Boton de google debe llamar el startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>

                    <LoginPage/>
                </MemoryRouter>

            </Provider>
        );
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
        
    })

    test('Submit debe llamar startLoginWithEmailPassword', () => {

        const email = 'test@gmail.comn';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>

                    <LoginPage/>
                </MemoryRouter>

            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });


        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);


        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password });

    })
})