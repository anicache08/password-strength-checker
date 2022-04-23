import axios from "axios";

const url = 'https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength';

axios.defaults.headers.common = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
};

//axios.defaults.timeout = 20000;

export const getPasswordStatus = (data) =>{
  return new Promise(async (resolve, reject) =>{
    var response = axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(
      response => {
        return (response);
      },
      error => {
        return(error);
      }
    );
    resolve(response);
  })  
}
