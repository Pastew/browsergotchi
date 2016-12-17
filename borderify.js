document.body.style.border = "5px solid red";

DURATION = 400
    var div = $('body');
    $({alpha:0}).animate({alpha:1}, {
        duration: DURATION,
        step: function(){
            div.css('border-color','rgba(255,0,0,'+this.alpha+')');
        }
    });
	
setTimeout(function(){
    $({alpha:1}).animate({alpha:0}, {
        duration: DURATION*3,
        step: function(){
            div.css('border-color','rgba(255,0,0,'+this.alpha+')');
        }
    });
}, DURATION*4);

