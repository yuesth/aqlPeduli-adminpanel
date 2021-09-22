
import { useState, useEffect } from "react"
import Layout from "../../layout"
import Modal from "react-bootstrap/Modal"
import { Link, useHistory } from "react-router-dom"
import { TableExport } from "tableexport"
const Swal = window.swal

function FormTabel(props) {
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    if (tok == null || tok == "null") {
        hist.push('/')
    }
    const id = props.match.params.id
    const act = "tabelgetdonation"
    const [donasi, setDonasi] = useState([])
    const [donasi2, setDonasi2] = useState([])
    const [campaign, setCampaign] = useState([])
    const [ispoen, setIsopen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tambah, setTambah] = useState(false)
    const [paid, setPaid] = useState(null)
    const [formtambah, setFormtambah] = useState({
        name: '',
        id_campaign: 0,
        email: '',
        phone_number: '',
        amount: 0,
        paid: 0
    })
    var banyakitem = 0
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/api/getDonation?token=${tok}&id_campaign=${id}`).then((res) => res.json()).then((parsedJson) => parsedJson.map(doc => (
            {
                id: doc.id,
                idcamp: doc.id_campaign,
                nama: doc.name,
                amount: doc.amount,
                paid: doc.paid,
                email: doc.email,
                nohp: doc.phone_number,
                tanggal: doc.created_at
            }
        ))).then(items => {
            setDonasi(items)
            setDonasi2(items)
            setLoading(false)
            banyakitem = items.length
            const arritem = []
            for (var i = 0; i < banyakitem; i++) {
                arritem.push(false)
            }
        }).then((res) => {
            TableExport(document.getElementById("donationTable"), {
                headers: true,
                formats: ["xlsx"]
            })
        })
        fetch(`https://donasi.aqlpeduli.or.id/api/getCampaign?token=${tok}`).then(res => res.json()).then(res2 => {
            setCampaign(res2)
        })
    }, [])
    const toggleOpen = () => {
        setIsopen(prev => !prev)
    }
    const handleTambahDonation = () => setTambah(prev => !prev)
    const onChangeAddDonation = (e) => {
        setFormtambah({
            ...formtambah,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmitDonation = (e) => {
        fetch(`https://donasi.aqlpeduli.or.id/addDonation?token=${token}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formtambah)
        })
            .then(res => {
                console.log(res.json())
                setTimeout(() => {
                    if (process.env.NODE_ENV == "production") {
                        window.location.href = `https://admin-donasi.aqlpeduli.or.id/tabel/getDonation/${formtambah.id_campaign}`
                    }
                    else if (process.env.NODE_ENV == "development") {
                        window.location.href = `http://localhost:3000/tabel/getDonation/${formtambah.id_campaign}`
                    }
                }, 2000)
            })
        e.preventDefault()
    }
    const onChangeBatalBayar = (idDonatur, idCamp, index) => {
        Swal.fire({
            title: 'Batalkan pembayaran?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: `Batalkan`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://donasi.aqlpeduli.or.id/api/setUnPaidDonation?token=${tok}&id=${idDonatur}`, {
                    method: 'PUT'
                })
                    .then(res => {
                        if (process.env.NODE_ENV == "production") {
                            window.location.href = `https://admin-donasi.aqlpeduli.or.id/tabel/getDonation/${idCamp}`
                        }
                        else if (process.env.NODE_ENV == "development") {
                            window.location.href = `http://localhost:3000/tabel/getDonation/${idCamp}`
                        }
                    })
            }
            else if (result.isDenied) {
                var paidBtn = document.getElementsByClassName(`${index}`)
                for (var i = 0; i < paidBtn.length; i++) {
                    paidBtn[i].checked = true
                }
            }
        })
    }

    const onChangeBayar = (idDonatur, idCamp, index, donatur, campaign, amount, nohp) => {
        const findkeped = campaign.find(x => x.id == idCamp)
        const namakeped = findkeped.campaign_name
        const data = {
            donatur: donatur,
            namakepedulian: namakeped,
            jumlah: amount,
            nohp: nohp
        }
        console.log("ini keped loh: " + data.namakepedulian)
        Swal.fire({
            title: 'Simpan sudah membayar?',
            showDenyButton: true,
            confirmButtonText: `Simpan`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("data send wa: \n" + data)
                fetch(`https://admin-donasi.aqlpeduli.or.id/wa-blast/send-message-from-admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(resjson => {
                        console.log("data untuk wa: " + resjson)
                    })
                fetch(`https://donasi.aqlpeduli.or.id/api/setPaidDonation?token=${tok}&id=${idDonatur}`, {
                    method: 'PUT'
                })
                    .then(res => {
                        setTimeout(() => {
                            if (process.env.NODE_ENV == "production") {
                                window.location.href = `https://admin-donasi.aqlpeduli.or.id/tabel/getDonation/${idCamp}`
                            }
                            else if (process.env.NODE_ENV == "development") {
                                window.location.href = `http://localhost:3000/tabel/getDonation/${idCamp}`
                            }
                        }, 1000)
                    })
            }
            else if (result.isDenied) {
                var paidBtn = document.getElementsByClassName(`${index}`)
                for (var i = 0; i < paidBtn.length; i++) {
                    paidBtn[i].checked = false
                }
            }
        })
    }
    const convertISOtoDate = (date) => {
        var d = new Date(date)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    const onChangeFilter = (e) => {
        const filtered = donasi2.filter(don => {
            var s = `${don.paid}`
            var ee = e.target.value
            console.log("paid: " + don.paid)
            // return don.paid == e.target.value
            return ee.toLowerCase().includes(s.toLowerCase())
        })
        setPaid(e.target.value)
        setDonasi(filtered)
    }
    const menuClass = `dropdown-menu${ispoen ? " show" : ""}`;
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
                    </div>
                </div>
                <br />
                <div className="w-25">
                    <select className="form-select" aria-label="Default select example" onChange={onChangeFilter}>
                        <option selected>Status Pembayaran</option>
                        <option value={"01 null"}>Semua</option>
                        <option value={"1"}>Terbayar</option>
                    </select>
                </div>
                <div className="w-auto h-auto position-absolute" style={{ top: `1rem`, right: `2rem` }} onClick={handleTambahDonation} data-bs-toggle="modal" data-bs-target="#tambahDonationModal">
                    <button className="btn btn-primary">
                        + Tambah data
                    </button>
                </div>
                <div id="donationTable">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">id_campaign</th>
                                <th scope="col">Tanggal</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Email</th>
                                <th scope="col">Nomor Handphone</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
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
                                        <th scope="row">{idx + 1}</th>
                                        <td>{doc.idcamp}</td>
                                        <td>{convertISOtoDate(doc.tanggal)}</td>
                                        <td>{doc.nama}</td>
                                        <td>{doc.email}</td>
                                        <td>{doc.nohp}</td>
                                        <td>{doc.amount}</td>
                                        <td style={{ textAlign: `center` }}>
                                            <div className="form-check form-switch">
                                                {
                                                    doc.paid == 'null' || doc.paid == null || doc.paid == 0
                                                        ?
                                                        <>
                                                            <input className={`form-check-input paidDonasi ${idx}`} type="checkbox" id="unpaidDonasi" onChange={() => onChangeBayar(doc.id, doc.idcamp, idx, doc.nama, campaign, doc.amount, doc.nohp)} />
                                                        </>
                                                        :
                                                        <>
                                                            <input className="form-check-input paidDonasi dua" type="checkbox" id="paidDonasi" checked onChange={() => onChangeBatalBayar(doc.id, doc.idcamp, idx)} />
                                                        </>
                                                }

                                            </div>
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <Link to={{
                                                    pathname: `/tabel/getDonation/detail/${doc.idcamp}`,
                                                    state: {
                                                        data: doc
                                                    }
                                                }}>
                                                    <button type="button" className="btn btn-warning" /*className="btn btn-warning mr-1 dropdown-toggle"*/ aria-haspopup="true" aria-expanded="false"><i className="fa fa-cog" /*role="button" id="dropdownAksiLink" data-toggle="dropdown"*/></i></button>
                                                </Link>
                                                {/* <button type="button" className="btn btn-success"><i className="fa fa-whatsapp"></i></button>
                                            <button type="button" className="btn btn-danger"><i className="fa fa-envelope"></i></button> */}
                                            </div>
                                        </td>
                                    </tr>)
                                })
                            }
                            <Modal show={tambah} onHide={handleTambahDonation}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Tambah Data</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleTambahDonation} />
                                </div>
                                <Modal.Body>
                                    <form onSubmit={handleSubmitDonation} /* action="https://donasi.aqlpeduli.or.id/addCampaign?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc" method="POST"*/>
                                        <div className="mb-3">
                                            <select className="form-select" aria-label="Default select example" name="id_campaign" onChange={onChangeAddDonation}>
                                                <option selected>Pilih Campaign</option>
                                                {
                                                    campaign.map((doc, idx) => {
                                                        return (
                                                            <option key={idx} value={doc.id}>{doc.campaign_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            {/* <input type="number" name="id_campaign" placeholder="ID Campaign" onChange={onChangeAddDonation} /> */}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Nama:</label>
                                            <input type="text" className="form-control" id="name" name="name" onChange={onChangeAddDonation} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Email:</label>
                                            <input type="text" className="form-control" id="email" name="email" onChange={onChangeAddDonation} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">No Handphone:</label>
                                            <input type="tel" className="form-control" id="phone_number" name="phone_number" onChange={onChangeAddDonation} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Amount:</label>
                                            <input type="number" className="form-control" id="amount" name="amount" onChange={onChangeAddDonation} />
                                        </div>
                                        <input type="number" name="paid" className="d-none" defaultValue={0} />
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleTambahDonation} style={{ marginRight: `1rem` }}>Tutup</button>
                                        <button type="submit" className="btn btn-primary" id="tambahCampaign">Tambah</button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    )
}

export default FormTabel