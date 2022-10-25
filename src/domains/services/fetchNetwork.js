const headerJson = {
  Accept: 'application/json',
  Authorization:
    'key=AAAAqnH0hbs:APA91bGxvijuAFxNkwwYn8s7rZDe5xJ5f1dHHQ4gubIdbPz7zPv1ywUXcH-8Pg2BQbOtF9aml2HyderNaZFix-wXcaTB86ekegG542adSjzCrYK1aU5AfQLhBlO4HWUy2KZKu5VPXMh6',
  'Content-Type': 'application/json',
};

async function fetchPost({urlString, bodyObject}) {
  const data = await fetch(urlString, {
    method: 'POST',
    headers: headerJson,
    body: JSON.stringify(bodyObject),
  });
  console.log('fetchPost', data);
  return data.json;
}

export {fetchPost};
