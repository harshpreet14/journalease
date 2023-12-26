import { selectedEntryIdState, userIdState } from "../state";
import { useRecoilValue, useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const API_BASE = "https://journalling-backend-eedb-harshpreets-projects.vercel.app/"


const Analysis = () => {
  const[analysis, setAnalysis] = useState("CLICK ON ANY ENTRY TO VIEW ANALYSIS👆");
  const {getAccessTokenSilently} = useAuth0();
  const userId= useRecoilValue(userIdState)
  const [selectedentryId, setSelectedentryId] = useRecoilState(selectedEntryIdState);

  const getEntry = async (selectedentryId) => {
    console.log('Adding entry...');
      try {
        const token = await getAccessTokenSilently();
        console.log('Token:', token);
        const response = await axios.get(
          API_BASE + '/users/'+ userId + '/entries/' + selectedentryId,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response:', response);
        const obtained_insights =  response.data.data.entry.ai_insights;
        console.log(obtained_insights);
        setAnalysis(obtained_insights);
        } catch (error) {
        console.error('Error:', error);
      }
  };

  useEffect(() => {
    getEntry(selectedentryId);
  }, [selectedentryId]);

    return (
      <div className="min-h-screen rounded-tl-3xl rounded-bl-3xl w-4/12  border-2 border-yellow-500 bg-[#ffffff]">
        <div className="flex flex-col m-3 h-5/6 mt-6 mb-10 rounded-3xl p-3 overflow-hidden">
          <p className="text-xl mb-4 font-bold shadow-lg p-2">AI Insights 🤖</p>
            <div className="text-sm p-5 border border-yellow-400 h-full rounded-xl bg-[#faefb6] shadow-lg  hover:bg-[#f8e99e] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-100 scrollbar-track-transparent">
             {analysis}
            <div/>
        </div>
      </div>
      </div>
    ); 
};

export default Analysis;