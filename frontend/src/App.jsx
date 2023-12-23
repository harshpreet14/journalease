import { Landing, Profile, Dashboard, NewRoute } from "./pages";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { EntryIdProvider, UserIdProvider, SelectedentryIdProvider, ScriptProvider } from "./components";

const App = () => {
  return (
    <UserIdProvider>
      <EntryIdProvider>
      <SelectedentryIdProvider>
        <ScriptProvider>
        <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        <Route exact path='/me'element={<Dashboard/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route exact path="/newroute" element={<NewRoute/>}></Route>
      </Routes>
    </Router> 
        </ScriptProvider>
      </SelectedentryIdProvider>
      </EntryIdProvider>
    </UserIdProvider>
  );
};

export default App;
