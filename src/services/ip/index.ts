import axios from 'axios';

export default {
    deIp: async function (ipAddress: any) {
        return await axios.get(process.env.IP_DE_URL + ipAddress)
            .then(res => res.data)
            .catch(er => false)
    }
}