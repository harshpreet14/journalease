import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from 'axios';
import { selectedEntryIdState, userIdState, tokenState} from "../state";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadingScreen from "./LoadingSreen";
import Header from "./Header";

const API_BASE = "https://journalling-backend-eedb-harshpreets-projects.vercel.app/";


export const journalStructure = {
    transcript: ' ',
    updated_at: ' ',
}

const Journal = ()=>{

    let {id} = useParams()
    const [journal, setJournal] = useState(journalStructure);
    const [loading, setLoading] = useState(true);
    const token = useRecoilValue(tokenState)
    let {transcript, updated_at} = journal;
    const userId = useRecoilValue(userIdState);

    const getEntry = async () => {
          try {
            //const token = await getAccessTokenSilently
            const response = await axios.get(
              API_BASE + '/users/'+ userId + '/entries/' + id,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Response:', response);
            const obtained_journal =  response.data.data.entry;
            setJournal(obtained_journal);
            setLoading(false)
            } catch (error) {
            console.log('Error:', error);
          }
      };
      

      const deleteEntry =async() =>{
        try {
            const response = await axios.delete(
              API_BASE + '/users/'+ userId + '/entries/' + id,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Response:', response);
            } catch (error) {
            console.log('Error:', error);
          }
      }

      const handleDeleteEntry =(e)=>{
        e.preventDefault();
        deleteEntry();
      }

      useEffect(() => {
        getEntry();
      }, []);

      return (
        loading ? <LoadingScreen /> 
        : 
        <>
        <Header/>
        <div className="flex items-center justify-center h-full" >
                <div className="rounded-3xl w-6/12 align-center border-2 m-5 bg-[#ffffff]">
                  <div className="flex flex-row justify-between p-2">
                  <p className="text-dark-grey opacity-70 p-5 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">{new Date(updated_at).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                })}</p> 
                <button className="mr-5 hover:font-bold" onClick={handleDeleteEntry}>Delete</button>
                  </div>
                  <div className="flex flex-col m-3 h-5/6 mt-6 mb-10 rounded-3xl  p-5 overflow-hidden">
                  <div className="text-sm border h-full border-yellow-700 p-5 mb-2 rounded-xl shadow-xl  hover:bg-[#fffacf] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-transparent">
                {transcript }
              </div>
              </div>
            </div>
            </div>   
            </>
      );
}

export default Journal