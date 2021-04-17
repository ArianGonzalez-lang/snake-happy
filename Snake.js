$(document).ready(function() {
    var Snake, dir, table, Apple, speed;
    var nb = 20, score = 0;
    
    function _init() {
        score = 0; 
        speed = 100; 
        Snake = [{x:3,y:1},{x:3,y:1},{x:2,y:1},{x:1,y:1}]; 
        
        dir = [1,0];
        
        table = $('<table align="center">');
        for(i=0;i<nb;i++){
            var tr = $('<tr>');
            for(j=0;j<nb;j++){
                $(tr).append($('<td data-grid-x="'+j+'" data-grid-y="'+(nb-i)+'">'));
            }
            $(table).append(tr);
        }
        $('.body').html(table);
        $('td').height($('td').width())
            .width($('td').width())
        .css({
            maxHeight: $('td').width(),
            maxWidth: $('td').width()
        });
        
        putApple();
    }
    
    function putApple() {
        var bool = true;
        while(bool) {
            var a = Math.floor(Math.random()*nb)+1;
            var b = Math.floor(Math.random()*nb)+1;
            if($('table tr:nth-child('+b+') td:nth-child('+a+')').attr('class') != 'snake') {
                Apple = [a,b];
                $('table tr:nth-child('+Apple[1]+') td:nth-child('+Apple[0]+')')
                    .addClass('apple');
                bool = false;
            }
        }
    }
    
    function draw() {
        Snake[0].x += dir[0];
        Snake[0].y += dir[1];
        $('table tr:nth-child('+Snake[0].y+') td:nth-child('+Snake[0].x+')').removeClass('snake');
        var a = parseInt(Snake.length)-1;
        var x,y;
        for(i=a;i>0;i--) {
            var b = i-1;
            x = Snake[i].x;
            y = Snake[i].y;
            
            $('table tr:nth-child('+y+') td:nth-child('+x+')').removeClass('snake');
            Snake[i].x = Snake[b].x;
            Snake[i].y = Snake[b].y;
        }
        
        for(var i in Snake) {
            if(Snake[i].x>nb) {
               Snake[i].x = 1;
            }
            if(Snake[i].x<1) {
               Snake[i].x = nb;
            }
            if(Snake[i].y>nb) {
               Snake[i].y = 1;
            }
            if(Snake[i].y<1) {
               Snake[i].y = nb;
            }
            
            $('table tr:nth-child('+Snake[i].y+') td:nth-child('+Snake[i].x+')').addClass('snake');
        }
        
    }
    
    function eat() {
        var l = Snake.length-1;

        if(Snake[1].x==Apple[0] && Snake[1].y==Apple[1]) {
            var a = Snake[l].x;
            var b = Snake[l].y;
            $('.apple').removeClass('apple');
            Snake.push({x:a,y:b});
            speed -= Math.floor((1/4)*speed);
            score++;
            $('h1 span').text(score);
            putApple();
            
        }
    }
    
   
    function verify() {
        var l = Snake.length-1;
        
        for(i=1;i<l;i++) {
            
            for(j=1;j<l;j++) {
                 
                if(i!=j) {
                    if(Snake[i].x==Snake[j].x && Snake[i].y==Snake[j].y) {
                        return 'lose';
                    }
                }
            }
        }
        
    }
    
   
    function play() {

        if(verify()!='lose') {
            draw();
            eat();
        } else {
            $('#over').fadeIn(0);
            $('h1,h2').fadeIn(600);

            clearInterval(game);
        }
    }
    
    function move(e) {
        var btn = '';
        
        if($(this).attr('class')===undefined) {
            var key = e.keyCode;

            switch(key) {
                case 38:
                    btn = 'up';
                    break;
                case 37:
                    btn = 'left';
                    break;
                case 40:
                    btn = 'down';
                    break;
                case 39:
                    btn = 'right';
                    break;
            }
            
        } else {
            btn = $(this).attr('class');
       }
        switch(btn) {
            case 'left':
                if(dir!='1,0') {
                    dir = [-1,0];
                }
                break;
            case 'right':
                if(dir!='-1,0') {
                    dir = [1,0];
                }
                break;
            case 'up':
                if(dir!='0,1') {
                    dir = [0,-1];
                }
                break;
            case 'down':
                if(dir!='0,-1') {
                    dir = [0,1];
                }
                break;
        }
    }
    
    $('#over').click(function() {
        $('#over, h1, h2').fadeOut(0);
        _init();
        draw();
        game;
    });
    
    function restart() {
        $('#over2, h3').fadeOut(0);
        game();
    }
    
    $('h3, #over2').click(restart);
    
     _init();
    draw();
    var game = function() {setInterval(play,speed);};
  
    $('button').click(move);
    $(document).keyup(move);
            
});
