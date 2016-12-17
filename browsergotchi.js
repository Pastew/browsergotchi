document.body.style.backgroundColor = "rgba(255,0,0,0.1)";

function showRedBorder(duration, maxAlpha){

    var div = $('body');
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

function showMonsterWindow(){
	document.body.innerHTML += '<div id="browsergotchi"></div>';
}

showRedBorder(400, 0.5);
showMonsterWindow();
