import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';


import { _ } from "gridjs-react";
import { useRef, useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import AuthService from '../../services/auth.service';
import { ExternalLink } from 'tabler-icons-react';

import { Grid } from "gridjs-react";
import axios from 'axios';

export default function Campaigns() {

    const [filter, setFilter] = useState("all");

    const [data, setData] = useState([]);

    useEffect(() => {
        sf("all");
    }, []);

    const sf = (f) => {
        setFilter(f)
        console.log(f)

        axios.get(process.env.REACT_APP_BACKEND_API+`campaigns?filter=${f}`, {withCredentials:true}).then(response => {
            console.log(response.data)
            setData(response.data.map(card => [
                _(<a href={"/campaign/" + card._id} > {card.title} </a>),
                _(<>{card.platform} <a href={card.link}><ExternalLink /></a></>),
                card.price,
                _((card.user == AuthService.getCurrentUser().id) ? <button className={"btn btn-sm btn-outline-primary"} >Редактировать</button> : <button className={"btn btn-sm btn-outline-success"} >Принять</button>)
            ]))
        })
    }

    return (
        <div class="page">
            <Navbar campaigns></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Рекламные кампании">
                    <div class="btn-list">
                        <Link to="/campaign/create" className={"btn btn-primary d-sm-inline-block"} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Создать оффер
                        </Link>
                    </div>
                </PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="btn-group w-100">
                                    <button className={"btn " + (filter == "all" ? "btn-primary" : "")} onClick={() => sf("all")}>Все</button>
                                    <button className={"btn " + (filter == "my" ? "btn-primary" : "")} onClick={() => sf("my")}>Мои офферы</button>
                                    <button className={"btn " + (filter == "vk" ? "btn-primary" : "")} onClick={() => sf("vk")}>VK</button>
                                    <button className={"btn " + (filter == "instagram" ? "btn-primary" : "")} onClick={() => sf("instagram")}>Instagram</button>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="table-responsive">
                                <Grid
                                    data={data}
                                    columns={['Username', 'Платформа', 'Цена', 'Действия']}
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