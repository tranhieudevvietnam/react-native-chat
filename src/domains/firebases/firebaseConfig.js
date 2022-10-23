import Firebase from 'firebase';

const firebaseConfig = {
  databaseURL:
    'https://chat-app-aee69-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'chat-app-aee69',
  apiKey:
    'AAAAqnH0hbs:APA91bGxvijuAFxNkwwYn8s7rZDe5xJ5f1dHHQ4gubIdbPz7zPv1ywUXcH-8Pg2BQbOtF9aml2HyderNaZFix-wXcaTB86ekegG542adSjzCrYK1aU5AfQLhBlO4HWUy2KZKu5VPXMh6',
};

export default Firebase.initializeApp(firebaseConfig);
