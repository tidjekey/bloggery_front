import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { BrandVk, BrandInstagram, BrandYoutube } from 'tabler-icons-react';

import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import('@tabler/core/dist/js/tabler.min.js');

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default function Login() {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <body class="border-top-wide border-primary d-flex flex-column theme-light">
            <div class="page page-center">
                <div class="container container-tight py-4">
                    <div class="text-center mb-4">
                        <a href="/" class="navbar-brand navbar-brand-autodark"><img src="/logo.png" height="36" alt=""></img></a>
                    </div>
                    <div class="card card-md">
                        <div class="card-body">
                            <h2 class="h2 text-center mb-4">Login to your account</h2>
                            {message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                            <Form onSubmit={handleLogin} ref={form}>
                                <div class="mb-3">
                                    <label class="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Ivan"
                                        autocomplete="off"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    ></input>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">
                                        Password
                                        <span class="form-label-description">
                                        </span>
                                    </label>
                                    <input type="password" name="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} className="form-control"  placeholder="Your password" autocomplete="off"></input>

                                </div>
                                <div class="mb-2">
                                    <label class="form-check">
                                        <input type="checkbox" class="form-check-input"></input>
                                        <span class="form-check-label">Remember me on this device</span>
                                    </label>
                                </div>
                                <div class="form-footer">
                                    <button type="submit" class="btn btn-primary w-100" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        Sign in</button>
                                </div>
                                
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </div>
                        <div class="hr-text">or</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12"><a href="/api/auth/vkontakte" class="btn btn-white w-100 mb-2">
                                    <BrandVk size="24" className="icon" />
                                    Войти через VK
                                </a></div>
                                <div class="col-12"><a href="/api/auth/instagram" class="btn btn-white w-100">
                                    <BrandInstagram size="24" className="icon" />
                                    Войти через Instagram
                                </a></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-muted mt-3">
                        Еще нет аккаунта? <a href="/register" tabindex="-1">Регистрация</a>
                    </div>
                </div>
            </div>
        </body>
    )
}