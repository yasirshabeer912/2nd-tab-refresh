let intervalId;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "" }); 
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    startRefreshing();
  } else if (message.action === "stop") {
    stopRefreshing();
  }
});

function startRefreshing() {
  intervalId = setInterval(refreshTab, 120000); 
  chrome.action.setBadgeText({ text: "ON" }); 
  chrome.tabs.query({ index: 1 }, (tabs) => {
    if (tabs && tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
}

function stopRefreshing() {
  clearInterval(intervalId);
  chrome.action.setBadgeText({ text: "" }); 
}

function refreshTab() {
  chrome.tabs.query({ index: 1 }, (tabs) => {
    if (tabs && tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
}
