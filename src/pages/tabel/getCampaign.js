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
    const [campaign, setCampaign] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const handleTambah = () => setOpen(prev => !prev)
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/getCampaign?token=${token}`).then((res) => res.json()).then((parsedJson) => parsedJson.map(doc => (
            {
                idcamp: doc.id,
                namacamp: doc.campaign_name,
                target: doc.target,
                deadline: doc.deadline
            }
        ))).then(items => {
            setCampaign(items)
            setLoading(false)
        })
    }, [])
    // const handleAddCampaign = useCallback(() => {
    //     fetch(`https://donasi.aqlpeduli.or.id/deleteCampaign?token=${token}&id=${idcamp}`, {
    //         method: "DELETE",
    //     }).then(res => {
    //         console.log(res)
    //         window.location.href = "http://localhost:3000/tabel/getCampaign"
    //     })
    // }, [])
    return (
        <>
            <Layout active={act}>
                <div className="w-auto h-auto position-absolute" style={{ top: `1rem`, right: `2rem` }} onClick={handleTambah} data-bs-toggle="modal" data-bs-target="#tambahCampaignModal">
                    <button className="btn btn-primary">
                        + Tambah data
              </button>
                </div>
                <h2>
                    Tabel Kepedulian
                </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id Kepedulian</th>
                            <th scope="col">Nama Kepedulian</th>
                            <th scope="col">Target</th>
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
                                        <th scope="row">1</th>
                                        <td>{doc.idcamp}</td>
                                        <td>{doc.namacamp}</td>
                                        <td>{doc.target}</td>
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
                                                {/* <button type="button" className="btn btn-warning mr-1">Ubah</button> */}
                                                {/* <button type="button" className="btn btn-danger" onClick={()=>handleDeleteCampaign(doc.idcamp)} onClick={handleTambah} data-bs-toggle="modal" data-bs-target="#hapusModal">Hapus</button> */}
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
                                <form action="https://donasi.aqlpeduli.or.id/addCampaign?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc" method="POST">
                                    {/* <input type="number" name="id_campaign" className="d-none" value={0} /> */}
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Nama Campaign:</label>
                                        <input type="text" className="form-control" id="recipient-name" name="campaign_name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Target:</label>
                                        <input type="number" className="form-control" id="message-text" name="target" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Deadline:</label>
                                        <input type="date" className="form-control" id="message-text" name="deadline" />
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleTambah} style={{ marginRight: `1rem` }}>Tutup</button>
                                    <button type="submit" className="btn btn-primary">Tambah</button>
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