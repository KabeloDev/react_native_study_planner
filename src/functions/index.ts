import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendDueReminders = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    const now = new Date().toISOString();
    const remindersRef = admin.firestore().collection('reminders');

    const snapshot = await remindersRef
      .where('status', '==', 'pending')
      .where('reminderTime', '<=', now)
      .get();

    if (snapshot.empty) {
      console.log('No reminders to send at this time.');
      return null;
    }

    const messages = snapshot.docs.map(async (doc) => {
      const reminder = doc.data();

      if (!reminder.fcmToken) return;

      await admin.messaging().send({
        token: reminder.fcmToken,
        notification: {
          title: `Study Reminder: ${reminder.subject || 'Study'}`,
          body: reminder.topic,
        },
      });

      await doc.ref.update({ status: 'sent' });
    });

    await Promise.all(messages);
    console.log(`Sent ${messages.length} reminder(s).`);
    return null;
  });
