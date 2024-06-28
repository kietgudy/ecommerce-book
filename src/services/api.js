import axios from '../utils/axiosCustomize';

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {fullName, email, password, phone})
}