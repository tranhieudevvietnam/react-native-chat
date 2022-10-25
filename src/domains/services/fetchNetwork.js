import {vapidKey} from '../../constants/constants';

const headerJson = {
  Accept: 'application/json',
  Authorization: 'key=' + vapidKey,
  'Content-Type': 'application/json',
};

async function fetchPost({urlString, bodyObject}) {
  const data = await fetch(urlString, {
    method: 'POST',
    headers: headerJson,
    body: JSON.stringify(bodyObject),
  });
  // console.log('fetchPost', data);
  return data.json;
}

export {fetchPost};
