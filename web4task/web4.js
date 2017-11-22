window.onload = function() {
    var container = document.getElementById('container')
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var buttons = document.getElementById('nav').getElementsByTagName('a');
    var animated = false;
    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        var time = 300;
        var interval =10;
        var speed = offset/(time/interval);
        var timer;
        function go() {
            animated = true;
            if(parseInt(list.style.left) != newLeft){
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go,interval);
            }
            else {
                animated = false;
                list.style.left = newLeft + 'px';
                if(newLeft > -900) {
                    list.style.left = -4500 + 'px';
                }
                if(newLeft < -4500) {
                    list.style.left = -900 + 'px';
                }
            }
        }
        go();
    }
    function play() {
        timer = setInterval(function (){
            next.onclick();
        },2000)
    }
    function stop() {
        clearInterval(timer);
    }
    var index = 1;
    function showButton(){
        for(var i=0; i<buttons.length; i++){
            if(buttons[i].className=='on'){
            buttons[i].className = '';
            break;
            }
        }
        buttons[index-1].className = 'on'
    }
    prev.onclick = function() {  
         
        if(animated == false) {  
            index -= 1;
            if(index==0){
                index=5;
            }
            showButton();    
            animate(900);
        }
    }
    next.onclick = function() {  
        
        if(animated == false) {
            index += 1;
            if(index==6){
                index = 1;
            }
            showButton();
            animate(-900);
        }
    }
    for(var i=0; i<buttons.length; i++){
        buttons[i].onclick = function(){
            if(this.className == 'on'){
                return;
            }
            var myIndex = parseInt(this.getAttribute("index"));
            var offset = -900*(myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();
        }
    }
    container.onmouseover = function(){
            stop();
    }
    container.onmouseout =play;
    play();
}