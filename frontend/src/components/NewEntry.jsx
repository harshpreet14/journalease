import { useState } from "react";
import {pen} from "../assets";
import Audio from "./Audio"
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { userIdState } from "../state";
import { useRecoilValue } from "recoil";

const API_BASE = "http://127.0.01:3000/api/journal-ease"

const NewEntry = () =>{
  const[popupActive, setPopupActive] = useState(false)
  const {getAccessTokenSilently} = useAuth0;
  const userId = useRecoilValue(userIdState)


  const handleCreateEntry =async(e)=>{
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      console.log('Token:', token);
      const response = await axios.post(
        API_BASE + '/users/' + userId + '/entries',
        {
          transcript: 
          'ji', // Use the new entry text
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response);
      const newEntryData = response.data.data.entry; // Get the newly created entry
  
      // Update the entries state with the new entry
      // setEntries((entries) => [ ...entries, newEntryData]);
  
      // Close the popup
      setPopupActive(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };


    return(
      <>
        <button
            className="flex justify-between items-center  bg-transparent  px-6 gap-2 hover:font-bold" onClick={() => setPopupActive(true)}
          >
            <img src={pen} className="w-6" />
            New 
          </button>
          { popupActive ? (
				<div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center ">
					<div className="absolute top-16 right-16 w-20 h-20 text-2xl text-dark cursor-pointer" onClick={() => setPopupActive(false)}>❌</div>
					<div className="bg-[#efecec] h-3/6 w-2/6 p-5 border border-purple-600 rounded-lg justify-center">
						<h3 className="text-dark mb-4 text-lg font-bold">Record your journal!</h3>
						<div type="text" className="  bg-white p-4 rounded-lg w-full shadow-md text-lg overflow-y-auto ">hi</div>
						<button className="mt-5 text-dark mb-4 text-lg font-bold p-2 bg-[#ffffff] border-purple-600 rounded-md shadow-md hover:bg-[#706f6f]" onClick={handleCreateEntry}> Add Journal</button>
            <Audio/>
					</div>
				</div>
			) : null }
      </>
    )
} 

export default NewEntry