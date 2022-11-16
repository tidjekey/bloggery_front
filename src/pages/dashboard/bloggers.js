import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';


import { _, Grid } from "gridjs-react";
import { useRef, useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthService from '../../services/auth.service';
import { ExternalLink } from 'tabler-icons-react';

export default function Bloggers() {
    let navigate = useNavigate();
    const wrapperRef = useRef(null);

    const [filter, setFilter] = useState("all");


    useEffect(() => {
        sf("all");
    }, []);

    const [data, setData] = useState([]);

    const sf = (f) => {
        setFilter(f)
        axios.get(process.env.REACT_APP_BACKEND_API + `bloggers?filter=${f}`, { withCredentials: true }).then(response => {
            console.log(response.data)
            setData(response.data.map(card => [
                _(<a href={"/blogger/" + card._id} > {card.username} </a>),
                _(<>{card.platform} <a href={card.link}><ExternalLink /></a></>),
                card.themes, // TODO
                card.price,
                _((card.user == AuthService.getCurrentUser().id) ? <button className={"btn btn-sm btn-outline-primary"} >Редактировать</button> : <button className={"btn btn-sm btn-outline-success"} onClick={e=>createOffer(card._id)}>Предложить рекламу</button>)
            ]))
        })
    }

    const createOffer = (id) => {
        navigate(`/campaign/create/to/${id}`);
    }

    return (
        <div class="page">
            <Navbar bloggers></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Блогеры">
                    <div class="btn-list">
                        <Link to="/blogger/create" className={"btn btn-primary d-sm-inline-block"} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Регистрация нового блогера
                        </Link>
                    </div>
                </PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="btn-group w-100">
                                    <button className={"btn " + (filter == "all" ? "btn-primary" : "")} onClick={() => sf("all")}>Все</button>
                                    <button className={"btn " + (filter == "my" ? "btn-primary" : "")} onClick={() => sf("my")}>Мои аккаунты</button>
                                    <button className={"btn " + (filter == "vk" ? "btn-primary" : "")} onClick={() => sf("vk")}>VK</button>
                                    <button className={"btn " + (filter == "instagram" ? "btn-primary" : "")} onClick={() => sf("instagram")}>Instagram</button>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="table-responsive">
                                <Grid
                                    data={data}
                                    columns={['Username', 'Платформа', 'Тематика' , 'Цена', 'Действия']}
                                    className={{
                                        td: 'my-td-class',
                                        table: 'table table-vcenter card-table ',
                                        footer: 'card-footer d-flex align-items-center datatable',
                                        pagination: 'pagination pagination-sm m-0 ms-auto',
                                        paginationSummary: 'text-muted text-sm me-auto',
                                        paginationButton: 'page-item page-link',
                                        paginationButtonCurrent: 'page-item page-link active',
                                    }}
                                    pagination={{
                                        enabled: true,
                                        limit: 10,
                                        summary: false,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}