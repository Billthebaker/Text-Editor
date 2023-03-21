const butInstall = document.getElementById('buttonInstall');


butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    // Check if there is a deferredPrompt event
    if (!promptEvent) {
        return;
    }
    // Prompt the user to install the app
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const result = await promptEvent.userChoice;
    // Reset the deferredPrompt variable
    window.deferredPrompt = null;
    // Hide the "install" button
    butInstall.classList.toggle('hidden', true);
});


window.addEventListener('appinstalled', (event) => {
    // Reset the deferredPrompt variable
    window.deferredPrompt = null;
    // butInstall.classList.toggle('hidden', false);

});

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
  });
  