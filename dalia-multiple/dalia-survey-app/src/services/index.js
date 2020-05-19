import { BASE_URL } from "../utils/constants";

function surveyApi(method = "GET", uri, params) {
  if (!uri) {
    return;
  }

  const url = BASE_URL + uri;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open(method, url);

  if (params) {
    xhr.send(JSON.stringify(params));
  } else {
    xhr.send();
  }

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function() {
      try {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject("error");
          }
        }
      } catch (error) {
        reject(error);
      }
    };
  });
}

export default surveyApi;
