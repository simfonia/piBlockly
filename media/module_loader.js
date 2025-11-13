// piblockly/media/module_loader.js

export async function loadModule(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch module from ${url}: ${response.statusText}`);
    }
    const code = await response.text();
    const blob = new Blob([code], { type: 'text/javascript' });
    const moduleUrl = URL.createObjectURL(blob);
    const module = await import(moduleUrl);
    URL.revokeObjectURL(moduleUrl); // Clean up the object URL

    // Return the module which should contain registerBlocks and toolbox
    return module;
  } catch (e) {
    console.error('Error loading module:', url, e);
    return null;
  }
}