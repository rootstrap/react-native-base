[X] Assign default labels to newly selected symbols
[X] Dispatch updateSelectedSymbols when dialog save button hit
[X] Re-fetch stocks when new symbol selected
[X] Move settings button to app screen header
[X] Improve picker UX and styling 
 
[X] Add loading indicator for stock refresh clicks (async)
[X] Improve setting lists styling && animate view transition
[X] Publish app and config CI - https://www.obytes.com/blog/react-native-ci-cd-github-action

[X] Add feature toggles to app UX
[X] Animate pull down refresh screen gesture, animate bounce the stock symbol - https://reactnative.dev/docs/easing

[] Allow user to supply IEX Cloud token 
[] Validation for existing user token
    - https://github.com/diogobh93/IEX-Cloud
    1. User presented with starting page "Configure Access" hidden behind flag in dev mode
    2. User can click a button to save a pasted token from clipboard after following step to create a token.
        - [Uses android shared preferences to store token](https://reactnative.dev/docs/security#android---secure-shared-preferences
    3. Or skip updating token if one already present in shared preferences.
)

