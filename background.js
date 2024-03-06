const url = "http://localhost:3000/"
// const url = "http://www.localhost:3000/"

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getDOM') {
    // Le contenu DOM est reçu depuis le script de contenu
    const domContent = message.content;

    // Ici, tu peux faire ce que tu veux avec le DOM récupéré, comme l'envoyer à un serveur, le traiter localement, etc.
    console.log('DOM récupéré:', domContent);

    chrome.cookies.get({ url: url, name: "signed_in" }, function(cookie) {
      console.log(cookie);
      if (cookie) {
        const url_posts_api = `${url}/api/v1/posts`
        const details = {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: domContent, token: cookie.value })
        }
        fetch(url_posts_api, details)
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            // chrome.runtime.sendMessage({ data.message })

          } else {
            chrome.runtime.sendMessage({ action: "nok", content: `${data.status}` })
          }
        })
      } else {
      chrome.runtime.sendMessage({message: "cookie not found. User is not connected", action: "log_in" });
      }
    });
  }
});
