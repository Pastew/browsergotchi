var URLManager = (function () {
	var stupidUrls = ["joemonster.org", "wykop", "demotywatory"];
	var smartUrls = ["stackoverflow", "khanacademy", "duolingo", "quora", "google"];

	var getStupidUrls = function() {
		return stupidUrls;
	}

    var getSmartUrls = function() {
        return smartUrls;
    }

    var setSmartUrls = function(urls) {
        smartUrls = urls
    }
	
	var setStupidUrls = function(urls){
		stupidUrls = urls;
	}
	
	var isStupidUrl = function (url) {
		for (var i = 0; i < stupidUrls.length; i++) {
			if(url.includes(stupidUrls[i])){
				return true;
			}
		}
		return false;
	}

    var isSmartUrl = function (url) {
        for (var i = 0; i < smartUrls.length; i++) {
            if(url.includes(smartUrls[i])){
                return true;
            }
        }
        return false;
    }

    var getCurrentWebsiteName = function() {
		var url = window.location.hostname;

		return url
    }

    var isCategoryStupid = function(category){
        var stupidCategories = [1,10,18,20,21,22,23,24,26,30,31,32,34,37,39,40,41,42,43,44];
        for (var i = 0 ; i < stupidCategories.length ; i++)
        	if(stupidCategories[i].toString() === category.toString())
				return true;

		return false;
	}

	var getCategoryName = function(categoryId){
		var categories = [];
        categories[2] = "Autos & Vehicles",
		categories[1] = " Film & Animation",
		categories[10] = "Music",
		categories[15] = "Pets & Animals",
		categories[17] = "Sports",
		categories[18] = "Short Movies",
		categories[19] = "Travel & Events",
		categories[20] = "Gaming",
		categories[21] = "Videoblogging",
		categories[22] = "People & Blogs",
		categories[23] = "Comedy",
		categories[24] = "Entertainment",
		categories[25] = "News & Politics",
		categories[26] = "Howto & Style",
		categories[27] = "Education",
		categories[28] = "Science & Technology",
		categories[29] = "Nonprofits & Activism",
		categories[30] = "Movies",
		categories[31] = "Anime/Animation",
		categories[32] = "Action/Adventure",
		categories[33] = "Classics",
		categories[34] = "Comedy",
		categories[35] = "Documentary",
		categories[36] = "Drama",
		categories[37] = "Family",
		categories[38] = "Foreign",
		categories[39] = "Horror",
		categories[40] = "Sci-Fi/Fantasy",
		categories[41] = "Thriller",
		categories[42] = "Shorts",
		categories[43] = "Shows",
		categories[44] = "Trailers"

		if(!categories[categoryId])
			return "Unknown category";

        return categories[categoryId];
	}

	return {
		isStupidUrl: isStupidUrl,
		getStupidUrls: getStupidUrls,
		setStupidUrls: setStupidUrls,
		getSmartUrls: getSmartUrls,
        setSmartUrls: setSmartUrls,
		isSmartUrl: isSmartUrl,
        getCurrentWebsiteName: getCurrentWebsiteName,
        isCategoryStupid: isCategoryStupid,
        getCategoryName: getCategoryName
	}
})();

function displayInfobox(title, message) {
	var box;
    if ($('#browsergotchi-infobox').length > 0) {
    	box = $('#browsergotchi-infobox');
    	box.html();
	} else {
		box = $('<div id="browsergotchi-infobox"></div>');
		console.log(box);
		$('body').append(box);
	}
    $('<h2>').html(title).appendTo(box);
    $('<p>').html(message).appendTo(box);


    box.fadeIn();

    box.on('mouseover', function () {
        box.fadeOut('slow');
    });
}

function saveData(){
	console.log("Calling storage.sync.set");
	chrome.storage.sync.set({"data": data}, function () {
		refreshView();
	});	
}

