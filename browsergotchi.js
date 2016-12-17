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
	document.body.innerHTML += '<div style="position:fixed;top:0; right:0;width:150px;height:150px;opacity:0.8;z-index:100;background:#000;">wwwwwww</div>';
}
showRedBorder(200, 0.5);
showMonsterWindow();
