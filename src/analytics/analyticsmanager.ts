import FirebaseAnalyticsService from './FirebaseAnalyticsService';
import MixpanelAnalyticsService from './MixpanelAnalyticsService';

const selectedAnalyticsServices = process.env.ANALYTICS_SERVICES
  ? process.env.ANALYTICS_SERVICES.split(',')
  : [];

class AnalyticsManager {
  static initialize() {
    if (selectedAnalyticsServices.includes('firebase')) {
      FirebaseAnalyticsService.initialize();
    }

    if (selectedAnalyticsServices.includes('mixpanel')) {
      MixpanelAnalyticsService.initialize();
    }
  }

  static trackEvent(eventName: string, eventData: {}) {
    // You can extend this method to switch between services or send events to multiple services
    selectedAnalyticsServices.forEach(selectedService => {
      switch (selectedService) {
        case 'firebase':
          FirebaseAnalyticsService.trackEvent(eventName, eventData);
          break;
        case 'mixpanel':
          MixpanelAnalyticsService.trackEvent(eventName, eventData);
          break;
        // Add cases for other services

        default:
          console.error(`Unsupported analytics service: ${selectedService}`);
      }
    });
  }

  static identifyUser(userId: string) {
    // You can extend this method to switch between services or send events to multiple services
    selectedAnalyticsServices.forEach(selectedService => {
      switch (selectedService) {
        case 'firebase':
          FirebaseAnalyticsService.identifyUser(userId);
          break;
        case 'mixpanel':
          MixpanelAnalyticsService.identifyUser(userId);
          break;
        // Add cases for other services

        default:
          console.error(`Unsupported analytics service: ${selectedService}`);
      }
    });
  }

  static setUserProperties(userProperties: { [key: string]: string | null }) {
    // Set user properties in Mixpanel
    selectedAnalyticsServices.forEach(selectedService => {
      switch (selectedService) {
        case 'firebase':
          FirebaseAnalyticsService.setUserProperties(userProperties);
          break;
        case 'mixpanel':
          MixpanelAnalyticsService.setUserProperties(userProperties);
          break;
        // Add cases for other services

        default:
          console.error(`Unsupported analytics service: ${selectedService}`);
      }
    });
  }
}

export default AnalyticsManager;
