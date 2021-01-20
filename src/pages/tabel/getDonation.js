
import { useState, useEffect } from "react"
import Layout from "../../layout"

function FormTabel(props) {
    // if(props.location.state){
    const act = "tabelgetdonation"
    const id = props.match.params.id
    console.log(id)
    // }
    const [donasi, setDonasi] = useState([])
    const [ispoen, setIsopen] = useState(false)
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE2MTA0MjgzNzgsImV4cCI6MTYxMDQzMTk3OCwibmJmIjoxNjEwNDI4Mzc4LCJqdGkiOiJWSTFEZkVORjZWc3luNHB2Iiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.awgkdKJarKGTxP_0HIldNI7CnG_xtJoxnzhALuFGIPc'
    useEffect(() => {
        fetch(`https://donasi.aqlpeduli.or.id/getDonation?token=${token}&id_campaign=${id}`).then((res) => res.json()).then((parsedJson) => parsedJson.map(doc => (
            {
                idcamp: doc.id_campaign,
                nama: doc.name,
                amount: doc.amount
            }
        ))).then(items => {
            setDonasi(items)
        })
    }, [])
    const toggleOpen = () => {
        setIsopen(prev => !prev)
    }
    const menuClass = `dropdown-menu${ispoen ? " show" : ""}`;
    return (
        <>
            <Layout active={act}>
                {/* <div className="w-auto h-auto position-absolute" style={{ top: `1rem`, right: `2rem` }}>
                    <button className="btn btn-primary">
                        + Tambah data
                    </button>
                </div> */}
                <h2>
                    Tabel Donasi
                </h2>
                <div className="dropdown" onClick={toggleOpen}>
                    <a className="btn btn-success dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Id Campaign
                    </a>
                    <div className={menuClass} id="dd-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href={`/tabel/getDonation/${0}`}>0</a>
                        <a className="dropdown-item" href={`/tabel/getDonation/${1}`}>1</a>
                        <a className="dropdown-item" href={`/tabel/getDonation/${2}`}>2</a>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id_kepedulian</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donasi.map((doc, idx) => {
                                return (<tr key={idx}>
                                    <th scope="row">1</th>
                                    <td>{doc.idcamp}</td>
                                    <td>{doc.nama}</td>
                                    <td>{doc.amount}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-warning mr-1"><i className="fa fa-cog"></i></button>
                                            <button type="button" className="btn btn-success"><i className="fa fa-whatsapp"></i></button>
                                            <button type="button" className="btn btn-danger"><i className="fa fa-envelope"></i></button>
                                        </div>
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