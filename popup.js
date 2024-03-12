document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('btnGetDOM');
  button.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: getDOM
      });
    });
  });
  const buttonsGetURL = document.querySelectorAll('.getURL');
  console.log(buttonsGetURL);
  buttonsGetURL.forEach((buttonGetURL) => {
    buttonGetURL.addEventListener('click', function() {
      getURL();
    });
  });
});

function getDOM() {
  const urlCurrent = window.location.href;
  const html = document.documentElement.querySelector('body').innerText;
  chrome.runtime.sendMessage({action: 'getDOM', content: html, url: urlCurrent});
}

function getURL() {
  console.log('getURL')
  chrome.runtime.sendMessage({action: 'getURL'});
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "log_in") {
    console.log(message.error);
    const login_message = document.querySelector("#login_message");
    login_message.classList.remove("hidden");
    const div_get_dom = document.querySelector("#getDom");
    div_get_dom.classList.add("hidden");
  }
  else if (message.action == "error_network") {
    const error_message = document.querySelector("#errorMessage");
    error_message.classList.remove("hidden");
    error_message.querySelector("p").innerText = message.content;
  }
  else if (message.action == "create_ok") {
    const success_message = document.querySelector("#successMessage");
    success_message.classList.remove("hidden");
    success_message.querySelector("p").innerText = "Done !";
    const div_get_dom = document.querySelector("#getDom");
    div_get_dom.classList.add("hidden");
  }
  else if (message.action == "create_error") {
    const error_message = document.querySelector("#errorMessage");
    error_message.classList.remove("hidden");
    error_message.querySelector("p").innerText = "Error creating post : " + message.content;
  }
});
