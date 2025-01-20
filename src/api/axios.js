import axios from 'axios';
//const BASEURL = 'https://aspirantcode.chahalacademy.com/api';//gujarat
const BASEURL = 'https://lmscodenew.chahalacademy.com/api'; //delhi
// const BASEURL = 'https://lmsstagecode.stellarflux.com/api'; // testing
export default axios.create({
  baseURL: BASEURL,
});

export {BASEURL};
