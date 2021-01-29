import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function Sidebar(props) {
    const [down, setDown] = useState(false)
    const [camp, setCamp] = useState([])
    const setdown = () => {
        setDown(prev => !prev)
    }
    useEffect(() => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc"
        fetch(`https://donasi.aqlpeduli.or.id/getCampaign?token=${token}`).then(res => res.json()).then(resjson => {
            setCamp(resjson)
        })
        var link = document.getElementsByClassName("nav-link")
        for (var i = 0; i < link.length; i++) {
            var cur = link[i];
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
                            {camp.map((doc, idx) => {
                                if (idx == 0) {
                                    return (
                                        <Link className="nav-link nav-tabel tabelgetdonation" key={idx} to={{
                                            pathname: `/tabel/getDonation/${doc.id}`,
                                            state: {
                                                active: 'tabelgetdonation',
                                            }
                                        }}>getDonation
                                        </Link>
                                    )
                                }
                            })
                            }
                            <Link className="nav-link nav-tabel tabelgetcampaign" to={{
                                pathname: "/tabel/getCampaign",
                                state: {
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