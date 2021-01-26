import { Link, useHistory } from 'react-router-dom'
import Layout from '../../layout'
import { useState, useCallback } from 'react'
import Modal from "react-bootstrap/Modal"

function DetailCampaign(props) {
    const [open, setOpen] = useState(false)
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    if(tok == null || tok == "null"){
        hist.push('/')
    }
    if (!props.location.state) {
        hist.push('/tabel/getCampaign')
    }
    const data = props.location.state.data
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    const handleOpen = () => setOpen(prev => !prev)
    const handleDeleteCampaign = useCallback((idcamp) => {
        fetch(`https://donasi.aqlpeduli.or.id/deleteCampaign?token=${token}&id=${idcamp}`, {
            method: "DELETE",
        }).then(res => {
            console.log(res)
            if(process.env.NODE_ENV == "production"){
                window.location.href = "https://admin-donasi.aqlpeduli.or.id/tabel/getCampaign"
            }
            else if(process.env.NODE_ENV == "development"){
                window.location.href = "http://localhost:3000/tabel/getCampaign"
            }
        })
    }, [])
    return (
        <Layout>
            <div className="row w-100 mb-4">
                <div className="col-2 w-100">
                    <Link to="/tabel/getCampaign" style={{textDecoration:`none`}}>
                        <i className="fa fa-chevron-left fa--2x"></i> Back
                    </Link>
                    <h3>Detail Campaign</h3>
                    <hr className="w-100"/>
                </div>
            </div>
            <div className="mb-3 d-flex">
                <div className="mr-4 pr-4"><h3>Id Campaign:</h3></div>   
                <div className="ml-4"><h3><strong>   {data.idcamp}</strong></h3></div>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Nama Kepedulian:</label>
                    <input type="text" className="form-control" id="recipient-name" defaultValue={data.namacamp} />
                </div>
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Target:</label>
                    <input type="number" className="form-control" id="message-text" defaultValue={data.target} />
                </div>
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Deadline:</label>
                    <input type="date" className="form-control" id="message-text" defaultValue={data.deadline} />
                </div>
                <button type="button" className="btn btn-success w-25" style={{ marginRight: `1rem` }}>Edit & Simpan</button>
                <button type="button" className="btn btn-danger" onClick={handleOpen} data-bs-toggle="modal" data-bs-target="#hapusModal">Hapus</button>
            </form>
            <Modal show={open} onHide={handleOpen}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Konfirmasi hapus</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOpen} />
                </div>
                <Modal.Body>Yakin ingin menghapus data campaign: <strong>{data.namacamp}</strong>?</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOpen}>Tutup</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteCampaign(data.idcamp)}>Hapus</button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default DetailCampaign