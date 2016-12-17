var URLManager = (function () {
	var stupidUrls = ["joemonster", "wykop", "demotywatory"];
	
	var isStupidUrl = function (url) {
		
		console.log("Checking if " + url + " is stupid.");
		for (var i = 0; i < stupidUrls.length; i++) {
			if(url.includes(stupidUrls[i])){
				console.log("Yes, it is stupid.");
				return true;
			}
		}
		console.log("No, it's fine.");
		return false;
	}
	
	return {
		isStupidUrl: isStupidUrl
	}
})();

function showBorder(duration, maxAlpha, r, g, b){
    var div = $('#browsergotchi');
	//var div = $('body'); // You can show red bg color on body instead
    $({alpha:0}).animate({alpha:maxAlpha}, {
        duration: duration,
        step: function(){
            div.css('border-color','rgba('+r+','+g+','+b+','+this.alpha+')');
        }
    });
	
	setTimeout(function(){
		$({alpha:maxAlpha}).animate({alpha:0}, {
			duration: duration*3,
			step: function(){
				div.css('border-color','rgba('+r+','+g+','+b+','+this.alpha+')');
			}
		});
	}, duration);
}

function saveData(){
	console.log("Calling storage.sync.set");
	chrome.storage.sync.set({"data": data}, function () {
		refreshView();
	});	
}

/*
This function is executed by saveData.
If you want to update something in view window do it here.
*/
function refreshView(){
	console.log(data.hp);
	console.log("RefreshView");
	$("#browsergotchi-hp").text("HP: " + data.hp);	
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
			saveData();
		}
		else{
			data = item.data;
			refreshView();
		}
	});
}

function onError(){
	console.log("Failed to load data")
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
	console.log("TICK");
	if(URLManager.isStupidUrl(window.location.href))
		hit();
	else
		heal();
}

function decreaseHP(){
	var hp = data.hp;
	var newHP = hp - 10;
	if(newHP > 0) {
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
	data.hp = 100;
	//window.clearInterval(intervalID)
}

function hit(){
	console.log("HIT");
	showBorder(200, 0.9, "255", "0", "0");	
	decreaseHP();
}

function heal(){
	console.log("Heal");
	showBorder(200, 0.9, "0", "255", "0");
	increaseHP();
}

function injectMonsterWindow(){
	$("body").append('<div id="browsergotchi"></div>');	
	$("#browsergotchi").draggable();
	$("#browsergotchi").append('<div id="browsergotchi-hp">HP:</div>');
	// TODO: Niemcu - pewnie tutaj bedziesz musial jakos wsadzic te obrazki
	// TODO: Remember last position of the window.
}

function onBlur() {
	console.log("Blur");
	saveData();
	pauseTick();
	$("#browsergotchi").hide();
};

function onFocus(){
	console.log("Focus");
	initStorage();
	startTick();
	$("#browsergotchi").show();
};

var data;
var TIME_BETWEEN_HIT = 2; // in seconds
var intervalID;
initStorage();
startTick()
window.onfocus = onFocus;
window.onblur = onBlur;

injectMonsterWindow();