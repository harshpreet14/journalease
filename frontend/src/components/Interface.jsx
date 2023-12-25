import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { userIdState, userAddedState} from "../state";
import { useRecoilState, useRecoilValue } from "recoil";
import Transcript from "./Transcript";
import Analysis from "./Insights";
import EntryList from "./EntryList";
import TodayCard from "./TodayCard";


const Interface = () => {
  const [userId, setUserId ] = useRecoilState(userIdState);
 

  useEffect(() => {
    console.log("Checking setUserId: ");
   
  }, []);
 
  if(userId){
    return (
      <>
        <div className="flex flex-row gap-5 h-full p-4px bg-[#ffffff]">
          <h1 className="w-4/12">
            <TodayCard/>
          </h1>
          <div className="rounded-tl-3xl  h-full rounded-bl-3xl w-8/12  border-2 border-yellow-500 bg-[#ffffff]">
            <div className="flex flex-col m-3 h-full mt-6  mb-10 rounded-tr-3xl rounded-br-3xl p-3 overflow-hidden">
            <EntryList/>
            </div>
            
          </div>
          
        </div>
      </>
    );
  }
  
} 


export default Interface;