function showDeathMessage() {
	$('#browsergotchi').html('');
	$('<h2>').html('Twoje zwierzątko nie żyje :(').appendTo('#browsergotchi');
	$('<p>').html('Twoje browsergotchi umarło na tej stronie internetowej, ponieważ nie ma tu pożywnego contentu.').appendTo('#browsergotchi');
	$('#browsergotchi').addClass('browsergotchi-dead')
}

/*
This function is executed by saveData.
If you want to update something in view window do it here.
*/
function refreshView(){
	$("#browsergotchi-hp").text("HP: " + data.hp);
	var url = chrome.extension.getURL('assets/' + getFrogImageBasedOnHP(data.hp));
	$('#browsergotchi-monster').attr('src', url);
	updateHPBar();
}

function initStorage(){
	console.log("Calling storage.sync.get");
	chrome.storage.sync.get("data", function (item) {
		console.log(item.data);
		if(!item.data){
			console.log("This is first run of this app. Will initialize fields");	
			data = new Object();
			data.hp = 100;
			data.tmp = "blublu";
			data.stupidUrls = URLManager.getStupidUrls();
            data.smartUrls = URLManager.getSmartUrls();
		}
		else{
			data = item.data;
			if(!data.stupidUrls){
				data.stupidUrls = URLManager.getStupidUrls();
			} else {
				URLManager.setStupidUrls(data.stupidUrls);
			}

            if(!data.smartUrls){
                data.smartUrls = URLManager.getSmartUrls();
            } else {
                URLManager.setSmartUrls(data.smartUrls);
            }
            saveData();
            refreshView();
		}
		console.log(data);
	});
}

function clearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}

function pauseTick(){
	window.clearInterval(intervalID);
}

function startTick(){
	//clearAllIntervals();
	window.clearInterval(intervalID);
	intervalID = window.setInterval(tick, TIME_BETWEEN_HIT*1000);
}

function tick(){
	if(window.location.href.includes("youtube.com/watch")){
        handleYoutubeUrl(window.location.href);
	}
	else if(URLManager.isStupidUrl(window.location.href))
		hit();
	else if (URLManager.isSmartUrl(window.location.href))
		heal();
	else
		onUnknownUrl();
}

