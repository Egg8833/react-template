import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import AccountManagement from "@/pages/AccountManagement";
import ProductList from "@/pages/ProductList";
import MemberStatus from "@/pages/MemberStatus";
import Permissions from "@/pages/Permissions";
import Test from "@/pages/Test";
import Login from "@/pages/Login";
import Login2 from "@/pages/Login2"; 
import NextedTable from "@/pages/NextedTable"; 
import UserSetting from "@/pages/UserSetting";
import Delegation from "@/pages/DelegationAndReward/Delegation";
import AutoOrder from "@/pages/DelegationAndReward/AutoOrder";
import FuturesOrder from "@/pages/DelegationAndReward/FuturesOrder";
import FuturesQuote from "@/pages/DelegationAndReward/FuturesQuote";
import OptionsOrder from "@/pages/DelegationAndReward/OptionsOrder";
import OptionsStrategyOrder from "@/pages/DelegationAndReward/OptionsStrategyOrder";
import ComboStrategyOrder from "@/pages/DelegationAndReward/ComboStrategyOrder";
import AuctionOrder from "@/pages/DelegationAndReward/AuctionOrder";
import CustomFuturesOrder from "@/pages/CustomDelegation/CustomFuturesOrder";
import CustomOptionsOrder from "@/pages/CustomDelegation/CustomOptionsOrder";
import CustomAuctionOrder from "@/pages/CustomDelegation/CustomAuctionOrder";
import CustomAutoOrder from "@/pages/CustomDelegation/CustomAutoOrder";
import FileTransfer from "@/pages/FileTransfer/FileTransfer";
import FlexFileTransfer from "@/pages/FileTransfer/FlexFileTransfer";
import OtherFunctions from "@/pages/OtherFeture/OtherFunctions";
import ConnectionStatus from "@/pages/Connection/ConnectionStatus";
import GeneralSettings from "@/pages/UserSettings/GeneralSettings";
import SftpPassword from "@/pages/UserSettings/SftpPassword";


export default function App() {
  console.log(import.meta.env.VITE_APP_ENV)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="login" element={<Login />} />
          <Route path="login2" element={<Login2 />} /> 
          <Route path="accountManagement" element={<AccountManagement />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="admin/memberStatus" element={<MemberStatus />} />
          <Route path="admin/hideFeatures" element={<MemberStatus />} />
          <Route path="nextedTable" element={<NextedTable />} />
          <Route path="userSetting" element={<UserSetting />} />          
          <Route path="delegation" element={<Delegation />} />
          <Route path="autoOrder" element={<AutoOrder />} />
          <Route path="futuresOrder" element={<FuturesOrder />} />
          <Route path="futuresQuote" element={<FuturesQuote />} />
          <Route path="optionsOrder" element={<OptionsOrder />} />
          <Route path="optionsStrategyOrder" element={<OptionsStrategyOrder />} />
          <Route path="comboStrategyOrder" element={<ComboStrategyOrder />} />
          <Route path="auctionOrder" element={<AuctionOrder />} />          
          <Route path="customFuturesOrder" element={<CustomFuturesOrder />} />
          <Route path="customOptionsOrder" element={<CustomOptionsOrder />} />
          <Route path="customAuctionOrder" element={<CustomAuctionOrder />} />
          <Route path="customAutoOrder" element={<CustomAutoOrder />} />
          <Route path="fileTransfer" element={<FileTransfer />} />
          <Route path="flexFileTransfer" element={<FlexFileTransfer />} />
          <Route path="otherFunctions" element={<OtherFunctions />} />
          <Route path="connectionStatus" element={<ConnectionStatus />} />
          <Route path="generalSettings" element={<GeneralSettings />} />
          <Route path="sftpPassword" element={<SftpPassword />} />

        </Route>
      </Routes>
    </Router>
  );
}
