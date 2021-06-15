// GLOBAL
const KGames = {}

// WINDOW LOAD
window.onload = function(){
    
    //GAME CONFIG
    const config = {
        type: Phaser.CANVAS,
        seed: [ (Date.now() * Math.random()).toString() ],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth * window.devicePixelRatio,
            height: window.innerHeight * window.devicePixelRatio,
        },
        physics: {
            default: 'arcade',
        },
        backgroundColor: 0xFFFFFF,
        autoRound:true,
        transparent:true,
        disableContextMenu: true,
    }

    //NEW GAME WINDOW
    const game = new Phaser.Game(config);

    //PHASER VERSION DETAILS
    Global.Log("VERSION :[ "+Phaser.VERSION+" ]");

    //ADD SCENES TO GAME
    game.scene.add('boot', KGames.Boot);
    game.scene.add('preloader', KGames.Preloader);
    game.scene.add('balloongame', KGames.BalloonGame);
    game.scene.add('summary', KGames.Summary);

    //GAME URL
    Global.GameUrl = "/json/balloon_telugu.json";
    
    //INIT BOOT SCENE
    game.scene.start('boot');
}