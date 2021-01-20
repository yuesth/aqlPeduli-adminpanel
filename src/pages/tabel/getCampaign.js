import { useState, useEffect } from "react"
import Layout from "../../layout"

function FormTabel(props) {
    const act = props.location.state.active
    const [campaign, setCampaign] = useState([])
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
        })
    }, [])
    return (
        <>
            <Layout active={act}>
                <div className="w-auto h-auto position-absolute" style={{ top: `1rem`, right: `2rem` }}>
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
                        {campaign.map((doc, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">1</th>
                                    <td>{doc.idcamp}</td>
                                    <td>{doc.namacamp}</td>
                                    <td>{doc.target}</td>
                                    <td>{doc.deadline}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-warning mr-1">Ubah</button>
                                            <button type="button" className="btn btn-danger">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        {/* <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-warning mr-1">Ubah</button>
                                    <button type="button" className="btn btn-danger">Hapus</button>
                                </div>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </Layout>
        </>
    )
}

export default FormTabel