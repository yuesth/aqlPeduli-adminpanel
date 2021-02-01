import { Link, useHistory } from 'react-router-dom'
import Layout from '../layout'
import Modal from "react-bootstrap/Modal"
import { useState } from 'react'


function RelawanDetail(props) {
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    const [open, setOpen] = useState(false)
    if (tok == null || tok == "null") {
        hist.push('/')
    }
    if (!props.location.state) {
        hist.push('/tabel/getDonation/1')
    }
    const data = props.location.state.data
    const handleDeleteRelawan = (e) => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
        fetch(`https://donasi.aqlpeduli.or.id/deleteVolunteer?token=${token}&id=${data.id}`, {
            method: "DELETE",
        }).then(res => {
            console.log(res)
            if (process.env.NODE_ENV == "production") {
                window.location.href = `https://admin-donasi.aqlpeduli.or.id/relawan`
            }
            else if (process.env.NODE_ENV == "development") {
                window.location.href = `http://localhost:3000/relawan`
            }
            // window.location.href = `https://admin-donasi.aqlpeduli.or.id/tabel/getDonation/${data.idcamp}`
        })
    }
    const handleOpen = () => setOpen(prev => !prev)

    return (
        <Layout>
            <div className="row w-100 mb-4">
                <div className="col-2 w-100">
                    <Link to={`/relawan`} style={{ textDecoration: `none` }}>
                        <i className="fa fa-chevron-left fa--2x"></i> Back
                    </Link>
                    <h3>Detail Relawan</h3>
                    <hr className="w-100" />
                </div>
            </div>
            <div className="mb-3 d-flex">
                <div className="mr-4 pr-4"><h3>Id:</h3></div>
                <div className="ml-4"><h3><strong>   {data.id}</strong></h3></div>
            </div>
            <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Nama Lengkap:</label>
                <input type="text" className="form-control" id="recipient-name" defaultValue={data.namaLengkap} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Nama Panggilan:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.email} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">NIK:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.NIK} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Tempat Lahir:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.tempatLahir} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Umur:</label>
                <input type="number" className="form-control" id="message-text" defaultValue={data.umur} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Status:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.status} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Jumlah Saudara:</label>
                <input type="number" className="form-control" id="message-text" defaultValue={data.jumlahSaudara} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Jenis Kelamin:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.jenisKelamin} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Anak ke-:</label>
                <input type="number" className="form-control" id="message-text" defaultValue={data.anakKe} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Alamat:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.alamat} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Facebook:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.facebook} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Instagram:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.instagram} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Twitter:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.twitter} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">No Handphone:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.noHp} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Whatsapp:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.whatsapp} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Email:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.email} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Tempat Mengaji:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.tempatMengaji} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Motivasi:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.motivasi} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Harapan:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.harapan} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Komitmen:</label>
                <input type="text" className="form-control" id="message-text" defaultValue={data.komitmen} />
            </div>
            <button type="button" className="btn btn-success w-25" style={{ marginRight: `1rem` }}>Edit & Simpan</button>
            <button type="button" className="btn btn-danger" onClick={handleOpen} data-bs-toggle="modal" data-bs-target="#hapusModal">Hapus</button>
            <Modal show={open} onHide={handleOpen}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Konfirmasi hapus</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOpen} />
                </div>
                <Modal.Body>Yakin ingin menghapus data relawan dari Sdr/i. <strong>{data.namaLengkap}</strong>?</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOpen}>Tutup</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteRelawan(data.id)}>Hapus</button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default RelawanDetail