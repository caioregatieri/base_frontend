import React, { useState } from 'react';
import { useHistory  } from "react-router-dom";

import api from '~/services/api';

import './styles.css';

export default function() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    }); 

    const [error, setError] = useState('');

    const history = useHistory();

    const access_token = localStorage.getItem('access_token');
    if (access_token) history.push('/admin');

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
      }

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await api.post(`/auth/login`, form);
            console.log(response);
            localStorage.setItem('access_token', response.data.access_token);
            history.push('/admin/schedules');
        } catch (error) {
            setError('Erro ao fazer login. tente novamente...');
        }
    }

    return  (
        <div className="container">
            <div className="row">
                <div className="span12">
                    <form className="form-horizontal" onSubmit={onSubmit}>
                        <fieldset>
                            <div id="legend">
                                <legend className="">Login</legend>
                            </div>
                            <div className="control-group">
                                <label className="control-label">E-mail</label>
                                <div className="controls">
                                    <input type="email" name="email" placeholder="" className="input-xlarge form-control" onChange={handleForm} value={form.email} required />
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label">Senha</label>
                                <div className="controls">
                                    <input type="password" name="password" placeholder="" className="input-xlarge form-control" onChange={handleForm} value={form.password} required />
                                </div>
                            </div>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <span>{error}</span>
                                </div>
                            )}  
                            <div className="control-group">
                                <div className="controls">
                                    <button className="btn btn-primary btn-login">Login</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}