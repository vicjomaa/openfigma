# OpenCode Figma Bridge

A bridge between OpenCode and Figma that allows you to execute Figma API code from the command line.

## Installation

1. **Install Figma Plugin:**
   - Open Figma
   - Go to `Plugins` → `Create Plugin` → `Import Manifest from file`
   - Select the `manifest.json` file from this repository

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure (optional):**
   ```bash
   node configure-opencode.js
   ```

## Usage

1. **Start the Server:**
   ```bash
   npm start
   ```

   Or in development mode:
   ```bash
   npm run start:dev
   ```

2. **Stop the Server:**
   ```bash
   npm run stop
   ```

3. **Restart the Server:**
   ```bash
   npm run restart
   ```

4. **Install Plugin (reminder):**
   ```bash
   npm run install-plugin
   ```

## Commands

Once the server is running, you can send Figma API commands:

```bash
# Create a red square
node -e "const net = require('net'); const client = new net.Socket(); client.connect(3001, '127.0.0.1', () => { const code = 'const rect = figma.createRectangle(); rect.x = 0; rect.y = 0; rect.width = 500; rect.height = 500; rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]; figma.currentPage.appendChild(rect);'; client.write(code); client.end(); });"

# Scale selected objects
node -e "const net = require('net'); const client = new net.Socket(); client.connect(3001, '127.0.0.1', () => { const code = 'const selection = figma.currentPage.selection; for (const node of selection) { node.width = node.width * 0.5; node.height = node.height * 0.5; }'; client.write(code); client.end(); });"
```

## Configuration

The configuration file is stored at:
- **Windows:** `%APPDATA%\OpenCode\figma-bridge.json`
- **macOS:** `~/Library/Application Support/OpenCode/figma-bridge.json`

You can edit the configuration manually or use the configure script:

```bash
node configure-opencode.js
```

## Troubleshooting

### Common Issues

1. **Port Already in Use:**
   ```bash
   # Check what's using the port
   netstat -ano | findstr ":3000 :3001"
   
   # Kill the process
   taskkill /F /PID [PID_NUMBER]
   ```

2. **Figma Plugin Not Connected:**
   - Ensure the plugin is running in Figma
   - Check the server logs for connection status

3. **Font Loading Errors:**
   - Always load fonts before using them:
   ```javascript
   await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
   ```

### Logs

The server logs connection status and any errors:
```
Bridge active. Plugin on 3000, OpenCode on 3001
✅ Figma Plugin Connected
🚀 Code sent to Figma
```

## Development

### File Structure

- `server.js` - Main WebSocket/TCP bridge server
- `code.js` - Figma plugin code execution
- `ui.html` - Figma plugin UI
- `manifest.json` - Figma plugin manifest
- `configure-opencode.js` - Configuration utility

### Adding New Commands

1. Create your Figma API code in a separate file
2. Use the TCP client to send it to the server
3. Check the Figma debug console for output

## License

MIT