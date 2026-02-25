figma.showUI(__html__, { visible: false });
figma.ui.onmessage = (msg) => {
  try {
    if (msg.type === 'code') {
      eval(msg.data);
    }
  } catch (e) {
    console.error("Figma Script Error:", e);
    figma.ui.postMessage({ type: 'error', data: e.message, stack: e.stack });
  }
};