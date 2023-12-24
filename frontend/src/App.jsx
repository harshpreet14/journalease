import { Landing, Profile, Dashboard } from "./pages";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        <Route exact path='/me'element={<Dashboard/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
      </Routes>
     </Router>   
    </RecoilRoot>
  );
};

export default App;
