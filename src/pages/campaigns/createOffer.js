import '@tabler/core/dist/css/tabler.min.css';
//import '@tabler/icons/iconfont/tabler-icons.min.css';
import '@tabler/core/dist/js/tabler.min.js';
import '../../dropzone.css';

import { useRef, useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import PageHeader from '../../components/page-header';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams  } from "react-router-dom";
import DropzoneComponent from 'react-dropzone-component';
import Select from '../../components/select';

export default function CreateOffer() {
    let navigate = useNavigate();
    let { id, exclusive } = useParams();

    useEffect(() => {
        if(exclusive)
            setExcluseiveTo([exclusive])
    },[exclusive]);

    const platforms = [
        { value: 'vk', label: 'VK' },
        { value: 'instagram', label: 'Instagram' },
    ]

    const [platform, setPlatform] = useState("")

    const [theme, setTheme] = useState([])
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [excluseiveTo, setExcluseiveTo] = useState("");
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);
    const [createLink, setCreateLink] = useState(false);
    const [hidden, setHidden] = useState(true);

    const create = () => {
        axios.post(process.env.REACT_APP_BACKEND_API + 'campaigns/create', {
            platform: platform,
            hidden: hidden,
            excluseiveTo: excluseiveTo,
            link: link,
            price: price,
            description: description,
            title: title,
            createLink: createLink,
            // HOW TO HANDLE IMAEGES?
        }, { withCredentials: true }).then((res) => {
            navigate(`/campaign/${res.data.id}`, { replace: true });
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }

    const handleMultiSelect = (chices) => {
        let a = []
        chices.map(({ value, name }) => {
            a.push(value)
        })

        console.log(a)
        setTheme(a)
    };


    var componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: 'no-url'
    };
    var djsConfig = { autoProcessQueue: false }
    var eventHandlers = { addedfile: (file) => console.log(file) }

    return (
        <div className="page">
            <Toaster />
            <Navbar campaigns></Navbar>
            <div className="page-wrapper">
                <PageHeader title="Создание заказа">

                </PageHeader>
                <div className="page-body">
                    <div className="container-xl">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Платформа</label>
                                                <Select options={platforms} onChange={(choice) => setPlatform(choice.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Название</label>
                                                <input type="text" className="form-control" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Видимость</label>
                                                { !exclusive && 
                                                <label className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={hidden} onChange={(e) => setHidden(!hidden)} />
                                                    <span className="form-check-label">Скрыто для всех</span>
                                                </label> }
                                                { exclusive && <>
                                                    <span>Предложения для блогера</span>
                                                    {excluseiveTo[0]}
                                                </> }
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Описание</label>
                                                <textarea type="text" className="form-control" rows="6" placeholder="ТЗ, описание креатива" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Бюджет</label>
                                                <input type="text" className="form-control" placeholder="Input placeholder" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Дедлайны</label>
                                                <input type="text" className="form-control" placeholder="Input placeholder" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Ссылка</label>
                                                <input type="text" className="form-control" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} />
                                                <label className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={createLink} onChange={(e) => setCreateLink(!createLink)} />
                                                    <span className="form-check-label">Создать короткую ссылку</span>
                                                </label>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label">Материалы</label>
                                                <DropzoneComponent config={componentConfig}
                                                    eventHandlers={eventHandlers}
                                                    djsConfig={djsConfig} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-selectgroup-item flex-fill">

                                                <div className=" d-flex align-items-center p-3">

                                                    <div className="form-selectgroup-label-content d-flex align-items-center">
                                                        <span className="avatar me-3" style={{ backgroundImage: "url(/avatar.png)" }}></span>
                                                        <div>
                                                            <div className="font-weight-medium">Microsoft Windows</div>
                                                            <div className="text-muted">UI Designer  {platform}</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </label>

                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="row align-items-center">
                                    <div className="col">Learn more about <a href="#">Project ID</a></div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary" onClick={() => create()}>
                                            Разместить оффер
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