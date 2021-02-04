import { Link, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "../layout"
import "./relawan.css"
import { TableExport } from "tableexport"
import Modal from "react-bootstrap/Modal"
var $ = window.jQuery;
const Swal = window.swal

function Relawan(props) {
    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.umur - b.umur
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.umur - a.umur
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    if (tok == null || tok == "null") {
        hist.push('/')
    }
    const act = "relawan"
    const [rela, setRela] = useState([])
    const [rela2, setRela2] = useState([])
    const [loading, setLoading] = useState(true)
    const [key, setKey] = useState("")
    const [blastemailmodal, setBlastemailmodal] = useState(false)
    const [selectedwa, setSelectedwa] = useState([])
    const [selectedwa2, setSelectedwa2] = useState([])
    const [currsort, setCurrsort] = useState('default')
    const [formblast, setFormblast] = useState({
        subject: '',
        message: ''
    })
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/api/getVolunteer?token=${tok}`).then(res => res.json())
            .then(resjson => resjson.map((doc, idx) => {
                return ({
                    ...doc,
                    isChecked: false
                })
            }))
            .then(res2 => {
                setRela(res2)
                setRela2(res2)
                setLoading(false)
            }).then((res) => {
                TableExport(document.getElementById("relawanTable"), {
                    headers: true,
                    formats: ["xlsx"]
                })
            })
        // .then((res)=>{
        //     $(document).ready(function () {
        //         $('#example').DataTable();
        //     });
        // })
    }, [])
    useEffect(() => {
        $(function () {
            $("#check_all").on("click", function () {
                if ($("input:checkbox").prop("checked")) {
                    $("input:checkbox[name='row-check']").prop("checked", true);
                } else {
                    $("input:checkbox[name='row-check']").prop("checked", false);
                }
            });
            $("input:checkbox[name='row-check']").on("change", function () {
                var total_check_boxes = $("input:checkbox[name='row-check']").length;
                var total_checked_boxes = $("input:checkbox[name='row-check']:checked").length;

                // If all checked manually then check check_all checkbox
                if (total_check_boxes === total_checked_boxes) {
                    $("#check_all").prop("checked", true);
                }
                else {
                    $("#check_all").prop("checked", false);
                }
            });
            if (selectedwa.length !== 0) {
                $('#waBlast').css("display", "block")
            }
            else {
                $('#waBlast').css("display", "none")
            }
        });
    })
    const handleBlastModal = () => setBlastemailmodal(prev => !prev)
    const onSortChange = () => {
        const currSort = currsort;
        let nextSort;

        if (currSort === 'down') nextSort = 'up';
        else if (currSort === 'up') nextSort = 'default';
        else if (currSort === 'default') nextSort = 'down';
        setCurrsort(nextSort)
    };
    const onChangeFormBlast = (e) => {
        setFormblast({
            ...formblast,
            [e.target.name]: e.target.value
        })
    }

    const searchkey = async (e) => {
        var states = null
        if (e.target.value.toLowerCase() == "baru") {
            states = 0
        }
        else if (e.target.value.toLowerCase() == "aktif") {
            states = 1
        }
        else if (e.target.value.toLowerCase() == "expired") {
            states = 2
        }
        const filtered = rela2.filter(re => {
            return re.namaLengkap.toLowerCase().includes(e.target.value.toLowerCase()) || re.namaPanggilan.toLowerCase().includes(e.target.value.toLowerCase()) || re.jenisKelamin.toLowerCase().includes(e.target.value.toLowerCase()) || re.status.toLowerCase().includes(e.target.value.toLowerCase()) || re.state === states
        })
        setKey(e.target.value)
        setRela(filtered)
    }

    const onChangeSelectedWA = (idRela, wa, index, e) => {
        const clicked = selectedwa.indexOf(idRela)
        const all = [...selectedwa]
        const all2 = [...selectedwa2]
        if (clicked === -1) {
            all.push(idRela);
            all2.push(wa);
        } else {
            all.splice(clicked, 1);
            all2.splice(clicked, 1)
        }
        setSelectedwa(all)
        setSelectedwa2(all2)
    }
    const onChangeSelectedWASemua = (e) => {
        var allArr = []
        var allArr2 = []
        if (selectedwa.length == rela.length) {
            allArr = []
            allArr2 = []
        }
        else {
            for (var i = 0; i < rela.length; i++) {
                allArr.push(rela[i].id)
                allArr2.push(rela[i].whatsapp)
            }
        }
        setSelectedwa(allArr)
        setSelectedwa2(allArr2)
    }
    const handleBlastWaRelawan = (e) => {
        console.log(selectedwa.length)
        const dataemail = {
            ...formblast,
            allId: selectedwa,
            token: tok
        }
        const datawa = {
            allNohp: selectedwa2,
            message: formblast.message
        }
        fetch(`https://donasi.aqlpeduli.or.id/api/volunteerEmailBlast`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataemail)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sukses Mengirim Email',
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then((res) => {
                            if (process.env.NODE_ENV == "production") {
                                window.location.href = `https://admin-donasi.aqlpeduli.or.id/relawan`
                            }
                            else if (process.env.NODE_ENV == "development") {
                                window.location.href = `http://localhost:3000/relawan`
                            }
                        })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengirim Email',
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then((res) => {
                            if (process.env.NODE_ENV == "production") {
                                window.location.href = `https://admin-donasi.aqlpeduli.or.id/relawan`
                            }
                            else if (process.env.NODE_ENV == "development") {
                                window.location.href = `http://localhost:3000/relawan`
                            }
                        })
                }
            })
        fetch(`https://admin-donasi.aqlpeduli.or.id/wa-blast/send-message-for-relawan`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datawa)
        })
            .then(res => res.json())
            .then(res2 => { console.log("sukses? " + res2.success) })
        e.preventDefault()

    }
    return (
        <>
            <Layout active={act}>
                <h2>
                    Tabel Relawan
                </h2>
                <div className="searchBox d-flex">
                    <h6 className="mt-1">Cari:</h6>
                    <input className="searchInputs" type="text" value={key} onChange={searchkey} placeholder="Nama/Jenis kelamin/Status/State" style={{ background: `none`, border: `1px solid black`, outline: `none`, width: `100%`, marginLeft: `10px` }} />
                </div>
                <div className="h-auto position-absolute" id="waBlast" style={{ top: `7.5rem`, right: `2rem`, color: `white`, width: `10rem` }}>
                    <button className="btn btn-primary w-100" style={{ color: `white` }} id="blastWa" aria-haspopup="true" aria-expanded="false" onClick={handleBlastModal}>
                        Blast <i className="fa fa-bolt"></i> <span className="badge bg-light text-dark">{selectedwa.length}</span>
                    </button>
                </div>
                {/* <div className="w-auto h-auto position-absolute" style={{ top: `2rem`, right: `3rem` }} data-bs-toggle="modal" data-bs-target="#tambahDonationModal">
                    <div className="dropdown" onClick={toggleDDExport}>
                        <a className="btn btn-info dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Export <i className="fa fa-download"></i>
                        </a>
                        <div className={ddClass} id="dd-menu" aria-labelledby="dropdownMenuLink">
                            <button className="dropdown-item" onClick={handleExport}>Excel (.xlsx)</button>
                        </div>
                    </div>
                </div> */}
                <div className="scrolltable" id="relawanTable" style={{ overflowX: `auto` }}>
                    <table className="table table-bordered table-hover relawanIdTable" id="idTable">
                        <thead className="text-center" style={{ fontSize: `0.8rem` }}>
                            <tr>
                                <th scope="col">Pilih Semua<input id="check_all" onChange={onChangeSelectedWASemua} value="checkedall" type="checkbox" /></th>
                                <th scope="col">#</th>
                                <th scope="id">ID</th>
                                <th scope="col">State</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Nickname</th>
                                <th scope="col">NIK</th>
                                <th scope="col">Tempat Lahir</th>
                                <th scope="col">Tanggal Lahir</th>
                                <th scope="col" className="d-flex align-items-center my-3">
                                    Umur 
                                    <button onClick={onSortChange} style={{border:`none`, outline:`none`}}>
                                        <i className={`fa fa-${sortTypes[currsort].class}`} />
                                    </button>
                                </th>
                                <th scope="col">Status</th>
                                <th scope="col">Jml Saudara</th>
                                <th scope="col">JK</th>
                                <th scope="col">Anak Ke</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Facebook</th>
                                <th scope="col">Instagram</th>
                                <th scope="col">Twitter</th>
                                <th scope="col">No Handphone</th>
                                <th scope="col">Whatsapp</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tempat Mengaji</th>
                                <th scope="col">Motivasi</th>
                                <th scope="col">Harapan</th>
                                <th scope="col">Komitmen</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: `0.8rem` }}>
                            {
                                loading ?
                                    <div className="position-absolute bottom-0 end-50">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    [...rela].sort(sortTypes[currsort].fn).map((doc, idx) => {
                                        return (
                                            <tr key={idx}>
                                                {/* <Link to={`relawan/detail/${doc.id}`}> */}
                                                <th style={{ textAlign: `center` }}><input type="checkbox" name="row-check" value={selectedwa} onChange={(e) => onChangeSelectedWA(doc.id, doc.whatsapp, idx, e)} /></th>
                                                {/* <th><input key={doc.id} onClick={handleCheckChieldElement} type="checkbox" defaultChecked={doc.isChecked} value={doc.id} /></th> */}
                                                <th scope="row">{idx + 1}</th>
                                                <td>{doc.id}</td>
                                                <td>
                                                    {
                                                        doc.state == 0 && <span className="badge bg-primary">Baru</span>
                                                    }
                                                    {
                                                        doc.state == 1 && <span className="badge bg-success">Aktif</span>
                                                    }
                                                    {
                                                        doc.state == 2 && <span className="badge bg-secondary">Expired</span>
                                                    }
                                                </td>
                                                <td>{doc.namaLengkap}</td>
                                                <td>{doc.namaPanggilan}</td>
                                                <td>{doc.NIK}</td>
                                                <td>{doc.tempatLahir}</td>
                                                <td>{doc.tanggalLahir}</td>
                                                <td>{doc.umur}</td>
                                                <td>{doc.status}</td>
                                                <td>{doc.jumlahSaudara}</td>
                                                <td>{doc.jenisKelamin}</td>
                                                <td>{doc.anakKe}</td>
                                                <td>{doc.alamat}</td>
                                                <td>{doc.facebook}</td>
                                                <td>{doc.instagram}</td>
                                                <td>{doc.twitter}</td>
                                                <td>{doc.noHp}</td>
                                                <td>{doc.whatsapp}</td>
                                                <td>{doc.email}</td>
                                                <td>{doc.tempatMengaji}</td>
                                                <td>{doc.motivasi}</td>
                                                <td>{doc.harapan}</td>
                                                <td>{doc.komitmen}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={{
                                                            pathname: `/relawan/detail/${doc.id}`,
                                                            state: {
                                                                data: doc
                                                            }
                                                        }}>
                                                            <button type="button" className="btn btn-warning" aria-haspopup="true" aria-expanded="false"><i className="fa fa-cog" /*role="button" id="dropdownAksiLink" data-toggle="dropdown"*/></i></button>
                                                        </Link>
                                                        <a href={`https://api.whatsapp.com/send?phone=${doc.whatsapp}&text=Kepada%20Sdr/i%20${doc.namaLengkap}`} target="_blank" rel="noreferrer"><button type="button" className="btn btn-success"><i className="fa fa-whatsapp"></i></button></a>
                                                        {/* <button type="button" className="btn btn-danger"><i className="fa fa-envelope"></i></button> */}
                                                    </div>
                                                </td>
                                                {/* </Link> */}
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                    <Modal show={blastemailmodal} onHide={handleBlastModal}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Blast Email dan Whatsapp Relawan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleBlastModal} />
                        </div>
                        <Modal.Body>
                            <h6>Kirim email & WA ke ID: {selectedwa.map((doc, idx) => (<>{doc}, </>))}</h6>
                            <form onSubmit={handleBlastWaRelawan}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Subject (untuk email):</label>
                                    <input type="text" className="form-control" id="name" name="subject" onChange={onChangeFormBlast} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Pesan:</label>
                                    <textarea className="form-control" name="message" as="textarea" onChange={onChangeFormBlast} />
                                </div>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleBlastModal} style={{ marginRight: `1rem` }}>Tutup</button>
                                <button type="submit" className="btn btn-primary w-25">Kirim <i className="fa fa-envelope"> <i className="fa fa-whatsapp"></i></i></button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                {/* <div className="scrolltable" style={{ overflowX: `auto` }}>
                    <table id="example" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Nickname</th>
                                <th scope="col">NIK</th>
                                <th scope="col">Tempat Lahir</th>
                                <th scope="col">Tanggal Lahir</th>
                                <th scope="col">Umur</th>
                                <th scope="col">Status</th>
                                <th scope="col">Jml Saudara</th>
                                <th scope="col">JK</th>
                                <th scope="col">Anak Ke</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Facebook</th>
                                <th scope="col">Instagram</th>
                                <th scope="col">Twitter</th>
                                <th scope="col">No Handphone</th>
                                <th scope="col">Whatsapp</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tempat Mengaji</th>
                                <th scope="col">Motivasi</th>
                                <th scope="col">Harapan</th>
                                <th scope="col">Komitmen</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>{
                            rela.map((doc, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{doc.namaLengkap}</td>
                                        <td>{doc.namaPanggilan}</td>
                                        <td>{doc.NIK}</td>
                                        <td>{doc.tempatLahir}</td>
                                        <td>{doc.tanggalLahir}</td>
                                        <td>{doc.umur}</td>
                                        <td>{doc.status}</td>
                                        <td>{doc.jumlahSaudara}</td>
                                        <td>{doc.jenisKelamin}</td>
                                        <td>{doc.anakKe}</td>
                                        <td>{doc.alamat}</td>
                                        <td>{doc.facebook}</td>
                                        <td>{doc.instagram}</td>
                                        <td>{doc.twitter}</td>
                                        <td>{doc.noHp}</td>
                                        <td>{doc.whatsapp}</td>
                                        <td>{doc.email}</td>
                                        <td>{doc.tempatMengaji}</td>
                                        <td>{doc.motivasi}</td>
                                        <td>{doc.harapan}</td>
                                        <td>{doc.komitmen}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <Link to={{
                                                    pathname: `/relawan/detail/${doc.id}`,
                                                    state: {
                                                        data: doc
                                                    }
                                                }}>
                                                    <button type="button" className="btn btn-warning" aria-haspopup="true" aria-expanded="false"><i className="fa fa-cog" role="button" id="dropdownAksiLink" data-toggle="dropdown"></i></button>
                                                </Link>
                                                <a href={`https://api.whatsapp.com/send?phone=${doc.whatsapp}&text=Kepada%20Sdr/i%20${doc.namaLengkap}`} target="_blank" rel="noreferrer"><button type="button" className="btn btn-success"><i className="fa fa-whatsapp"></i></button></a>
                                                <button type="button" className="btn btn-danger"><i className="fa fa-envelope"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div> */}
            </Layout>
        </>
    )
}

export default Relawan