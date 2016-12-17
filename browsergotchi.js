function showRedBorder(duration, maxAlpha){
    var div = $('#browsergotchi');
	//var div = $('body'); // You can show red bg color on body instead
    $({alpha:0}).animate({alpha:maxAlpha}, {
        duration: duration,
        step: function(){
            div.css('backgroundColor','rgba(255,0,0,'+this.alpha+')');
        }
    });
	
	setTimeout(function(){
		$({alpha:maxAlpha}).animate({alpha:0}, {
			duration: duration*3,
			step: function(){
				div.css('backgroundColor','rgba(255,0,0,'+this.alpha+')');
			}
		});
	}, duration);
}

function executeShowRedBorder(){
	showRedBorder(200, 0.5);
}

function showMonsterWindow(){
	document.body.innerHTML += '<div id="browsergotchi"></div>';
}

var TIME_BETWEEN_HIT = 2; // in seconds
var intervalID = window.setInterval(executeShowRedBorder, TIME_BETWEEN_HIT*1000);
showMonsterWindow();
