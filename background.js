chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getDOM') {
    // Le contenu DOM est reçu depuis le script de contenu
    var domContent = message.content;

    // Ici, tu peux faire ce que tu veux avec le DOM récupéré, comme l'envoyer à un serveur, le traiter localement, etc.
    console.log('DOM récupéré:', domContent);
  }
});
