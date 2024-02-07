import FirebaseAnalyticsService from './FirebaseAnalyticsService';
import MixpanelAnalyticsService from './MixpanelAnalyticsService';

class AnalyticsManager {
  static initialize() {
    FirebaseAnalyticsService.initialize();
    MixpanelAnalyticsService.initialize();
  }

  static trackEvent(eventName: string, eventData: {}) {
    FirebaseAnalyticsService.trackEvent(eventName, eventData);
    MixpanelAnalyticsService.trackEvent(eventName, eventData);
  }

  static identifyUser(userId: string) {
    FirebaseAnalyticsService.identifyUser(userId);
    MixpanelAnalyticsService.identifyUser(userId);
  }

  static setUserProperties(userProperties: { [key: string]: string | null }) {
    FirebaseAnalyticsService.setUserProperties(userProperties);
    MixpanelAnalyticsService.setUserProperties(userProperties);
  }
}

export default AnalyticsManager;
