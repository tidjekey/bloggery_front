import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';


import { _ } from "gridjs-react";
import React, { useRef, useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import AuthService from '../../services/auth.service';
import { ExternalLink } from 'tabler-icons-react';

import { Grid } from "gridjs-react";
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import toast, { Toaster } from 'react-hot-toast';

export default function Links() {
    let subtitle;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([]);

    const [slug, setSlug] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        sf("my");
    }, []);

    const sf = (f) => {
        //setFilter(f)
        console.log(f)

        axios.get(process.env.REACT_APP_BACKEND_API + `links?filter=${f}`, { withCredentials: true }).then(response => {
            console.log(response.data)
            setData(response.data.map(card => [
                _(<a href={"/link/" + card._id} >lyy.ink/{card.slug} </a>),
                card.visits,
                _(<>{card.url} <a href={card.url}><ExternalLink /></a></>),
                _(<button className={"btn btn-sm btn-outline-danger"} onClick={(e) => deleteLink(card._id)}>Удалить</button>)
            ]))
        })
    }

    const createLink = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + `links/create`, { slug: slug, url: url }, { withCredentials: true }).then(response => {
            console.log(response.data)
            toast.success("Ссылка успешно создана");
            sf("my");
            handleClose();

        }).catch(function (error) {
            toast.error(error.response.data.message);
            console.log(error.toJSON());
        });
    }

    const deleteLink = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_API + `links/delete/${id}`, { withCredentials: true }).then(response => {
            console.log(response.data)
            toast.success("Ссылка успешно удалена");
            sf("my");
        }).catch(function (error) {
            toast.error(error.response.data.message);
            console.log(error.toJSON());
        });
    }

    return (
        <div class="page">
            <Toaster />
            <Navbar links></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Ссылки">
                    <div class="btn-list">
                        <button onClick={handleShow} className={"btn btn-primary d-sm-inline-block"} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Создать ссылку
                        </button>
                    </div>
                </PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered" backdrop={false}  >
                            <Modal.Header closeButton>
                                <Modal.Title>Создать короткую ссылку</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="mb-3">
                                            <label class="form-label">Короткая ссылка</label>
                                            <div class="input-group input-group-flat">
                                                <span class="input-group-text">
                                                    https://lyy.ink/
                                                </span>
                                                <input type="text" class="form-control ps-0" value={slug} onChange={e => setSlug(e.target.value)} autocomplete="off" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        {/*<div class="mb-3">
                                            <label class="form-label">Visibility</label>
                                            <select class="form-select">
                                                <option value="1" selected="">Private</option>
                                                <option value="2">Public</option>
                                                <option value="3">Hidden</option>
                                            </select>
                                        </div>*/}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Адрес назначения</label>
                                    <input type="text" class="form-control" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://google.com" />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn me-auto" onClick={handleClose}>
                                    Закрыть
                                </button>
                                <button className="btn btn-primary" onClick={createLink}>
                                    Создать
                                </button>
                            </Modal.Footer>
                        </Modal>
                        <div class="card">
                            <div class="table-responsive">
                                <Grid
                                    data={data}
                                    columns={['Короткая ссылка', 'Переходы', 'Назначение', 'Действия']}
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