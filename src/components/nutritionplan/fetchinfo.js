import * as config from "../config";


export function fetchBasicData (token, req,callback) {
    fetch(config.server + req, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        //   console.log(response);
          return response.json()
        })
      .then((result) => {
          console.log(result);
        if (result.ok) {
          callback(result.message);
        } else {
          callback([]);
        }
      })
      .catch((err) => {
        console.log(err);
        callback([]);
      });
}