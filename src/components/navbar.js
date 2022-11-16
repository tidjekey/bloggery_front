import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { Ad2, Messages, PigMoney, Users, Link as TLink } from "tabler-icons-react";

export default function Navbar(props) {
    const currentUser = AuthService.getCurrentUser();
    
    return (
        <>
            <header className="navbar navbar-expand-md navbar-light d-print-none">
                <div className="container-xl">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h1 className="navbar-brand d-none-navbar-horizontal pe-0 pe-md-3">
                        <Link to="/"><img src="/logo.png" height="32" alt="Bloggery logo" className="navbar-brand-image"></img></Link>
                    </h1>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                                <span className="avatar avatar-sm" style={{backgroundImage: "url(/avatar.png)"}}></span>
                                <div className="d-none d-xl-block ps-2">
                                    <div>{currentUser ? currentUser.username : "not logged in"}</div>
                                    <div className="mt-1 small text-muted">User</div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <Link to="/user" className="dropdown-item">Профиль</Link>
                                <Link to="/wallet" className="dropdown-item">Кошелёк: 100 <PigMoney /> </Link>
                    
                                <div className="dropdown-divider"></div>
                               
                                <button 
                                    className="dropdown-item" 
                                    onClick={()=>{AuthService.logout()}}>
                                        Выйти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="navbar-expand-md">
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="navbar navbar-light">
                        <div className="container-xl">
                            <ul className="navbar-nav">
                                <li className={"nav-item "+(props.home ? "active" : "")}>
                                <Link to="/" className="nav-link" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="5 12 3 12 12 3 21 12 19 12"></polyline><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path></svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Главная
                                        </span>
                                    </Link>
                                </li>
                                <li className={"nav-item "+(props.bloggers ? "active" : "")}>
                                    <Link to="/bloggers" className="nav-link" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block"><Users /></span>
                                        <span className="nav-link-title">
                                            Блогеры
                                        </span>
                                    </Link>
                                </li>
                                <li className={"nav-item "+(props.campaigns ? "active" : "")}>
                                    <Link to="/campaigns" className="nav-link" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block"><Ad2 /></span>
                                        <span className="nav-link-title">
                                            Рекламные кампании
                                        </span>
                                    </Link>
                                </li>
                                <li className={"nav-item "+(props.links ? "active" : "")}>
                                    <Link to="/links" className="nav-link" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block"><TLink /></span>
                                        <span className="nav-link-title">
                                            Ссылки
                                        </span>
                                    </Link>
                                </li>
                                <li className={"nav-item "+(props.support ? "active" : "")}>
                                    <Link to="/support" className="nav-link" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block"><Messages /></span>
                                        <span className="nav-link-title">
                                            Поддержка
                                        </span>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}