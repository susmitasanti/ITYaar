chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "index.html", // Your extension's HTML file
    type: "popup",
    width: 400,
    height: 600,
    top: 100,
    left: 100,
    focused: true,
  });
});
