import { useEffect } from "react";
import { userIdState} from "../state";
import { useRecoilValue } from "recoil";
import EntryList from "./EntryList";
import TodayCard from "./TodayCard";


const Interface = () => {
  const userId = useRecoilValue(userIdState);

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
