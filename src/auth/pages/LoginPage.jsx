import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startLoginWithEmailPassword, startGoogleSignIn } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";

const formData = {
  email: 'julian@gmail.com',
  password: 'password',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
}

export const LoginPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector(state => state.auth);

  const {formState, email, password, onInputChange, isFormValid, emailValid, passwordValid} = useForm(formData, formValidations);

  const isCheckingAuthenticating = useMemo( ()=> status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSignIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn());
  }

  return (

    <AuthLayout title='Ingresar'>
        <form aria-label="submit-form" onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">

          <Grid container>
            <Grid item xs={ 12 }sx={{ mt: 2}}>
              <TextField 
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 }sx={{ mt: 2}}>

              <TextField 
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
                inputProps={{
                  'data-testid': 'password'
                }}
              />
            </Grid>

            <Grid container sx={{ mt:1 }} display={ errorMessage ? '' : 'none'}>

              <Grid  item xs={12}>
                  <Alert severity="error" >
                    {errorMessage}
                  </Alert>
                
                </Grid>

            </Grid>

           


            <Grid container spacing={2} sx={{ mb:2, mt:1 }}>
              

              <Grid item xs={12} sm={6}>

                <Button type="submit" variant="contained" fullWidth
                  disabled={isCheckingAuthenticating} >
                  <Typography sx={{ ml: 1}}>
                    Login
                  </Typography>
                </Button>

              </Grid>

              <Grid item xs={12} sm={6}>

                <Button 
                  variant="contained" 
                  fullWidth 
                  aria-label="google-btn"
                  onClick={onGoogleSignIn}
                  disabled={isCheckingAuthenticating}
                >
                  <Google/>

                  <Typography sx={{ ml: 1}}>
                    Google
                  </Typography>
                </Button>

              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>

              <Link component={RouterLink} color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
               
            </Grid>

          </Grid>

        </form>

    </AuthLayout>
   

  )
}
