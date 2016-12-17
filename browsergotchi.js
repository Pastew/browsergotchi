function showRedBorder(duration, maxAlpha){
    var div = $('#browsergotchi');
	//var div = $('body'); // You can show red bg color on body instead
    $({alpha:0}).animate({alpha:maxAlpha}, {
        duration: duration,
        step: function(){
            div.css('border-color','rgba(255,0,0,'+this.alpha+')');
        }
    });
	
	setTimeout(function(){
		$({alpha:maxAlpha}).animate({alpha:0}, {
			duration: duration*3,
			step: function(){
				div.css('border-color','rgba(255,0,0,'+this.alpha+')');
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
			data.hp = 150;
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

function onMonsterDeath(){
	data.hp = 150;
	//window.clearInterval(intervalID)
}

function hit(){
	showRedBorder(200, 0.9);	
	decreaseHP();
}

function injectMonsterWindow(){
	$("body").append('<div id="browsergotchi"></div>');	
	$("#browsergotchi").draggable();
	$("#browsergotchi").append('<div id="browsergotchi-hp">HP:</div>');
	// TODO: Remember last position of the window.
}

injectMonsterWindow();

var data;
initStorage();
var TIME_BETWEEN_HIT = 2; // in seconds
var intervalID = window.setInterval(hit, TIME_BETWEEN_HIT*1000);

$(window).bind('beforeunload', function(){
  saveData();
});