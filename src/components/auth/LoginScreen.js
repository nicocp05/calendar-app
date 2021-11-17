import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { authStartLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginName: '',
        loginPassword: ''
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        registerName: '',
        registerPassword1: '',
        registerPassword2: ''
    });

    const { registerName, registerPassword1, registerPassword2 } = formRegisterValues;

    const { loginName, loginPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( authStartLogin( loginName, loginPassword ) );
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if( registerPassword1 !== registerPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
        }

        dispatch( startRegister( registerName, registerPassword1 ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name="loginName"
                                value={ loginName }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name="registerName"
                                value={ registerName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword1"
                                value={ registerPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}