import * as admin from 'firebase-admin';

// Initialize Firebase Admin first
admin.initializeApp({
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'sign-wave',
  databaseURL: 'https://sign-wave-default-rtdb.firebaseio.com/', // Note: Needs valid RTDB url if heavily used
});

import * as express from 'express';
import * as cors from 'cors';
import {FirebaseDatabase} from '@firebase/database-types';
import {prerenderApp} from './prerender/controller';
import {textToTextApp} from './text-to-text/controller';
import {textNormalizationApp} from './text-normalization/controller';

const app = express();
app.use(cors());
app.use(express.json());

const database = <FirebaseDatabase>admin.database();
const storage = admin.storage() as any;

// Mount the Firebase Function controllers directly into Express
// The controllers export functions that expect an Express App beneath them.
// But some of them (like gatewayFunction) are already HTTP wrapped by Firebase.
// However, since we are moving away from Cloud Functions, we should mount the underlying Express Apps instead of the v2 wrappers.

import {avatars} from './gateway/avatars';
import {me} from './gateway/me';
import {spokenToSigned} from './gateway/spoken-to-signed';
import {unkeyAuth} from './middlewares/unkey-auth.middleware';
import {createAppCheckKey} from './middlewares/create-appcheck.middleware';
import {optionsRequest} from './middlewares/options.request';
import {errorMiddleware} from './middlewares/error.middleware';

// 1. Re-create the Gateway Controller locally
const gatewayApp = express();
gatewayApp.use(cors());
gatewayApp.use(unkeyAuth);
gatewayApp.use(createAppCheckKey);
gatewayApp.options('*', optionsRequest);
spokenToSigned(gatewayApp);
me(gatewayApp);
avatars(gatewayApp);
gatewayApp.use(errorMiddleware);

// 2. The other controllers export full Express sub-applications wrapped in "functions.https.onRequest",
// which behaves as standard Express (req, res). We can mount them under their prefixes.
app.use('/api/v1', gatewayApp);
// We are mimicking the rewrites from firebase.json
app.use('/api/spoken-to-signed', textToTextApp(database, storage));
app.use('/api/signed-to-spoken', textToTextApp(database, storage));
app.use('/api/text-normalization', textNormalizationApp(database));
app.use('/api/prerender', prerenderApp());

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Translate Backend Server listening on port ${port}`);
});
