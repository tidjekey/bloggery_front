import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';

import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import { useRef, useEffect } from 'react';

import AuthService from '../../services/auth.service';
import axios from 'axios';


export default function Admin() {

    const wrapperRef = useRef(null);

    const changeRole = async (id, role) => {
        await axios.put(( process.env.REACT_APP_BACKEND_API || "http://localhost:8080/api/" ) +"admin/users/update", { id: id, role: role }, { withCredentials: true /*, headers: {
            "x-access-token": AuthService.getCurrentUser().accessToken
          }*/ });

          grid.forceRender();
    }

    const grid = new Grid({
        columns: ['Name', 'Email', { 
            name: 'Role',
            //formatter: (cell, row) => _(<button onClick={()=>alert("penis")}>{row.cells[0].data} - {row.cells[1].data}</button>)
           
          },],
        data: [
        ],
        className: {
            td: 'my-td-class',
            table: 'table table-vcenter card-table ',
            footer: 'card-footer d-flex align-items-center datatable',
            pagination: 'pagination pagination-sm m-0 ms-auto',
            paginationSummary: 'text-muted text-sm me-auto',
            paginationButton: 'page-item page-link',
            paginationButtonCurrent: 'page-item page-link active',
        },
        pagination: {
            enabled: true,
            limit: 10,
            summary: false
        },
        server: {
            url: process.env.REACT_APP_BACKEND_API+'admin/users',
            headers: {'x-access-token': AuthService.getCurrentUser().accessToken},
            then: data => data.map(card => [
                card.username, card.email, 
                _(<button className={""} onClick={() => changeRole(card._id, (card.role==8?1:8))}>{card.role} (change)</button>)
            ]),
            handle: (res) => {
                // no matching records found
                if (res.status === 404) return {data: []};
                if (res.ok) return res.json();

                throw Error('oh no :(');
            },
        },
    });

    useEffect(() => {
        grid.render(wrapperRef.current);
    });


    return (
        <div class="page">
            <Navbar></Navbar>
            <div class="page-wrapper">
                <PageHeader></PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="card">
                            <div class="table-responsive">
                                <div ref={wrapperRef} />
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}