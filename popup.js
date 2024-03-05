document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('btnGetDOM');
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
  var html = document.documentElement.querySelector('body').innerText;
  chrome.runtime.sendMessage({action: 'getDOM', content: html});
}
