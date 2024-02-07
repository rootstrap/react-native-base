// MixpanelAnalyticsService.js
import { Mixpanel } from "mixpanel-react-native"

const mixpanelApiToken = process.env.MIXPANEL_API_TOKEN
const trackAutomaticEvents = false
if (!mixpanelApiToken) {
  throw Error("Mixpanel API TOKEN is missing")
}
const mixpanel = new Mixpanel(mixpanelApiToken, trackAutomaticEvents)

export default class MixpanelAnalyticsService {
  static initialize() {
    // Initialize Mixpanel with your Mixpanel project token

    mixpanel.init()
  }

  static trackEvent(eventName: string, eventData: object) {
    // Track events in Mixpanel
    mixpanel.track(eventName, eventData)
  }

  static identifyUser(userId: string) {
    mixpanel.identify(userId)
  }

  static setUserProperties(userProperties: { [key: string]: string | null }) {
    // Set user properties in Mixpanel
    mixpanel.getPeople().set(userProperties)
  }

  // Add other common methods for Mixpanel Analytics if needed
}
