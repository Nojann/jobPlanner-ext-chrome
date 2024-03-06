const url = "http://localhost:3000/"
// const url = "http://www.localhost:3000/"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getDOM') {

    const textContent = message.content;
    const urlCurrent = message.url;

    chrome.cookies.get({ url: url, name: "signed_in" }, (cookie) => {
      if (cookie) {
        console.log(cookie);
        fetch_jobplanner_api(textContent, urlCurrent, cookie);
      } else {
        chrome.runtime.sendMessage({error: "Cookie not found. User is not connected", action: "log_in" });
      }
    });
  }
});

const fetch_jobplanner_api = (textContent, urlCurrent, cookie) => {

  const url_posts_api = `${url}/api/v1/posts`
    const details = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({content: textContent, url:urlCurrent, token: cookie.value })
    }


    fetch(url_posts_api, details)
      .then(response => {
        try {
          if (response.status !== 201) {
            throw new Error("Network response was not ok");
          } else {
            return response.json();
          }
        } catch (error) {
          chrome.runtime.sendMessage({ action: "error_network", content: `Statut : ${response.status}` })
          console.error('Error:', error);
        }
      })
      .then((data) => {
        console.log(data);
        if (data.message) {
          chrome.runtime.sendMessage({ action: "create_ok", content: `` })
        } else {
          chrome.runtime.sendMessage({ action: "create_error", content: `` })
        }
      })
      .catch ((error) => {
        chrome.runtime.sendMessage({ action: "error_network", content: `${url_posts_api} is not found.` });
        console.log('Error:', error);
      })

}
