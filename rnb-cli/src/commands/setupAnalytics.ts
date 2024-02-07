// setup.js
const readline = require("readline")
const fs = require("fs")
const { execSync } = require("child_process")

const FIREBASE = "Firebase"
const MIXPANEL = "Mixpanel"

const ANALYTICS_OPTIONS = [FIREBASE, MIXPANEL]

function installDependencies(selectedServices) {
  try {
    console.log("Installing dependencies...")

    // Install specific dependencies based on selected services
    selectedServices.forEach((service) => {
      switch (service) {
        case FIREBASE:
          execSync("yarn add @react-native-firebase/app", { stdio: "inherit" })
          execSync("yarn add @react-native-firebase/analytics", { stdio: "inherit" })
          execSync("cd ios/ && pod install", { stdio: "inherit" })
          break
        case MIXPANEL:
          execSync("yarn add mixpanel-react-native", { stdio: "inherit" })
          execSync("cd ios/ && pod install", { stdio: "inherit" })
          break
        // Add cases for other services

        default:
          console.error(`Unsupported analytics service: ${service}`)
          process.exit(1)
      }
    })

    console.log("Dependencies installed successfully.")
  } catch (error) {
    console.error("Error installing dependencies:", error.message)
    process.exit(1)
  }
}
const promptUserToChoose = () => {
  console.log("Choose analytics services (separate your selection with a comma, Enter to finish):")

  ANALYTICS_OPTIONS.forEach((option, index) => {
    const optionIndex = index + 1
    console.log(`${optionIndex}. ${option}`)
  })
}
function chooseAnalyticsServices() {
  // Add more options as needed
  let selectedServices = []

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  promptUserToChoose()

  rl.on("line", (input) => {
    const trimmedInput = input.trim()

    if (trimmedInput === "") {
      // If user presses Enter without selecting an option
      rl.close()
      return
    }

    let selectedIndices = trimmedInput.split(" ").map((index) => parseInt(index, 10))

    let isValidInput = selectedIndices.length > 0

    selectedIndices.forEach((index) => {
      const selectedOption = ANALYTICS_OPTIONS[index - 1]
      if (selectedOption) {
        selectedServices.push(selectedOption)
      } else {
        isValidInput = false
        selectedServices = []
        console.log(`\nInvalid input: ${input}. Please choose a valid option.`)
      }
    })

    if (!isValidInput) {
      promptUserToChoose()
    } else {
      rl.close() // Close the interface when valid input is received
    }
  })

  return new Promise((resolve) => {
    rl.on("close", () => {
      resolve(selectedServices)
    })
  })
}

function generateEnvFile(selectedServices) {
  let envContent = ``
  selectedServices.forEach((service) => {
    switch (service) {
      case FIREBASE:
        envContent += `FIREBASE_API_KEY=your_firebase_api_key`
        break
      case MIXPANEL:
        envContent += `MIXPANEL_API_TOKEN=your_mixpanel_api_token`
        break
    }
  })

  fs.appendFile(".env.example", "", (err) => {
    if (err) {
      console.error("Error writing to .env.example file:", err)
      process.exit(1) // Exit the process with an error code
    }
    console.log(".env.example file updated successfully.")
  })

  fs.appendFile(".env.dev", envContent, (err) => {
    if (err) {
      console.error("Error writing to .env.dev file:", err)
      process.exit(1) // Exit the process with an error code
    }
    console.log(".env.dev file updated successfully.")
  })
}

function generateAnalyticsManager(selectedServices) {
  // Start by defining the base structure of the AnalyticsManager class
  let analyticsManagerCode = ""
  const directoryPath = "./src/analytics"

  // Create the directory if it doesn't exist
  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err)
      return
    }
    if (selectedServices.includes(FIREBASE)) {
      analyticsManagerCode += `import FirebaseAnalyticsService from './FirebaseAnalyticsService';`
      fs.copyFile(
        "./rnb-cli/src/analytics/FirebaseAnalyticsService.ts",
        "./src/analytics/FirebaseAnalyticsService.ts",
        (err) => {
          if (err) {
            console.error("Error copying file FirebaseAnalyticsService:", err)
            return
          }
          console.log("File FirebaseAnalyticsService copied successfully!")
        },
      )
    }
    if (selectedServices.includes(MIXPANEL)) {
      fs.copyFile(
        "./rnb-cli/src/analytics/MixpanelAnalyticsService.ts",
        "./src/analytics/MixpanelAnalyticsService.ts",
        (err) => {
          if (err) {
            console.error("Error copying file MixpanelAnalyticsService:", err)
            return
          }
          console.log("File MixpanelAnalyticsService copied successfully!")
        },
      )
      analyticsManagerCode += `import MixpanelAnalyticsService from './MixpanelAnalyticsService';`
    }

    analyticsManagerCode += `
    class AnalyticsManager {
    static initialize() {`

    if (selectedServices.includes(FIREBASE)) {
      analyticsManagerCode += `
          FirebaseAnalyticsService.initialize();`
    }
    if (selectedServices.includes(MIXPANEL)) {
      analyticsManagerCode += `
          MixpanelAnalyticsService.initialize();`
    }

    // Close the initialize() method and start trackEvent()
    analyticsManagerCode += `
    }

    static trackEvent(eventName: string, eventData: {}) {`

    // Append trackEvent implementation for each selected service
    if (selectedServices.includes(FIREBASE)) {
      analyticsManagerCode += `
        FirebaseAnalyticsService.trackEvent(eventName, eventData);`
    }
    if (selectedServices.includes(MIXPANEL)) {
      analyticsManagerCode += `
        MixpanelAnalyticsService.trackEvent(eventName, eventData);`
    }
    // Close the trackEvent() method and start identifyUser()
    analyticsManagerCode += `
    }

    static identifyUser(userId: string) {`

    // Append identifyUser implementation for each selected service
    if (selectedServices.includes(FIREBASE)) {
      analyticsManagerCode += `
      FirebaseAnalyticsService.identifyUser(userId);`
    }
    if (selectedServices.includes(MIXPANEL)) {
      analyticsManagerCode += `
      MixpanelAnalyticsService.identifyUser(userId);`
    }

    // Close the identifyUser() method and start setUserProperties()
    analyticsManagerCode += `
    }

    static setUserProperties(userProperties: { [key: string]: string | null }) {`

    // Append setUserProperties implementation for each selected service
    if (selectedServices.includes(FIREBASE)) {
      analyticsManagerCode += `
      FirebaseAnalyticsService.setUserProperties(userProperties);`
    }
    if (selectedServices.includes(MIXPANEL)) {
      analyticsManagerCode += `
      MixpanelAnalyticsService.setUserProperties(userProperties);`
    }

    // Close the setUserProperties() method and the AnalyticsManager class definition
    analyticsManagerCode += `
    }

    }

    export default AnalyticsManager;
    `

    // Write the generated code to a file
    fs.writeFileSync("./src/analytics/AnalyticsManager.ts", analyticsManagerCode)
    execSync("yarn lint ./src/analytics/AnalyticsManager.ts --fix", { stdio: "inherit" })
  })
}

async function runSetup() {
  const selectedServices = await chooseAnalyticsServices()

  // installDependencies(selectedServices)

  generateEnvFile(selectedServices)

  generateAnalyticsManager(selectedServices)

  console.log("Analytics sercices setup completed.")
  console.log("Don't forget to configure your api keys on your envfile.")
}

runSetup()
