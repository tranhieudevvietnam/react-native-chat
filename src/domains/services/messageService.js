import {fetchPost} from './fetchNetwork';

const sendNotification = async ({
  deviceTokenString,
  messageString,
  fullNameString,
}) => {
  await fetchPost({
    urlString: 'https://fcm.googleapis.com/fcm/send',
    bodyObject: {
      to: deviceTokenString,
      notification: {
        title: fullNameString,
        body: messageString,
      },
    },
  }).then(() => {
    console.log('sendNotification-deviceTokenString', deviceTokenString);
  });
};

export {sendNotification};
