var muted = false

browser.browserAction.onClicked.addListener(mute);
function getTabs(){
  return browser.tabs.query({})
}

function mute(){
  if(muted){
    browser.tabs.query({}).then((tabs) => {
      tabs.forEach(function(tab){
        browser.tabs.update(tab.id, {muted: false})
      })
      muted = false
      browser.browserAction.setIcon({path: "icons/mute.png"})
    })
  }
  else{
    var currentID;
    browser.tabs.query({active: true}).then((tab) => {
      currentID = tab[0].id
    })
    browser.tabs.query({}).then((tabs) => {
      tabs.forEach(function(tab){
        if(tab.id != currentID){
          browser.tabs.update(tab.id, {muted: true})
        }
      })
    })
      muted = true
      browser.browserAction.setIcon({path: "icons/unmute.png"})
    }
}

function getCurrentID(){
  var gettingCurrent = browser.tabs.getCurrent();
  gettingCurrent.then((tab) => {
    return tab.id
  });
}
