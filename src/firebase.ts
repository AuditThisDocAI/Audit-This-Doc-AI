import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let app: any
let auth: any
let db: any

export async function initFirebase() {
  if (getApps().length > 0) { app = getApp() auth = getAuth(app) db = getFirestore(app) return { app, auth, db }
                            }
 
  const response = await fetch('/firebase-applet-config.json')
  const config = await response.json()
 app = initializeApp(config)
 auth = getAuth(app)
db = getFirestore(app)
return { app, auth, db }
}
 
  
