import { Link, useHistory } from 'react-router-dom'
import Layout from '../layout'
import Modal from "react-bootstrap/Modal"
import { useState } from 'react'


function RelawanDetail(props) {
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    const [openedit, setOpenedit] = useState(false)
    const [open, setOpen] = useState(false)
    if (tok == null || tok == "null") {
        hist.push('/')
    }
    if (!props.location.state) {
        hist.push('/tabel/getDonation/1')
    }
    const data = props.location.state.data
    const [dataform, setDataform] = useState({
        namaLengkap: data.namaLengkap,
        namaPanggilan: data.namaPanggilan,
        NIK: data.NIK,
        tempatLahir: data.tempatLahir,
        tanggalLahir: data.tanggalLahir,
        umur: data.umur,
        status: data.status,
        jumlahSaudara: data.jumlahSaudara,
        jenisKelamin: data.jenisKelamin,
        anakKe: data.anakKe,
        alamat: data.alamat,
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        noHp: data.noHp,
        whatsapp: data.whatsapp,
        email: data.email,
        tempatMengaji: data.tempatMengaji,
        motivasi: data.motivasi,
        harapan: data.harapan,
        komitmen: data.komitmen,
        state: data.state
        // created: 'x-sheetmonkey-current-date-time'
    })
    const handleDeleteRelawan = (e) => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
        fetch(`https://donasi.aqlpeduli.or.id/api/deleteVolunteer?token=${tok}&id=${data.id}`, {
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
    const handleEditDonation = (e) => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
        fetch(`https://donasi.aqlpeduli.or.id/api/editVolunteer?token=${tok}&id=${data.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataform)
        })
            .then(res => {
                console.log(res)
                if (process.env.NODE_ENV == "production") {
                    window.location.href = `https://admin-donasi.aqlpeduli.or.id/relawan`
                }
                else if (process.env.NODE_ENV == "development") {
                    window.location.href = `http://localhost:3000/relawan`
                }
            })
    }
    const updateField = (e) => {
        setDataform(
            {
                ...dataform,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleOpen = () => setOpen(prev => !prev)
    const handleOpenEdit = () => setOpenedit(prev => !prev)
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
                <input type="text" name="namaLengkap" className="form-control" id="recipient-name" defaultValue={dataform.namaLengkap} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Nama Panggilan:</label>
                <input type="text" name="namaPanggilan" className="form-control" id="message-text" defaultValue={dataform.namaPanggilan} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">NIK:</label>
                <input type="text" name="NIK" className="form-control" id="message-text" defaultValue={dataform.NIK} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Tempat Lahir:</label>
                <input type="text" name="tempatLahir" className="form-control" id="message-text" defaultValue={dataform.tempatLahir} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Tanggal Lahir:</label>
                <input type="date" name="tanggalLahir" className="form-control" id="message-text" defaultValue={dataform.tanggalLahir} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Umur:</label>
                <input type="number" name="umur" className="form-control" id="message-text" defaultValue={dataform.umur} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Status:</label>
                {/* <input type="text" name="status" className="form-control" id="message-text" defaultValue={dataform.status} onChange={updateField} /> */}
                <select
                    as="select"
                    className="custom-select mr-sm-2"
                    id="inlineFormCustomSelect"
                    custom
                    name="status"
                    defaultValue={dataform.status} onChange={updateField}
                >
                    <option selected>Status</option>
                    <option value="Lajang">Lajang</option>
                    <option value="Nikah">Nikah</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Jumlah Saudara:</label>
                <input type="number" name="jumlahSaudara" className="form-control" id="message-text" defaultValue={dataform.jumlahSaudara} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Jenis Kelamin:</label>
                <input type="text" name="jenisKelamin" className="form-control" id="message-text" defaultValue={dataform.jenisKelamin} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Anak ke-:</label>
                <input type="number" name="anakKe" className="form-control" id="message-text" defaultValue={dataform.anakKe} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Alamat:</label>
                <input type="text" name="alamat" className="form-control" id="message-text" defaultValue={dataform.alamat} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Facebook:</label>
                <input type="text" name="facebook" className="form-control" id="message-text" defaultValue={dataform.facebook} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Instagram:</label>
                <input type="text" name="instagram" className="form-control" id="message-text" defaultValue={dataform.instagram} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Twitter:</label>
                <input type="text" name="twitter" className="form-control" id="message-text" defaultValue={dataform.twitter} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">No Handphone:</label>
                <input type="text" name="noHp" className="form-control" id="message-text" defaultValue={dataform.noHp} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Whatsapp:</label>
                <input type="text" name="whatsapp" className="form-control" id="message-text" defaultValue={dataform.whatsapp} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Email:</label>
                <input type="email" name="email" className="form-control" id="message-text" defaultValue={dataform.email} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Tempat Mengaji:</label>
                <input type="text" name="tempatMengaji" className="form-control" id="message-text" defaultValue={dataform.tempatMengaji} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Motivasi:</label>
                <input type="text" name="motivasi" className="form-control" id="message-text" defaultValue={dataform.motivasi} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Harapan:</label>
                <input type="text" name="harapan" className="form-control" id="message-text" defaultValue={dataform.harapan} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Komitmen:</label>
                <input type="text" name="komitmen" className="form-control" id="message-text" defaultValue={dataform.komitmen} onChange={updateField} />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">State:</label>
                {/* <input type="text" name="state" className="form-control" id="message-text" defaultValue={dataform.state} onChange={updateField} /> */}
                <select className="form-select" name="state" aria-label="Default select example" onChange={updateField} defaultValue={dataform.state}>
                    <option selected>State</option>
                    <option value={0}>Baru</option>
                    <option value={1}>Aktif</option>
                    <option value={2}>Expired</option>
                </select>
            </div>
            <button type="button" className="btn btn-success w-25" style={{ marginRight: `1rem` }} onClick={handleOpenEdit}>Edit & Simpan</button>
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
            <Modal show={openedit} onHide={handleOpenEdit}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Konfirmasi Edit</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOpenEdit} />
                </div>
                <Modal.Body>Yakin ingin Simpan perubahan data relawan dari Sdr/i. <strong>{data.namaLengkap}</strong>?</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOpenEdit}>Tutup</button>
                    <button type="button" className="btn btn-success" onClick={() => handleEditDonation(data.id)}>Edit & Simpan</button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default RelawanDetail