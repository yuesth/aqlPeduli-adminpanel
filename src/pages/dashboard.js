import { useHistory } from "react-router-dom"
import Layout from "../layout"

function Dashboard(props) {
    const hist = useHistory()
    var act = "undefined"
    if(props.location.state){
        act = props.location.state.active
    }
    const tok = JSON.parse(sessionStorage.getItem('token'))
    if(tok == null || tok == "null"){
        hist.push('/')
    }
    return (
        <>
            <Layout active={act}>
                <h1>Selamat datang di dashboard</h1>
            </Layout>
        </>
    )
}

export default Dashboard