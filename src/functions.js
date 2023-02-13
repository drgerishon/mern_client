import axios from 'axios'

export async function getAddress(latitude, longitude) {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    console.log(response.data)
    return response.data.address;
}



