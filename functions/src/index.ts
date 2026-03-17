import * as admin from 'firebase-admin';
admin.initializeApp({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  databaseURL: 'https://sign-mt-default-rtdb.firebaseio.com/',
});

import * as functions from 'firebase-functions';
import {logConsoleMemory} from './utils/memory';
import {gatewayFunction} from './gateway/controller';

logConsoleMemory(process.env.NODE_ENV === 'production' ? functions.logger : console);

module.exports = {
  translate: {
    gateway: gatewayFunction,
  },
};
