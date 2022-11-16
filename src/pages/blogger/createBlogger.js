import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';

import { useRef, useEffect,useState } from 'react';


import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';
import Select from 'react-select'
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function CreateBlogger() {
    let navigate = useNavigate();


    useEffect(() => {

    });

    const platforms = [
        { value: 'vk', label: 'VK' },
        { value: 'instagram', label: 'Instagram' },
    ]

    const themes = [
        { value: 'family', label: 'Семейный блог' },
        { value: 'psychology', label: 'Психология' },
        { value: 'astrology', label: 'Астрология' },
        { value: 'sport', label: 'Семейный блог' },
        { value: 'finance', label: 'Финансы' },
        { value: 'fashion', label: 'Мода' },
        // TODO
      ]

    const [platform, setPlatform] = useState("")

    const [theme, setTheme] = useState([])
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    
    const registerBlogger = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + 'bloggers/create', {
            platform: platform,
            username: username,
            link: link,
            price: price,
            description: description,
            themes: theme,
        }, { withCredentials: true }).then((res) => {
            navigate(`/blogger/${res.data.id}`, { replace: true });
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }

    const handleMultiSelect = (chices) => {
        let a = []
        chices.map( ( {value, name} ) => {
            a.push(value)
        })

        console.log(a)
        setTheme(a)
    };


    return (
        <div class="page">
            <Toaster />
            <Navbar bloggers></Navbar>
            <div class="page-wrapper">
                <PageHeader title="Регистрация блогера">
                    
                </PageHeader>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="card">
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label class="form-label">Username</label>
                                                <input type="text" class="form-control" placeholder="Input placeholder" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label class="form-label">Платформа</label>
                                                <Select  options={platforms} onChange={(choice) => setPlatform(choice.value)}
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                          ...theme.colors,
                                                          neutral0: '#1a2234',
                                                          neutral20: '#243049',
                                                          //neutral30: '#243049',
                                                          neutral80: '#fff',
                                                          primary25: '#206bc4',
                                                          primary: '#206bc4',
                                                        }
                                                    })}
                                                    styles={{
                                                        menu: (provided, state) => ({
                                                            ...provided,
                                                            backgroundColor: '#242d42',
                                                            border: '1px solid white',
                                                          }),
                                                        option: (provided, state) => ({
                                                            ...provided,
                                                            color: 'white',
                                                          }),
                                                    }}
                                                    />
                                            </div>
                                            <div className="mb-3">
                                                <label class="form-label">Ссылка</label>
                                                <input type="text" class="form-control" placeholder="Input placeholder" value={link} onChange={(e) => setLink(e.target.value)} />
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label class="form-label">Описание</label>
                                                <input type="text" class="form-control" placeholder="Input placeholder" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label class="form-label">Тематика</label>
                                                <Select options={themes} isMulti onChange={(choice) => {handleMultiSelect(choice)}}
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                          ...theme.colors,
                                                          neutral0: '#1a2234',
                                                          neutral20: '#243049',
                                                          neutral10: '#243049',
                                                          neutral80: '#fff',
                                                          primary25: '#206bc4',
                                                          primary: '#206bc4',
                                                        }
                                                    })}
                                                    styles={{
                                                        menu: (provided, state) => ({
                                                            ...provided,
                                                            backgroundColor: '#242d42',
                                                            border: '1px solid white',
                                                          }),
                                                        option: (provided, state) => ({
                                                            ...provided,
                                                            color: 'white',
                                                          }),
                                                    }}
                                                    />
                                            </div>

                                            <div className="mb-3">
                                                <label class="form-label">Цена</label>
                                                <input type="text" class="form-control" placeholder="Input placeholder" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label class="form-selectgroup-item flex-fill">

                                                <div class=" d-flex align-items-center p-3">

                                                    <div class="form-selectgroup-label-content d-flex align-items-center">
                                                        <span class="avatar me-3" style={{ backgroundImage: "url(/avatar.png)" }}></span>
                                                        <div>
                                                            <div class="font-weight-medium">Microsoft Windows</div>
                                                            <div class="text-muted">UI Designer  {platform}</div>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>

                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="card-footer">
                                <div class="row align-items-center">
                                    <div class="col">Learn more about <a href="#">Project ID</a></div>
                                    <div class="col-auto">
                                        <button class="btn btn-primary" onClick={()=>registerBlogger()}>
                                            Завершить регистрацию
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}