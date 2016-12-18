chrome.storage.sync.get("data", function (item) {
    if(!item.data){
        console.log("Can't load storage.sync data in popup! Something is wrong");
        return;
    }

    var smartUrls = item.data.smartUrls;
    var smartUrlsUL = document.getElementById("smartList");
    for (var i = 0; i < smartUrls.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(smartUrls[i]));
        smartUrlsUL.appendChild(li);
    }

    var stupidUrls = item.data.stupidUrls;
    var stupidUrlsUL = document.getElementById("stupidList");
    for (var i = 0; i < stupidUrls.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(stupidUrls[i]));
        stupidUrlsUL.appendChild(li);
    }
});