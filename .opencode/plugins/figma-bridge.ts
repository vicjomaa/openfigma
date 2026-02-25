import { type Plugin, tool } from "@opencode-ai/plugin"

export const FigmaBridgePlugin: Plugin = async ({ $ }) => {
  return {
    tool: {
      design_figma: tool({
        description: "Executes JavaScript code directly in the Figma Desktop app via a local bridge.",
        args: {
          code: tool.schema.string().describe("The Figma Plugin API code to execute"),
        },
        run: async ({ code }) => {
          // This command sends the code to your local Node.js server
          // We use 'printf' to handle multiline code safely
          try {
            await $`printf %s ${code} | nc -lk 127.0.0.1 3000`;
            return "Command sent to Figma successfully.";
          } catch (e) {
            return `Error sending to Figma: ${e.message}`;
          }
        },
      }),
    },
  }
}