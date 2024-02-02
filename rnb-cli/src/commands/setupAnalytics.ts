// setup.js
const readline = require("readline")
const fs = require("fs")
const { execSync } = require("child_process")

const ANALYTICS_OPTIONS = ["Firebase", "Mixpanel"]

function installDependencies(selectedServices) {
  try {
    console.log("Installing dependencies...")

    // Install specific dependencies based on selected services
    selectedServices.forEach((service) => {
      switch (service) {
        case "Firebase":
          execSync("yarn add @react-native-firebase/app", { stdio: "inherit" })
          execSync("yarn add @react-native-firebase/analytics", { stdio: "inherit" })
          execSync("cd ios/ && pod install", { stdio: "inherit" })
          break
        case "Mixpanel":
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
      case "Firebase":
        envContent += `FIREBASE_API_KEY=your_firebase_api_key`
        break
      case "Mixpanel":
        envContent += `MIXPANEL_API_TOKEN=your_mixpanel_api_token`
        break
    }
  })

  fs.appendFile(".env.example", "", (err) => {
    if (err) {
      console.error('Error writing to .env.example file:', err);
      process.exit(1); // Exit the process with an error code
    }
    console.log('.env.example file updated successfully.');
  });
  
  fs.appendFile(".env", envContent, (err) => {
    if (err) {
      console.error('Error writing to .env file:', err);
      process.exit(1); // Exit the process with an error code
    }
    console.log('.env file updated successfully.');
  });
}

function configureAnalyticsFiles(selectedServices) {
  selectedServices.forEach((service) => {
    switch (service) {
      case "Firebase":
        // Generate or modify Firebase configuration files
        console.log("Configuring Firebase...")
        break
      case "Mixpanel":
        // Generate or modify Mixpanel configuration files
        console.log("Configuring Mixpanel...")
        break
      // Add cases for other services
    }
  })
}

async function runSetup() {
  const selectedServices = await chooseAnalyticsServices()

  installDependencies(selectedServices)

  generateEnvFile(selectedServices)

  configureAnalyticsFiles(selectedServices)

  console.log("Analytics sercices setup completed.")
  console.log("Don't forget to configure your api keys on your envfile.")
}

runSetup()
