import { useState, useEffect, useCallback } from "react"
import Layout from "../../layout"
import Modal from "react-bootstrap/Modal"
import { useHistory, Link } from 'react-router-dom'

function FormTabel(props) {
    var act = "tabelgetcampaign"
    if (props.location.state) {
        act = props.location.state.active
    }
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    if(tok == null || tok == "null"){
        hist.push('/')
    }
    const [campaign, setCampaign] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        id: 0,
        campaign_name: '',
        target: 0,
        deadline: ''
    })
    const handleTambah = () => setOpen(prev => !prev)
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/getCampaign?token=${token}`).then((res) => res.json()).then((parsedJson) => parsedJson.map(doc => (
            {
                idcamp: doc.id,
                namacamp: doc.campaign_name,
                target: doc.target,
                terkumpul: doc.collected,
                deadline: doc.deadline
            }
        ))).then(items => {
            setCampaign(items)
            setLoading(false)
        })
    }, [])
    const handleAddCampaign = (e) => {
        fetch(`https://donasi.aqlpeduli.or.id/addCampaign?token=${token}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(res => {
            console.log(res)
            setTimeout(() => {
                if(process.env.NODE_ENV == "production"){
                    window.location.href = "https://admin-donasi.aqlpeduli.or.id/tabel/getCampaign"
                }
                else if(process.env.NODE_ENV == "development"){
                    window.location.href = "http://localhost:3000/tabel/getCampaign"
                }
            }, 1500)
        })
        e.preventDefault()
    }
    const onChangeAddCampaign = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <Layout active={act}>
                <div className="w-auto h-auto position-absolute" style={{ top: `1rem`, right: `2rem` }} onClick={handleTambah} data-bs-toggle="modal" data-bs-target="#tambahCampaignModal">
                    <button className="btn btn-primary">
                        + Tambah data
                    </button>
                </div>
                <h2>
                    Tabel Campaign
                </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">id Campaign</th>
                            <th scope="col">Nama Campaign</th>
                            <th scope="col">Target</th>
                            <th scope="col">Terkumpul</th>
                            <th scope="col">Deadline</th>
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
                            campaign.map((doc, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx+1}</th>
                                        <td style={{textAlign:`center`}}>{doc.idcamp}</td>
                                        <td>{doc.namacamp}</td>
                                        <td>{doc.target}</td>
                                        <td style={{textAlign:`center`}}>{doc.terkumpul}</td>
                                        <td>{doc.deadline}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <Link to={{
                                                    pathname: `/tabel/getCampaign/detail/${doc.idcamp}`,
                                                    state: {
                                                        data: doc
                                                    }
                                                }}>
                                                    <button type="button" className="btn btn-warning mr-1" aria-haspopup="true" aria-expanded="false"><i className="fa fa-cog"></i></button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <Modal show={open} onHide={handleTambah}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Data</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleTambah} />
                            </div>
                            <Modal.Body>
                                <form onSubmit={handleAddCampaign} /* action="https://donasi.aqlpeduli.or.id/addCampaign?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc" method="POST"*/>
                                    <div className="mb-3">
                                        <input type="number" className="form-control" name="id" placeholder="ID Campaign (wajib diisi)" onChange={onChangeAddCampaign} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label"><strong>Nama Campaign:</strong></label>
                                        <input type="text" className="form-control" id="recipient-name" name="campaign_name" onChange={onChangeAddCampaign} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label"><strong>Target:</strong></label>
                                        <input type="number" className="form-control" id="message-text" name="target" onChange={onChangeAddCampaign} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label"><strong>Deadline:</strong></label>
                                        <input type="date" className="form-control" id="message-text" name="deadline" onChange={onChangeAddCampaign} />
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleTambah} style={{ marginRight: `1rem` }}>Tutup</button>
                                    <button type="submit" className="btn btn-primary" id="tambahCampaign">Tambah</button>
                                </form>
                            </Modal.Body>
                        </Modal>
                    </tbody>
                </table>
            </Layout>
        </>
    )
}

export default FormTabel