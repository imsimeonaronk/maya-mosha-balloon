KGames.Boot = function(){};

//Prototype
KGames.Boot.prototype = {

    //DECLARE VARIABLE
    declarevariable: function(){
        this.progress_val = 0;
    },

    //PRELOAD FILES
    preloadfiles: function(){
        //LOAD GAME JSON
        this.load.json('gamejson', Global.GameUrl);
        //LOAD PRELOAD ANIM
        if(typeof(APPCONFIG) != "undefined"){
            if(APPCONFIG.PRELOAD){
                this.load.atlas((APPCONFIG.ID+"-"+APPCONFIG.PRELOAD.ID), APPCONFIG.PRELOAD.PATH, APPCONFIG.PRELOAD.JSON);
            }
        }
    },

    //CREATE UI
    createui: function(){
        let width = this.game.config.width;
        let height = this.game.config.height;
        let pw = Math.floor(width * 0.3);
        let ph = Math.floor(height * 0.01);

        let dummyrect = this.add.rectangle(0,0,652,742);
        dummyrect.setScale((1 / dummyrect.width) * this.game.config.width * 0.20)
        dummyrect.visible = false;
        dummyrect.x = this.game.config.width * 0.5;
        dummyrect.y = this.game.config.height * 0.5;

        this.progressbar_shp = this.add.graphics(0, 0);
        this.progressbar_shp.fillStyle(0x000000, 1);
        this.progressbar_shp.fillRoundedRect(0, 0, pw, ph, Math.floor(ph*0.5));
        this.progressbar_shp.x = width * 0.5 - pw * 0.5;
        this.progressbar_shp.y = dummyrect.y + dummyrect.displayHeight * 0.5;
        this.progressbar_shp.scaleX = 0.01;
    },

    //PRE-LOAD LISTENER
    preloadlistener: function(){
        let thisclass = this;
        
        this.load.on('progress', function (value) {
            thisclass.progress_val = Math.floor(value * 100);
            Global.Log("PRELOAD: PROGRESS - "+thisclass.progress_val);
            thisclass.progressbar_shp.scaleX = (thisclass.progress_val/100);
        });
                    
        this.load.on('fileprogress', function (file) {
            Global.Log("PRELOAD: FILE - "+(file.src));
        });

        this.load.on('complete', function () {
            Global.Log('PRELOAD: COMPLETE');
            if(thisclass.progress_val >= 100){
                thisclass.load.off('progress');;
                thisclass.load.off('fileprogress');
                thisclass.load.off('complete');
                thisclass.movetoscene();
            }
        });
        
    },

    //MOVE TO SCENE
    movetoscene: function(){
        this.scene.start('preloader');
    },

    //Preload function
    preload: function(){
        this.createui();
        this.preloadlistener();
        this.preloadfiles();
    },

    //init function
    init: function(){
        this.declarevariable();
    },

    //create function
    create: function(){
        Global.GameJson = this.cache.json.get('gamejson');
    },

    //update function
    update: function(){

    },

}