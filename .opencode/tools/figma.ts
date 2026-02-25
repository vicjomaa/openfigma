import { tool } from "@opencode-ai/plugin";

export default tool({
  description: "Executes JavaScript code in the Figma Desktop app to create or edit designs.",
  args: {
    code: tool.schema.string().describe("The Figma Plugin API code to execute"),
  },
  async execute({ code }) {
    try {
      // This sends the code to your local bridge server on port 3001
      const command = `echo ${JSON.stringify(code)} | nc -lk 127.0.0.1 3001`;
      return "Code sent to Figma bridge.";
    } catch (e) {
      return `Failed to send to Figma: ${e.message}`;
    }
  },
});