import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function Sidebar(props) {
    const [down, setDown] = useState(false)
    const setdown = () => {
        setDown(prev => !prev)
    }
    useEffect(() => {
        var link = document.getElementsByClassName("nav-link")
        for (var i = 0; i < link.length; i++) {
            var cur = link[i];
            console.log(cur.className)
            if (cur.className.includes(props.active)) {
                cur.classList.add("active")
            }
        }
    })
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link dashboard" aria-current="page" to={{
                            pathname: "/dashboard",
                            state: {
                                active: 'dashboard'
                            }
                        }}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link qrcodewa" aria-current="page" to={{
                            pathname: "/qr-code-wa",
                            state: {
                                active: 'qrcodewa'
                            }
                        }}>
                            Qr Code
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={setdown} data-bs-toggle="collapse" data-bs-target="#collTabel" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Tabel  {down ?
                                <i className="ml-2 fa fa-caret-down" />
                                :
                                <i className="ml-2 fa fa-caret-up" />}
                        </a>
                        <div id="collTabel" className="collapse pl-3 nav-link show">
                            <Link className="nav-link nav-tabel tabelgetdonation" to={{
                                pathname: `/tabel/getDonation/${0}`,
                                state: {
                                    active: 'tabelgetdonation',
                                }
                            }}>getDonation</Link>
                            <Link className="nav-link nav-tabel tabelgetcampaign" to={{
                                pathname:"/tabel/getCampaign",
                                state:{
                                    active: 'tabelgetcampaign'
                                }
                            }}>getCampaign</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar