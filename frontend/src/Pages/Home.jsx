import Interface from "../components/Interface";
import { Header } from "../components";
import { userIdState, tokenState} from "../state";
import { useRecoilState} from "recoil";
import { useAuth0 } from "@auth0/auth0-react";
import { userAddedState } from "../state";
import axios from 'axios'
import { useEffect } from "react";

const API_BASE = "http://127.0.01:3000/api/journal-ease"
const Home = ()=>{

  const { isAuthenticated, getAccessTokenSilently, user} = useAuth0();
  const [userAdded, setUserAdded] = useRecoilState(userAddedState)
  const [userId, setUserId ] = useRecoilState(userIdState);
  const [token, setTokenState] = useRecoilState(tokenState)

  const addUser = async () => {
    console.log('user', user);
    console.log('isAuthenticated', isAuthenticated);
    if (user && isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        setTokenState(token)
        console.log('Token:', token);
        const response = await axios.post(
          API_BASE + '/users',
          {
            auth0_id: user.sub,
            name: user.name,
            email: user.email,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response for addUser:', response);
        const user_id =  response.data.data.user._id;
        setUserId(user_id)
        setUserAdded(true)
        console.log(user_id);
        console.log(userId)
        } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  useEffect(() => {
    console.log("Checking setUserId: ");
    addUser(userId);
  }, [userId]);

    return(
        <>
        <div className="flex flex-col h-screen">
        <Header/>
        <Interface className="h-full overflow-auto"/>
        </div>
        </> 
    )
}

export default Home;