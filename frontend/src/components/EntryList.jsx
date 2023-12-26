import { useAuth0 } from "@auth0/auth0-react";
import { userIdState, entryIdState, selectedEntryIdState, scriptState, userAddedState } from "../state";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useState, useEffect} from "react";
import {Link} from 'react-router-dom';

const API_BASE = "https://journalling-backend-eedb-harshpreets-projects.vercel.app/"

const EntryList = () => {
    const  userId  = useRecoilValue(userIdState);
    const { getAccessTokenSilently} = useAuth0();
    const [entries, setEntries] = useState([]);
    const userAdded = useRecoilValue(userAddedState)

    
      const getEntries = async() =>{
          try {
            const token = await getAccessTokenSilently();
            console.log('Token:', token);
            const response = await axios.get(
              API_BASE + '/users/' + userId +'/entries',
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Response for getEntries:', response);
            const entries_data = response.data.data.entries;
            setEntries(entries_data);
            console.log(entries_data);
            } catch (error) {
            console.error('Error:', error);
          }
      }

      useEffect(() => {
        console.log('useEffect called');
        getEntries();
      }, [userId]);

    if(userAdded===true){
      return (
        <>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-100 scrollbar-track-transparent">
        {entries.map((entry) => (<Entry entry={entry} key={entry._id} entries={entries} setEntries={setEntries}/>))}
        </div>
        </>
    ) 
}
}


const Entry = ({entry, entries, setEntries}) => {  

    const [entryId, setEntryId] = useRecoilState(entryIdState)
    const { getAccessTokenSilently} = useAuth0();
    const userId = useRecoilValue(userIdState);
    const [selectedentryId, setSelectedentryId] = useRecoilState(selectedEntryIdState);

      
    const updateEntry = async() =>{
        console.log("hi")
      }


    const handleDeleteEntry =(e)=>{
        e.preventDefault();
        deleteEntry();
        setEntries(entries => entries.filter(entry => entry._id !== entryId))
    }

    return (
      <Link to={`/journals/${entry._id}`} >
          <div className="flex flex-col border border-yellow-400 gap-y-3 h-20 rounded-xl  mb-4 px-4 py-2 bg-[#faf3d2] shadow-lg  hover:bg-[#fffffd]" >
            {console.log('Entry id', entryId)}
            <div className="flex flex-row text-xs justify-between text-gray-600">
               <div >{entry.title}</div>
               <div >{new Date(entry.updated_at).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}</div>
            </div>
            <div className="flex flex-row  justify-between">
            <div className="text-sm truncate">
            {entry.transcript}
            </div>
            </div> 
        </div>
      </Link>
        
        )
}

export default EntryList;