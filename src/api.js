
import axios from "axios"
import { API_KEY } from "./apiKey";



const options = {
      method: 'GET',
       url:"https://spotify23.p.rapidapi.com/albums/?ids=3IBcauSj5M2A6lTeffJzdv",
      params: {
        q: '<REQUIRED>',
     },
      headers: {
        // put your Api key here
        'X-RapidAPI-Key': API_KEY ,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };
export const FetchTrack=async()=>{
   
   
 let {data}=await axios.request(options)
return(data?.albums?.[0]?.tracks?.items)



}
