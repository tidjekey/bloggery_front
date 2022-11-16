import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';

import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { json, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import AuthService from '../../services/auth.service';
import Select from '../../components/select';

export default function ViewOffer() {
    let { id } = useParams();
    let navigate = useNavigate();
    
    const [offer, setOffer] = useState({})
    const [loading, setLoading] = useState(true);
    const [deal, setDeal] = useState({});
    const [myBloggers, setMyBloggers] = useState([]);
    const [acceptAs, setAcceptAs] = useState("");

    useEffect(() => {
        (async () => {
        let res = await axios.get(process.env.REACT_APP_BACKEND_API + `campaigns/${id}`, { withCredentials: true })
        setOffer(res.data)
        
        let mb = await axios.get(process.env.REACT_APP_BACKEND_API + `bloggers?filter=my`, { withCredentials: true })
        setMyBloggers(mb.data.map(b => {return{label: b.username+" "+b.platform, value: b._id}}))

        getMessages();

        setLoading(false)
        })()
    }, [id]);

    const deleteOffer = () => {
        axios.delete(process.env.REACT_APP_BACKEND_API + `campaigns/${id}`, { withCredentials: true }).then((res) => {
            navigate(`/campaigns/`, { replace: true });
        })
    }

    const acceptOffer = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/accept`, { offer: id, blogger: acceptAs }, { withCredentials: true }).then((res) => {
            //setDeal(res.data)
        })
    }

    const declineOffer = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/decline`, { offer: id }, { withCredentials: true }).then((res) => {
            //setDeal(res.data)
        })
    }

    const finishOffer = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/finish`, { offer: id, deal: offer.deal._id }, { withCredentials: true }).then((res) => {
            //setDeal(res.data)
        })
    }

    const sendMessage = async () => {
        // Create offer is there is no offer
        console.log(offer.deal)
        //if(!offer.deal.status)
        //    return await axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/openDeal`, { offer: id }, { withCredentials: true })

        // If I am not tge owner of the offer, I am the blogger
        if(offer.user._id != AuthService.getCurrentUser().id){
            await axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/sendMessage`, { offer: id, to: offer.user._id, deal: offer.deal._id, text: message }, { withCredentials: true }).then((res) => {
                //setDeal(res.data)
            })
        }else{
            await axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/sendMessage`, { offer: id, to: offer.deal.blogger.user, deal: offer.deal._id, text: message }, { withCredentials: true }).then((res) => {
                //setDeal(res.data)
            })
        }
        getMessages();
        setMessage("");
    }

    const getMessages = async () => {
        let msgs = await axios.get(process.env.REACT_APP_BACKEND_API + `campaigns/${id}/messages/`, { withCredentials: true })
        setMessages(msgs.data)
    }

    const markComplete = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + `campaigns/complete`, { campaign: id }, { withCredentials: true }).then((res) => {
            //setDeal(res.data)
        })
    }

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    return (
        <div class="page">
            <Navbar campaigns></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Оффер">
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
                            {loading && <div className="spinner-border" role="status" />}
                            {!loading && 
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h2>{offer.title}</h2>
                                        <p>{offer.description}</p>
                                    {id}
                                    {JSON.stringify(offer) }
                                    {
                                        offer.started &&
                                        <>
                                        Оффер активен
                                        </>
                                    }

                                    <h3 className="mt-3">Общение</h3>
                                    
                                    <div className="list-group list-group-flush overflow-auto">
                                        {messages.map((m, i) => (
                                            <div className="list-group-item">
                                                <a href="#" className="text-body d-block">{ m.from == AuthService.getCurrentUser().id ? "Вы" : "Собеседник"}</a>
                                                <div className="text-muted text-truncate mt-n1">{m.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Сообщение" value={message} onChange={(e) => setMessage(e.target.value)} />
                                        <button className="btn btn-primary" onClick={sendMessage}>Отправить</button>
                                    </div>
                                    
                                    
                                    </div>
                                    <div className='col-md-4 divide-y-2'>
                                        <div>Заказчик: {offer.user.fullname}</div>
                                        <div>Платформа: {offer.platform}</div>
                                        <div>Бюджет: {offer.price}</div>
                                        <div>Сроки: {offer.deadline}</div>
                                        
                                        <div>Статус: {offer.deal.status || "Новый"}</div>
                                            <div>
                                            {!offer.deal.bloggerStarted && !offer.deal.bloggerDeclined && <span className="text-warning">еще не принят</span>}
                                            {offer.deal.bloggerDeclined && <span className="text-warning">отклонён исполнителем</span>}
                                            {offer.deal.bloggerStarted && !offer.deal.bloggerCompleted && <span className="text-success">принят в выполнение</span>} 
                                            {offer.deal.bloggerStarted && offer.deal.bloggerCompleted && !offer.deal.customerAccepted && <span className="text-success">Отмечен как выполненный</span>}
                                            {offer.deal.bloggerStarted && offer.deal.bloggerCompleted && offer.deal.customerAccepted && <span className="text-success">Завершен и принят</span>} 
                                            </div>
                                        { offer.deal.blogger && <div>Блогер: {offer.deal.blogger.username}</div> }
                                        { ( offer.user._id == AuthService.getCurrentUser().id && ( !offer.deal.status || offer.deal.status=="new") ) && <div><button className='btn btn-outline-danger w-100' onClick={deleteOffer}>Отменить оффер</button></div> }
                                        { ( offer.user._id != AuthService.getCurrentUser().id && ( !offer.deal.status || offer.deal.status=="new") ) && 
                                        <>
                                            <div>
                                            <label>Выберите аккаунт, на который хотите принять оффер</label>
                                            <Select options={myBloggers} onChange={(choice) => setAcceptAs(choice.value)} />
                                            <button className='btn btn-outline-success w-100' onClick={acceptOffer}>Взяться за выполнение</button>
                                            </div>
                                            <div><button className='btn btn-outline-danger w-100' onClick={declineOffer}>Отказаться от оффера</button></div>
                                            </>
                                        }
                                        { ( offer.user._id != AuthService.getCurrentUser().id && offer.deal.status=="started" /* && i am blogger */ ) &&   <div><button className='btn btn-outline-success w-100' onClick={finishOffer}>Отметить как завершенное</button></div> }
                                        { ( offer.user._id == AuthService.getCurrentUser().id && offer.deal.status=="completed" ) && <div><button className='btn btn-outline-success w-100' onClick={markComplete}>Принять как выполненное</button></div> }
                                        { ( offer.user._id == AuthService.getCurrentUser().id && offer.deal.status=="completed" ) && <div><button className='btn btn-outline-warning w-100' onClick={acceptOffer}>Открыть спор</button></div> }
                                 
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}