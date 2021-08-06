# InputLabel Component

Simple Label component to standardize it across all components.

## Props

**text:** the label
**withRequiredIndicator:** boolean to determine if a decorator should be added to the label to mark it as required

## Accessibility

- Marked as non-accessible on purpose since it should not be read out loud. The input itself should have the label read out loud using the `accessibilityLabel` prop.
- Has a required decorator to indicate when a field is required to make it easier for users to fill the form right and not get frustrated
