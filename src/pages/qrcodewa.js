import Layout from "../layout"

function LoadingQrcode() {
    return (
        <>
            <h1>Loading....</h1>
        </>
    )
}
function Qrcodewa(props) {
    var act = "undefined"
    if (props.location.state) {
        act = props.location.state.active
    }
    return (
        <>
            <Layout active={act}>
                <div className="row jusify-content-center">
                    <div className="col-9">
                        <a href="http://localhost:8080/getqr"><button className="btn btn-primary">Generate QR Code</button></a>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Qrcodewa