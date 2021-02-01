import { Link, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "../layout"


function Relawan(props) {
    const hist = useHistory()
    const tok = JSON.parse(sessionStorage.getItem('token'))
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    if (tok == null || tok == "null") {
        hist.push('/')
    }
    const act = "relawan"
    const [rela, setRela] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/getVolunteer?token=${token}`).then(res => res.json()).then(res2 => {
            setRela(res2)
            setLoading(false)
        })
    }, [])
    return (
        <>
            <Layout active={act}>
                <h2>
                    Tabel Relawan
                </h2>
                <div className="scrolltable" style={{ overflowX: `auto` }}>
                    <table className="table table-bordered table-hover">
                        <thead className="text-center" style={{ fontSize: `0.8rem` }}>
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
                            <th scope="col">Tempat Mengaji</th>
                            <th scope="col">Motivasi</th>
                            <th scope="col">Harapan</th>
                            <th scope="col">Komitmen</th>
                            <th scope="col">Aksi</th>
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
                                    rela.map((doc, idx) => {
                                        return (
                                            <tr key={idx}>
                                                {/* <Link to={`relawan/detail/${doc.id}`}> */}
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
                                                        <a href={`https://api.whatsapp.com/send?text=Kepada%20Sdr/i%20${doc.namaLengkap}`} target="_blank" rel="noreferrer"><button type="button" className="btn btn-success"><i className="fa fa-whatsapp"></i></button></a>
                                                        <button type="button" className="btn btn-danger"><i className="fa fa-envelope"></i></button>
                                                    </div>
                                                </td>
                                                {/* </Link> */}
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    )
}

export default Relawan