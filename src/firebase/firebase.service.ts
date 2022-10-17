import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { app } from 'firebase-admin';
import App = app.App;

@Injectable()
export class FirebaseService {
  public static defaultApp: App;

  public static initApp() {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Initializing Firebase...');
    }
    FirebaseService.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(
        process.env.FIREBASE_PATH_SERVICE_ACCOUNT,
      ),
    });
  }

  async createNewUserInFirebase(
    email: string,
    password: string,
  ): Promise<string> {
    return FirebaseService.defaultApp
      .auth()
      .createUser({
        email,
        password,
      })
      .then((user) => {
        return user.uid;
      });
  }

  async getUserByEmailFromFirebase(email: string): Promise<string> {
    return FirebaseService.defaultApp
      .auth()
      .getUserByEmail(email)
      .then((user) => {
        return user.uid;
      })
      .catch((e) => {
        return e.message;
      });
  }
}
