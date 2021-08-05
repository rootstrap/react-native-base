# ErrorMessage Component

The ErrorMessage component encapsulates the logic for displaying error messages to users. Although it appears to be a simple text, the component has a few accessibility features built in that are really helpful.

## Props

**message:** the message to display and read out loud

## Accessibility

- When the error message changes it is announced to screen readers
  - For Android it uses the `accessibilityLiveRegion` property with the `polite` value so it waits to announce in case the screen reader was talking
  - For iOS it uses the `AccessibilityInfo.announceForAccessibility` method via a custom hook that triggers the announcement automatically when the error message changes
