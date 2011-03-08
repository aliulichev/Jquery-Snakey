Demos:

http://kalashnikova.com.ua/snakey/404.html
http://kalashnikova.com.ua/snakey/SimpleExample.html

How to use:

Simple usage (Default settings):

 $("#snakey").snakey('start'); - Creates and start the game.

Options:

 $("#snakey").snakey({
                    dimensions: {
                        vertical: 30,
                        horizontal: 30
                    },
                    pointSize: 12,
                    style: {
                        headColor: "#8080c0;",
                        tailColor: "#8000ff",
                        targetColor: "#ffffff"
                    },
                    onGameOver: function(){
                        alert("Game Over!");
                    }
                });
                $("#snakey").snakey('start');