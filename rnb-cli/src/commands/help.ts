import { GluegunToolbox } from "gluegun"
import { p, command, heading } from "../tools/pretty"

module.exports = {
  dashed: true,
  alias: ["h"],
  description: "Displays React Native Base CLI help",
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox

    p()

    heading(`Welcome to React Native Base CLI ${meta.version()}!`)
    p()
    heading("Commands")
    p()
    command("rename      ", "Renames your React Native project (experimental)", [
      "React Native Base CLI rename NewName com.mycompany.newname",
    ])
    p()
  },
}
