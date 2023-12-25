// Récupère l'URL actuelle et affiche le résultat dans popup.html

const uwu = async () => {
  console.log("test");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];

    var url = currentTab.url;

    const rx = /.*\/shorts\/(.*)/g;
    const arr = rx.exec(url);
    window.open("https://youtu.be/" + arr[1]);
    chrome.tabs.remove(currentTab.id);
  });
};

const openYoutube = async () => {
  window.open("https://www.youtube.com");
};

const checkIfYoutube = async () => {
  await chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      let currentTab = tabs[0];
      let currentUrl = currentTab.url;
      if (currentUrl.startsWith("https://www.youtube.com")) {
        document.getElementById("no-ytb").remove();
        checkIfShort();
      } else {
        document.getElementById("ytb-short").remove();
        document.getElementById("ytb-noshort").remove();
      }
    }
  );
};

const checkIfShort = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];
    let currentUrl = currentTab.url;
    if (currentUrl.startsWith("https://www.youtube.com/shorts")) {
      document.getElementById("ytb-noshort").remove();
    } else {
      document.getElementById("ytb-short").remove();
      if (!currentUrl.includes("watch")) {
        document.getElementById("update-speed").remove();
      }
    }
  });
};

const changeSpeed = async () => {
  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  let currentTab = tabs[0];
  let spd = document.getElementById("wanted-speed").value;
  if (currentTab) {
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      function: (speed) => {
        document.getElementsByTagName("video")[0].playbackRate = speed;
      },
      args: [spd], // Pass spd as an argument to the executed function
    });
  }
};

document.getElementById("no-ytb").addEventListener("click", openYoutube);
document.getElementById("short").addEventListener("click", uwu);
document.addEventListener("DOMContentLoaded", function () {
  checkIfYoutube();
});
document.getElementById("validate-speed").addEventListener("click", changeSpeed);
