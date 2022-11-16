import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';


import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewBlogger() {

    let { id } = useParams();
    const [blogger, setBlogger] = useState({})

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + `bloggers/${id}`, { withCredentials: true }).then((res) => {
            setBlogger(res.data)
        })
        
    }, [id]);


    return (
        <div class="page">
            <Navbar bloggers></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Блогер">
                    <div class="btn-list">
                        <a href="#" class="btn btn-primary d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Редактировать
                        </a>
                    </div>
                </PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="card">
                            <div className='card-body'>
                                {id}
                                {JSON.stringify(blogger) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}