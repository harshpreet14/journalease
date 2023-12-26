import { Landing, Profile, Home } from "./Pages";
import { Journal } from "./components";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/journals' element={<Home/>}/>
         <Route exact path="/journals/:id" element={<Journal/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/journals/new' element={<h1>New journal</h1>}/>
      </Routes>
     </Router>   
    </RecoilRoot>
  );
};

export default App;
