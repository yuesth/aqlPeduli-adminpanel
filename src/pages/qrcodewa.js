import Layout from "../layout"
import { useHistory } from "react-router-dom"


function LoadingQrcode() {
    return (
        <>
            <h1>Loading....</h1>
        </>
    )
}
function Qrcodewa(props) {
    const hist = useHistory()
    var act = "undefined"
    if (props.location.state) {
        act = props.location.state.active
    }
    const tok = JSON.parse(sessionStorage.getItem('token'))
    if(tok == null || tok == "null"){
        hist.push('/')
    }
    return (
        <>
            <Layout active={act}>
                <div className="row jusify-content-center">
                    <div className="col-9">
                        <a href="https://admin-donasi.aqlpeduli.or.id/wa-blast/getqr"><button className="btn btn-primary">Generate QR Code</button></a>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Qrcodewa