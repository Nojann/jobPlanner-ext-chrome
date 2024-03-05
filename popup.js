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
});

function getDOM() {
  const html = document.documentElement.querySelector('body').innerText;
  chrome.runtime.sendMessage({action: 'getDOM', content: html});
}

// chrome.runtime.onMessage.addListener((message, sender) => {
//   if (message == "log_in") {
//     const body = document.querySelector(body);

//     const logIn = '<div><h1>Your are not logged in </h1><button><a href="http://localhost:3000/" target="_blank"></a> Go to JobPlanner</button></div>'
//   }
// });

// message: { action: veleur, content: valeur}