function handleYoutubeUrl(url){
	var idIdx = url.indexOf('?v=') + 3;
	var ampIdx = url.indexOf('&');
	var videoId;

	if (ampIdx === -1) {
		videoId = url.substring(idIdx);
	} else {
        videoId = url.substring(idIdx, ampIdx);
	}

    url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=AIzaSyBVJvYl1JBNq6hlMUaegUJaDLeEM4kwzag";

    var http_request = new XMLHttpRequest();
    try{
        // Opera 8.0+, Firefox, Chrome, Safari
        http_request = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            http_request = new ActiveXObject("Msxml2.XMLHTTP");

        }catch (e) {

            try{
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }

    http_request.onreadystatechange = function(){

        if (http_request.readyState == 4  ){
            // Javascript function JSON.parse to parse JSON data
            var jsonObj = JSON.parse(http_request.responseText);

            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
            //document.getElementById("Name").innerHTML = jsonObj.name;
           // document.getElementById("Country").innerHTML = jsonObj.country;
			var categoryId = jsonObj.items[0].snippet.categoryId;
            console.log("CategoryID: " + categoryId);
            console.log("Category name: " + URLManager.getCategoryName(categoryId));

            displayInfobox('Ratuj mnie! :(', 'Tracę punkty życia, ponieważ film na YouTube który oglądasz znajduje się w kategorii ' + URLManager.getCategoryName(categoryId) + ', która jest głupia.')

            if(URLManager.isCategoryStupid(categoryId)) {
                hit();
                console.log("Hit because category " + categoryId + " is stupid");
            }
			else {
                heal();
                console.log("Heal because category " + categoryId + " is smart	");
            }
        }
    }

    http_request.open("GET", url, true);
    http_request.send();
}

function decreaseHP(){
	var hp = data.hp;
	var newHP = hp - 10;
	if(newHP >= 0) {
		data.hp = newHP;
	} else{
		onMonsterDeath();
	}
	refreshView();
}

function increaseHP(){
	var hp = data.hp;
	var newHP = hp + 10;
	if(newHP <= 100) {
		data.hp = newHP;
	} else {
		// What if HP is full?
	}
	refreshView();
}

function onMonsterDeath(){
    if (data.hp <= 0) {
        //showDeathMessage();
        window.clearInterval(intervalID);
    } else {

    }
}

function hit(){
	// showBorder(200, 0.9, "255", "0", "0");
	$('#browsergotchi-monster').addClass('monster-hit');
	if (monsterShown) {
        $('#browsergotchi').addClass('updating');
	}
	decreaseHP();
}

function heal(){
	// showBorder(200, 0.9, "0", "255", "0");
    $('#browsergotchi-monster').addClass('monster-heal');
    if (monsterShown) {
        $('#browsergotchi').addClass('updating');
    }
    increaseHP();
}

function onUnknownUrl() {
    var answer = confirm("Czy ta strona jest mądra? Nie oszukuj!")
    if (answer){
    	// This is smart website
        data.smartUrls.push(URLManager.getCurrentWebsiteName());
    }
    else{
        // This is stupid website
        data.stupidUrls.push(URLManager.getCurrentWebsiteName());
    }
    console.log(data.stupidUrls);
    console.log(data.smartUrls);
}

function getFrogImageBasedOnHP(hp) {
    if (hp <= 0)
        return 'killed.svg';
    if (hp < 40)
        return 'sad30.svg';
    if (hp < 60)
        return 'normal.svg';
    if (hp < 84)
        return 'fairlyHappy.svg';

    return 'happy.svg';
}

var monsterShown = false,
	animating = false;

function injectMonsterWindow(){
	$("body").append('<div id="browsergotchi"></div>');	
	$("#browsergotchi").draggable();
	$("#browsergotchi").draggable('disable');
	$("#browsergotchi").append('<div id="browsergotchi-hp">HP:</div>');
	var svg = $('<img />');

	var hpbar = $('<div />');
	$(hpbar).attr('id', 'browsergotchi-hpbar');
	$(hpbar).append('<div id="browsergotchi-hpbar-grad"></div>');
	$(hpbar).appendTo('#browsergotchi');

	$(svg).attr('src', chrome.extension.getURL('assets/normal.svg'));
	$(svg).attr('id',  	'browsergotchi-monster');
	$(svg).on('animationend', function (e) {
		e.stopPropagation();
		$(this).removeClass('monster-hit monster-heal');
    });
	svg.appendTo('#browsergotchi');

	$('#browsergotchi').on('click', function () {
        animating = true;
		if (monsterShown) {
            $('#browsergotchi').addClass('browsergotchi-hiding');
		} else {
            $('#browsergotchi').addClass('browsergotchi-showing');
		}
	});
    $('#browsergotchi').on('animationend', function () {
        $(this).removeClass('updating');
        if (monsterShown) {
            $(this).removeClass('browsergotchi-hiding browsergotchi-shown').addClass('browsergotchi-hidden');
            monsterShown = false;
            $("#browsergotchi").draggable('disable');
        } else {
            $(this).removeClass('browsergotchi-showing browsergotchi-hidden').addClass('browsergotchi-shown');
            monsterShown = true;
            $("#browsergotchi").draggable('enable');
        }
    });

	// TODO: Remember last position of the window.
}

function updateHPBar() {
	$('#browsergotchi-hpbar-grad').css({
		width: data.hp + '%'
	});
}

function onBlur() {
	saveData();
	pauseTick();
	$("#browsergotchi").hide();
};

function onFocus(){
	initStorage();
	startTick();
	$("#browsergotchi").show();
};

$(window).bind('beforeunload', function(){
    saveData();
});

var data;
var TIME_BETWEEN_HIT = 2; // in seconds
var intervalID;
initStorage();
startTick()
window.onfocus = onFocus;
window.onblur = onBlur;

injectMonsterWindow();