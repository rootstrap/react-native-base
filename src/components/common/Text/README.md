# Text Component

The text component is a wrapper for the React Native Text component. It adds some functionalities to avoid code repetition, unify typographies in the app and make accessibility support easier.

## Principles

- There is a design system defining how the typography of the app should be.
- The system defines a limited amount of kinds of texts
- These typography definitions have been tested against WCAG (2.1 Level AA) related rules
- All texts in the app comply with said system

These principles allow for the base styling of all texts to be defined once and easily used everywhere.

## Props

**as:** Select the kind of text you want to display (like: headings [H1, H2, H3, H4], Body, captions: [C1, C2])
**children:** Same children you would pass to a React Native Text component
**style:** Allows you to add extra styling to the text like color, margin and more.
**noAllyPadding:** By default some text have extra vertical padding. This is because the text height does not meet the minimum required HIT AREA height and would be hard to tap otherwise. This prop allows for easily override in case it's needed.

## Accessibility

- Some text heights are too short to be comfortably tapped. For those cases a minimum vertical padding has been added. They can be overwritten with the noA11yPadding prop in true.
- All headings (H1, H2, H3, H4) have been set to have an `accessibilityRole` of `header` by default. This can be used by screen readers for example to quickly navigate through the headers of the screen and skip the content in between. This can also be set/overwritten by setting your own `accessibilityRole` prop when using the `Text` component.

## Notes

- the extra padding for accessibility is an experimental feature that has yet to be tested out in a real project. One think that it will require for sure is an agreement with design that texts should follow those padding rules at a minimum. This feature is meant to make the text component accessible out of the box and at least make devs mindful of the hit area requirement if they need to adjust the padding.
