const headerJson = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const fetchPost = async ({urlString, bodyObject}) => {
  const data = await fetch(urlString, {
    method: 'POST',
    headers: headerJson,
    body: bodyObject,
  });
  return data.json;
};

export {fetchPost};
