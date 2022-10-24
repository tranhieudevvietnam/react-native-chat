import {fetchPost} from './fetchNetwork';

const sendNotification = async ({
  deviceTokenString,
  messageString,
  fullNameString,
}) => {
  const data = await fetchPost({
    urlString: 'https://fcm.googleapis.com/fcm/send',
    bodyObject: {
      to: deviceTokenString,
      notification: {
        title: fullNameString,
        body: messageString,
      },
    },
  });
  console.log('sendNotification', data);
};

export {sendNotification};
