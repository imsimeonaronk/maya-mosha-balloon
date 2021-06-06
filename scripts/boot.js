// GLOBAL
const KGames = {}

// WINDOW LOAD
window.onload = function(){
    
    //GAME CONFIG
    const config = {
        type: Phaser.AUTO,
        seed: [ (Date.now() * Math.random()).toString() ],
        scale: {
            zoom: 1,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth * window.devicePixelRatio,
            height: window.innerHeight * window.devicePixelRatio,
        },
        physics: {
            default: 'arcade',
        },
        autoRound: true,
        transparent:true,
        disableContextMenu: true,
        gamejson: null
    }

    //NEW GAME WINDOW
    const game = new Phaser.Game(config);

    //PHASER VERSION DETAILS
    Global.Log("VERSION :[ "+Phaser.VERSION+" ]");

    //ADD SCENES TO GAME
    game.scene.add('preloader', KGames.Preloader);
    //game.scene.add('gridgame', KGames.GridGame);
    game.scene.add('summary', KGames.Summary);

    //GAME URL(FETCH DATA)
    let gameurl = "/json/caterpillar.json";
    fetch(gameurl).then(
        function(data){
            data.json().then(
                function (json) { 
                    this.gamejson = json;
                    game.scene.start('preloader');
                }
            )
        }
    );
    
}