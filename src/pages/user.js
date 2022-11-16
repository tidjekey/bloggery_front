import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';

import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';

import { toast } from 'react-hot-toast';

export default function User() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + `user/profile`, { withCredentials: true }).then(response => {
            setUser(response.data);
            console.log(response.data)
            setLoading(false);
        })
    }, []);

    const setField = (field, value) => {
        setUser({ ...user, [field]: value });
    }

    const updateUser = () => {
        axios.put(process.env.REACT_APP_BACKEND_API + `user/update`, user, { withCredentials: true }).then(response => {
            console.log(response.data)
            toast.success("Профиль успешно обновлен");
        })
    }

    return (
        <div className="page">
            <Navbar></Navbar>
            <div className="page-wrapper">
                <PageHeader title="Профиль"></PageHeader>
                <div className="page-body">
                    <div className="container-xl">
                        {loading && <div className="spinner-border" role="status" />}
                        {!loading && <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Настройка профиля</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control" value={user.username} disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="text" className="form-control" value={user.email} disabled />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">ФИО</label>
                                            <input type="text" className="form-control" value={user.fullname} onChange={e => setField("fullname", e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Город</label>
                                            <input type="text" className="form-control" value={user.city} onChange={e => setField("city", e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Номер телефона</label>
                                            <input type="text" className="form-control" value={user.phone} onChange={e => setField("phone", e.target.value)} />
                                        </div>

                                        <label className="form-label">Тип аккаунта</label>
                                        <div className="form-selectgroup-boxes row mb-3">
                                            <div className="col-lg-4">
                                                <label className="form-selectgroup-item">
                                                    <input type="radio" name="report-type" value="1" className="form-selectgroup-input" checked={user.accType == 1 ? true : false} onChange={e => setField("accType", e.target.value)} />
                                                    <span className="form-selectgroup-label d-flex align-items-center p-3">
                                                        <span className="me-3">
                                                            <span className="form-selectgroup-check"></span>
                                                        </span>
                                                        <span className="form-selectgroup-label-content">
                                                            <span className="form-selectgroup-title strong mb-1">Блогер</span>
                                                            <span className="d-block text-muted">Я хочу получать рекламные заказы</span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="form-selectgroup-item">
                                                    <input type="radio" name="report-type" value="2" className="form-selectgroup-input" checked={user.accType == 2 ? true : false} onChange={e => setField("accType", e.target.value)} />
                                                    <span className="form-selectgroup-label d-flex align-items-center p-3">
                                                        <span className="me-3">
                                                            <span className="form-selectgroup-check"></span>
                                                        </span>
                                                        <span className="form-selectgroup-label-content">
                                                            <span className="form-selectgroup-title strong mb-1">Рекламодатель</span>
                                                            <span className="d-block text-muted">Я хочу найти исполнителей</span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="form-selectgroup-item">
                                                    <input type="radio" name="report-type" value="3" className="form-selectgroup-input" checked={user.accType == 3 ? true : false} onChange={e => setField("accType", e.target.value)} />
                                                    <span className="form-selectgroup-label d-flex align-items-center p-3">
                                                        <span className="me-3">
                                                            <span className="form-selectgroup-check"></span>
                                                        </span>
                                                        <span className="form-selectgroup-label-content">
                                                            <span className="form-selectgroup-title strong mb-1">Агенство</span>
                                                            <span className="d-block text-muted"><br /><br /></span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Почтовые уведомления</label>
                                            <label className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <span className="form-check-label">
                                                    Новости платформы
                                                </span>
                                                <span className="form-check-description">
                                                    Обновления функций, статистика
                                                </span>
                                            </label>
                                            <label className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <span className="form-check-label">
                                                    Сервисные уведомления
                                                </span>
                                                <span className="form-check-description">
                                                    Сообщения от заказчиков
                                                </span>
                                            </label>
                                            <label className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <span className="form-check-label">
                                                    Рекламная рассылка
                                                </span>
                                            </label>
                                        </div>


                                    </div>
                                    <div className="card-footer text-end">
                                        <div className="d-flex">
                                            <button type="submit" className="btn btn-primary ms-auto" onClick={updateUser}>Сохранить</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4">

                            </div>

                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}