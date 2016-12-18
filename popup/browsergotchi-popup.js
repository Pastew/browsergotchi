var data;

chrome.storage.sync.get("data", function (item) {
    if(!item.data){
        console.log("Can't load storage.sync data in popup! Something is wrong");
        return;
    }

    data = item.data;

    var smartUrls = item.data.smartUrls;
    var smartUrlsUL = document.getElementById("browsergotchi-smartList");
    for (var i = 0; i < smartUrls.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(smartUrls[i]));

        const currUrl = smartUrls[i];
        var deleteBtn = document.createElement('span');
        deleteBtn.appendChild(document.createTextNode(' (x)'));
        deleteBtn.addEventListener('click', function (e) {
            var url = currUrl;
            removeUrlFromSmartList(url);
            e.target.parentNode.style.setProperty('display', 'none');
        });

        li.appendChild(deleteBtn);

        smartUrlsUL.appendChild(li);

    }

    var stupidUrls = item.data.stupidUrls;
    var stupidUrlsUL = document.getElementById("browsergotchi-stupidList");
    for (var i = 0; i < stupidUrls.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(stupidUrls[i]));

        const currUrl = stupidUrls[i];
        var deleteBtn = document.createElement('span');
        deleteBtn.appendChild(document.createTextNode(' (x)'));
        deleteBtn.addEventListener('click', function (e) {
            var url = currUrl;
            removeUrlFromStupidList(url);
            e.target.parentNode.style.setProperty('display', 'none');
        });

        li.appendChild(deleteBtn);

        stupidUrlsUL.appendChild(li);
    }
});

document.querySelector('.browsergotchi-switch .browsergotchi-smartBtn').addEventListener('click', function () {
    document.querySelector('.browsergotchi-switch .browsergotchi-stupidBtn').classList.remove('activated');
    this.classList.add('activated');
    document.querySelector('#browsergotchi-stupidList').style.setProperty('display', 'none');
    document.querySelector('#browsergotchi-smartList').style.setProperty('display', 'block');
});

document.querySelector('.browsergotchi-switch .browsergotchi-stupidBtn').addEventListener('click', function () {
    document.querySelector('.browsergotchi-switch .browsergotchi-smartBtn').classList.remove('activated');
    this.classList.add('activated');
    document.querySelector('#browsergotchi-smartList').style.setProperty('display', 'none');
    document.querySelector('#browsergotchi-stupidList').style.setProperty('display', 'block');
});


function removeUrlFromStupidList(url) {
    var idx = data.stupidUrls.indexOf(url)

    if (idx !== -1) {
        data.stupidUrls.splice(idx, 1);
    }
    chrome.storage.sync.set({"data": data}, function () {	});
}

function removeUrlFromSmartList(url) {
    var idx = data.smartUrls.indexOf(url);

    if (idx !== -1) {
        data.smartUrls.splice(idx, 1);
    }

    chrome.storage.sync.set({"data": data}, function () {	});
}

