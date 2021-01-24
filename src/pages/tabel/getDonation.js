
import { useState, useEffect } from "react"
import Layout from "../../layout"
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom"


function FormTabel(props) {
    const act = "tabelgetdonation"
    const id = props.match.params.id
    const [donasi, setDonasi] = useState([])
    const [campaign, setCampaign] = useState([])
    const [ispoen, setIsopen] = useState(false)
    const [loading, setLoading] = useState(true)
    // const [ispoenaksi, setIsopenaksi] = useState(false)
    // const [isaksi, setIsaksi] = useState(false)
    // const [isShowaksi, setIsshowaksi] = useState([])
    var banyakitem = 0
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/getDonation?token=${token}&id_campaign=${id}`).then((res) => res.json()).then((parsedJson) => parsedJson.map(doc => (
            {
                id: doc.id,
                idcamp: doc.id_campaign,
                nama: doc.name,
                amount: doc.amount,
                email: doc.email,
                nohp: doc.phone_number,
            }
        ))).then(items => {
            setDonasi(items)
            setLoading(false)
            banyakitem = items.length
            const arritem = []
            for (var i = 0; i < banyakitem; i++) {
                arritem.push(false)
            }
            // setIsshowaksi(arritem)
        })
        fetch(`https://donasi.aqlpeduli.or.id/getCampaign?token=${token}`).then(res => res.json()).then(res2 => {
            setCampaign(res2)
        })
    }, [])
    const toggleOpen = () => {
        setIsopen(prev => !prev)
    }
    // const toggleAksiOpen = (index) => {
    //     const arritemaksi = isShowaksi
    //     arritemaksi[index] = !arritemaksi[index]
    //     setIsshowaksi(arritemaksi)
    //     setIsaksi(prev => !prev)
    // }
    // const editAksiModal = () => setIsopenaksi(prev => !prev)
    const menuClass = `dropdown-menu${ispoen ? " show" : ""}`;
    // const menuAksiClass = `dropdown-menu${isaksi ? " show" : ""}`;
    return (
        <>
            <Layout active={act}>
                <h2>
                    Tabel Donasi
                </h2>
                <div className="dropdown" onClick={toggleOpen}>
                    <a className="btn btn-success dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Id Campaign
                    </a>
                    <div className={menuClass} id="dd-menu" aria-labelledby="dropdownMenuLink">
                        {
                            campaign.map((doc, idx) => {
                                return (
                                    <a className="dropdown-item" key={idx} href={`/tabel/getDonation/${doc.id}`}>{doc.id}: {doc.campaign_name}</a>
                                )
                            })
                        }
                        {/* <a className="dropdown-item" href={`/tabel/getDonation/${0}`}>0</a>
                        <a className="dropdown-item" href={`/tabel/getDonation/${1}`}>1</a>
                        <a className="dropdown-item" href={`/tabel/getDonation/${2}`}>2</a> */}
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id_campaign</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">Nomor Handphone</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ?
                            <div className="position-absolute bottom-0 end-50">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            donasi.map((doc, idx) => {
                                return (<tr key={idx}>
                            <th scope="row">{doc.id}</th>
                            <td>{doc.idcamp}</td>
                            <td>{doc.nama}</td>
                            <td>{doc.email}</td>
                            <td>{doc.nohp}</td>
                            <td>{doc.amount}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    {/* <div className="dropstart" onClick={() => toggleAksiOpen(idx)}> */}
                                    <Link to={{
                                        pathname: `/tabel/getDonation/detail/${doc.idcamp}`,
                                        state: {
                                            data: doc
                                        }
                                    }}>
                                        <button type="button" className="btn btn-warning" /*className="btn btn-warning mr-1 dropdown-toggle"*/ aria-haspopup="true" aria-expanded="false"><i className="fa fa-cog" /*role="button" id="dropdownAksiLink" data-toggle="dropdown"*/></i></button>
                                    </Link>
                                    {/* {isShowaksi[idx] ?
                                                    <div className={menuAksiClass} id="dd-menu" aria-labelledby="dropdownMenuLink">
                                                        <a className="dropdown-item" key={idx} onClick={editAksiModal} data-bs-toggle="modal" data-bs-target="#editAksiDonasi" style={{ cursor: `pointer` }}>Edit</a>
                                                        <a className="dropdown-item" key={idx} href={`/tabel/getDonation/${doc.id}`}>Hapus</a>
                                                    </div>
                                                    :
                                                    null
                                                } */}
                                    {/* </div> */}
                                    <button type="button" className="btn btn-success"><i className="fa fa-whatsapp"></i></button>
                                    <button type="button" className="btn btn-danger"><i className="fa fa-envelope"></i></button>
                                </div>
                                {/* <Modal show={ispoenaksi} onHide={editAksiModal}>
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Konfirmasi hapus</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={editAksiModal} />
                                            </div>
                                            <Modal.Body>
                                                <form>
                                                    <div className="mb-3">
                                                        <label htmlFor="recipient-name" className="col-form-label">Nama:</label>
                                                        <input type="text" className="form-control" id="recipient-name" value={donasi[idx].nama} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="message-text" className="col-form-label">Email:</label>
                                                        <input className="form-control" id="message-text" value={donasi[idx].email} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="message-text" className="col-form-label">No handphone:</label>
                                                        <input className="form-control" id="message-text" value={donasi[idx].nohp} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="message-text" className="col-form-label">Amount:</label>
                                                        <input type="number" className="form-control" id="message-text" value={donasi[idx].amount} />
                                                    </div>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={editAksiModal}>Tutup</button>
                                                <button type="button" className="btn btn-primary">Submit</button>
                                            </Modal.Footer>
                                        </Modal> */}
                            </td>
                        </tr>)
                            })
                        }
                    </tbody>
                </table>
            </Layout>
        </>
    )
}

export default FormTabel