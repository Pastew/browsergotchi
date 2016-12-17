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
	localStorage.setItem('data', JSON.stringify(data));
	refreshView();
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
	data = JSON.parse(localStorage.getItem('data'));
	if(!data){
		console.log("This is first run of this app. Will initialize fields");	
		data = new Object();
		data.hp = 150;
		data.tmp = "blublu";
		saveData();
	}
	else{
		refreshView();
	}
}

function decreaseHP(){
	var hp = data.hp;
	var newHP = hp - 10;
	if(newHP > 0) {
		data.hp = newHP;
		saveData(data);
	} else{
		onMonsterDeath();
	}
}

function onMonsterDeath(){
	//window.clearInterval(intervalID)
}

function hit(){
	showRedBorder(200, 0.9);	
	decreaseHP();
}

function showMonsterWindow(){
	$("body").append('<div id="browsergotchi"></div>');	
	$("#browsergotchi").draggable();
	$("#browsergotchi").append('<div id="browsergotchi-hp"></div>');
	// TODO: Remember last position of the window. Maybe store x and y in storage.sync?
}

var data;
localStorage.clear();
initStorage();
var TIME_BETWEEN_HIT = 2; // in seconds
var intervalID = window.setInterval(hit, TIME_BETWEEN_HIT*1000);

$(window).bind('beforeunload', function(){
  alert('aaa');
});

showMonsterWindow();
