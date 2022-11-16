import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../components/navbar';
import PageHeader from '../components/page-header';

import { useRef, useEffect } from 'react';

import AuthService from '../services/auth.service';

export default function Wallet() {



    return (
        <div class="page">
            <Navbar></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Кошелек"></PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="card">
                            {localStorage.getItem("user")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}