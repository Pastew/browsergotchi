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

function saveData(data){
	chrome.storage.sync.set({ "data": data }, function(){});
	console.log("Saving data: " + data);
	console.log(data);
}

function initStorage(){
	var data = new Object();
	data.hp = 150;
	data.tmp = "blublu";
	saveData(data);
}

function decreaseHP(){
	//chrome.storage.sync.clear();
	chrome.storage.sync.get("data", function(item){
		
		if(!item.data){
			console.log("This is first run of this app");
			initStorage();
			decreaseHP();
			return;
		}
		
		//else...
		var hp = item.data.hp;
		var newHP = hp - 10;
		item.data.hp = newHP;
		saveData(item.data);
	});
	
}

function hit(){
	showRedBorder(200, 0.9);
	
	decreaseHP();
}

function showMonsterWindow(){
	document.body.innerHTML += '<div id="browsergotchi"></div>';
	$("#browsergotchi").draggable();
	// TODO: Remember last position. Maybe store x and y in cookie?
}

var TIME_BETWEEN_HIT = 2; // in seconds
var intervalID = window.setInterval(hit, TIME_BETWEEN_HIT*1000);
showMonsterWindow();
