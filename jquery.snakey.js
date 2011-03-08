/**
 * Anton Liulichev 
 * JQuery Snakey plug-in
 */
(function($){

    /**
     * Directions
     */
    var UP = 0;
    var DOWN = 1;
    var RIGHT = 2;
    var LEFT = 3;
    var cssDefined = false;
    
    // Direction holder. Default RIGHT
    var DIRECTION = RIGHT;
    
    var rudiments = [];
    var timeout = 100;
    var self = null;
    
    /**
     * Default settings
     */
    var defaults = {
        dimensions: {
            vertical: 20,
            horizontal: 20
        },
        style: {
            headColor: "#1BE06D",
            tailColor: "#1BE03F",
            backgroundColor: "#000000",
            targetColor: "#FC000D",
            borderColor: "#000000"
        },
        onGameOver: function(){
            alert("You lost!");
        },
        pointSize: 15,
    
    };
    
    $.fn.snakey = function(method){
        self = this;
        
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }
            else {
                $.error("Hey. Snakey can't do " + method);
            }
        }
    };
    
    var initCss = function(){
        var css = ".grid {display: table; border-color:" + defaults.style.borderColor + "; border-style: solid;}" +
        ".row {	display: table-row;}" +
        ".cell {display: table-cell; width: " +
        defaults.pointSize +
        "px; height: " +
        defaults.pointSize +
        "px;}" +
        ".rudiment {background-color: " +
        defaults.style.tailColor +
        ";}" +
        ".first { background-color: " +
        defaults.style.headColor +
        ";}" +
        ".target {background-color: "+ defaults.style.targetColor +";}";
        $("<style type='text/css'>" + css + "</style>").appendTo("head");
    };
    var methods = {
        init: function(options){
            //Clear everything
            
            if (options) {
                $.extend(defaults, options);
            }
            
            if (!cssDefined) {
                initCss();
                cssDefined = true;
            }
            
            $(self).html('');
            //Build the grid
            
            var grid = $('<div>').addClass("grid").appendTo($(self));
            for (var i = 0; i < defaults.dimensions.vertical; i++) {
                var row = $('<div>').addClass('row');
                for (var j = 0; j < defaults.dimensions.horizontal; j++) {
                    var cell = $('<div>').addClass('cell');
                    cell.appendTo(row);
                }
                row.appendTo(grid);
            }
            
            $('.cell').first().addClass('first');
            
            newTarget();
            
        },
        start: function(){
            run();
        },
        stop: function(){
        },
    };
    
    
    var run = function(){
        try {
            move();
        } 
        catch (err) {
            defaults.onGameOver();
            methods.init();
            return;
        }
        
        setTimeout(function(){
            run();
        }, timeout);
    };
    
    var move = function(){
        var first = $('.first');
        var next = nextCell();
        if (!next.hasClass("cell")) 
            throw "Game Over";
        
        if (next.hasClass("rudiment")) 
            throw "Game Over";
        
        next.addClass('first');
        first.removeClass('first');
        
        $(".rudiment").removeClass("rudiment");
        if (rudiments.length == 1) {
            rudiments[0] = first;
        }
        
        if (rudiments.length > 1) {
            rudiments.unshift(first);
            rudiments.pop();
        }
        
        for (var index in rudiments) {
            rudiments[index].addClass("rudiment");
        }
        
        if (!next.hasClass("target")) 
            return;
        rudiments.push(first);
        newTarget();
    };
    
    
    var nextCell = function(){
        if (DIRECTION == RIGHT) 
            return $('.first').last().next();
        
        if (DIRECTION == LEFT) 
            return $('.first').first().prev();
        
        var row = $('.first').last().parent();
        var index = row.find(".cell").index($('.first').last());
        var nextRow;
        if (DIRECTION == DOWN) 
            nextRow = row.next();
        
        if (DIRECTION == UP) 
            nextRow = row.prev();
        
        return $(nextRow.find(".cell").get(index));
    };
    
    var newTarget = function(){
        $('.target').removeClass('target');
        while (true) {
            var target = generateTarget();
            if (!target.hasClass("rudiment")) {
                target.addClass("target");
                
                return;
            }
            
        }
        
    };
    
    var generateTarget = function(){
        var random = Math.floor(Math.random() * ((defaults.dimensions.horizontal * defaults.dimensions.vertical) + 1));
        return $($(".grid > div.row > div.cell").get(random));
    };
    
    
    $(window).keydown(function(event){
        //Down
		if (event.keyCode == 40) {
            if ($(".rudiment").size() == 0) {
                DIRECTION = DOWN;
                return false;
            }
            if (DIRECTION == UP) 
                return false;
            
            DIRECTION = DOWN;
            return false;
        }
        if (event.keyCode == 38) {
            if ($(".rudiment").size() == 0) {
                DIRECTION = UP;
                return false;
            }
            if (DIRECTION == DOWN) 
                return false;
            DIRECTION = UP;
            return false;
        }
        if (event.keyCode == 37) {
            if ($(".rudiment").size() == 0) {
                DIRECTION = LEFT;
                return false;
            }
            if (DIRECTION == RIGHT) 
                return false;
            DIRECTION = LEFT;
            return false;
        }
        if (event.keyCode == 39) {
            if ($(".rudiment").size() == 0) {
                DIRECTION = RIGHT;
                return false;
            }
            if (DIRECTION == LEFT) 
                return false;
            DIRECTION = RIGHT;
            return false;
        }
        
    });
    
})(jQuery);
