import axios from "axios";
import { useJsApiLoader } from '@react-google-maps/api';
const API_URL = 'http://127.0.0.1:8000/api';
export const API_KEY_GOOGLEMAP = 'AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI';

export default function CallApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err=>console.log(err))
}




 
