import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GetDonation from './pages/tabel/getDonation'
import GetCampaign from './pages/tabel/getCampaign'
import DetailDonation from './pages/tabel/detaildonation'
import DetailCampaign from './pages/tabel/detailcampaign'
import QrCodewa from './pages/qrcodewa'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
