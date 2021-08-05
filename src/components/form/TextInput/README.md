# TextInput Component

The TextInput component is a simple Input created with accessibility. It is exported with the HOC withController from react-hook-form so it can be used directly on forms.

The styling of the component is very basic used to represent the accessibility considerations needed.

## Props

**label:** (Required) label to be displayed
**value:** This is received from the `withController` HOC
**onChange:** (Required) This is received from the `withController` HOC
**onBlur:** This is received from the `withController` HOC
**accessibilityLabel:** What will be read out loud to users, if not provided the label of the input will be read instead
**accessibilityHint:** The hint that will be read after the label
**returnKeyType:** Used to indicate the text on the return key when the input is focused and the keyboard is up. By default is `"next"`, when it's the last element it should be set to `"done"`
**error:** This is received from the `withController` HOC
**required:** used to add a decorator to the input label to mark it as required
**onSubmitEditing:** this should be usually set to focus on the next input, check `FormExample` component to see how it's done

It also has a props passthrough to the React Native `TextInput` component

## Accessibility

- The label is handled in another component but it is marked as non-accessible on purpose so it is not read. To complement that the label is set as the `accessibilityLabel` of the RN TextInput so the label is read when the user selects the input and not the label.
- It supports `accessibilityHint` to go with the `accessibilityLabel` if needed.
- It has a decorator for the required fields so users are able to distinguish them, this is passed to the Label component
- When the value is invalid the field uses a decorator `X` as well as color to indicate that so it doesn't rely only on color.
- The error message is handled by the ErrorMessage component which has it's own accessibility features
