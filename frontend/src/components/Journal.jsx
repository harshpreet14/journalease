import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from 'axios';
import { selectedEntryIdState, userIdState, tokenState} from "../state";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadingScreen from "./LoadingSreen";
import { lock } from "../assets";
const API_BASE = "http://127.0.01:3000/api/journal-ease"


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

    const {getAccessTokenSilently} = useAuth0();
    const userId = useRecoilValue(userIdState);

    const getEntry = async () => {
          try {
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
            console.error('Error:', error);
          }
      };
    
      useEffect(() => {
        getEntry();
      }, []);

      return (
        loading ? <LoadingScreen /> 
        : 
        <div className="max-w-[900px] center py-10 maax-lg:px-[5vw]">Hi
            <div className="mt-12">
                <h2 className="font-serif">Your journal</h2>
                <div className="flex max-sm:flex-col justify-between my-8">

                    <div className="flex gap-5 items-start">
                        <img src={lock} className="w-12 h-12 rounded-full" />
                        <p className="capitalize">your name
                            <br/>
                        </p>
                    </div>

                <p className="text-dark-grey opacity-70 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">{new Date(updated_at).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                })}</p>
                </div>
            </div>


        </div>
      );
}

export default Journal