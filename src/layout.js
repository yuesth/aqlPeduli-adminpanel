import { useHistory } from "react-router-dom"
import Sidebar from "./sidebar"

function Layout({ active, children }) {
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    const onSignout = ()=>{
        sessionStorage.removeItem('token')
        fetch(`https://donasi.aqlpeduli.or.id/api/logout`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: tok})
        })
        .then(res => res.json())
        .then(res2 => {
            hist.push('/')
        })
    }
    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/dashboard">AQL Peduli</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                {/* <input className="form-control form-control-dark w-80" type="text" placeholder="Search" aria-label="Search" /> */}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" onClick={onSignout} style={{cursor:`pointer`}} >Sign out</a>
                    </li>
                </ul>
            </header>
            <Sidebar active={active}></Sidebar>

            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 col-lg-10 px-4 py-4 ms-sm-auto position-relative">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout