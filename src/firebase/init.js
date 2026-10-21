import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCaAKYIFFDsgSy_j3KI0EfpRHVPI-GdZnM',
  authDomain: 'fit5032-4a2ec.firebaseapp.com',
  projectId: 'fit5032-4a2ec',
  storageBucket: 'fit5032-4a2ec.firebasestorage.app',
  messagingSenderId: '454080544006',
  appId: '1:454080544006:web:9cdf3c91a0338108f5b287'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Authentication
const auth = getAuth(firebaseApp)

// Initialize Firestore
const db = getFirestore(firebaseApp)

// Export Firebase services
export { firebaseApp, auth, db }

export default db