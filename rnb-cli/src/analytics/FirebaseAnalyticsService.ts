// FirebaseAnalyticsService.js
import analytics from "@react-native-firebase/analytics"

export default class FirebaseAnalyticsService {
  static initialize() {
    // Initialize Firebase Analytics
    analytics().setAnalyticsCollectionEnabled(true) // Enable analytics collection
  }

  static trackEvent(eventName: string, eventData: object) {
    // Track events in Firebase Analytics
    analytics().logEvent(eventName, eventData)
  }

  static identifyUser(userId: string) {
    analytics().setUserId(userId)
  }

  static setUserProperties(userProperties: { [key: string]: string | null }) {
    // Set user properties in Mixpanel
    analytics().setUserProperties(userProperties)
  }

  // Add other common methods for Firebase Analytics if needed
}
