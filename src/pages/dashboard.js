import Layout from "../layout"

function Dashboard(props) {
    var act = "undefined"
    if(props.location.state){
        act = props.location.state.active
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