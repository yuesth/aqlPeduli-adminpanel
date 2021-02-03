import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GetDonation from './pages/tabel/getDonation'
import GetCampaign from './pages/tabel/getCampaign'
import DetailDonation from './pages/tabel/detaildonation'
import DetailCampaign from './pages/tabel/detailcampaign'
import QrCodewa from './pages/qrcodewa'
import Login from './pages/login'
import Relawan from './pages/relawan'
import RelawanDetail from './pages/relawan-detail'
import Dashboard from './pages/dashboard'
import Coba from './pages/coba'
import './App.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/tabel/getDonation/:id" exact component={GetDonation}></Route>
          <Route path="/tabel/getDonation/detail/:id" exact component={DetailDonation}></Route>
          <Route path="/tabel/getCampaign/detail/:id" exact component={DetailCampaign}></Route>
          <Route path="/tabel/getCampaign" exact component={GetCampaign}></Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/qr-code-wa" exact component={QrCodewa}></Route>
          <Route path="/relawan" exact component={Relawan}></Route>
          <Route path="/coba" exact component={Coba}></Route>
          <Route path="/relawan/detail/:id" exact component={RelawanDetail}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
