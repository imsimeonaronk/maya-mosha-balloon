KGames.Preloader = function(){};

//Prototype
KGames.Preloader.prototype = {

    //DECLARE VARIABLE
    declarevariable: function(){
        this.applang = null;
        this.preloadtotal = 2;
        this.progress_val = 0;
        this.progresspercent_val = 0;
    },

    //COMMON CONFIG
    preloadcommon: function(){
        if(typeof(APPCONFIG) != "undefined"){
            //MENU BTN
            if(APPCONFIG.MENU && APPCONFIG.MENU.BTN){
                this.load.atlas((APPCONFIG.ID+"-"+APPCONFIG.MENU.BTN.ID), APPCONFIG.MENU.BTN.PATH, APPCONFIG.MENU.BTN.JSON);
            }
            //SPARKLE ANIM
            if(APPCONFIG.SPARKLE){
                this.load.atlas((APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID), APPCONFIG.SPARKLE.PATH, APPCONFIG.SPARKLE.JSON);
            }
            //CELEBRATION ANIM
            if(APPCONFIG.CELEBRATION){
                if(APPCONFIG.CELEBRATION.ANIMATION){
                    this.load.atlas((APPCONFIG.ID+"-"+APPCONFIG.CELEBRATION.ANIMATION.ID), APPCONFIG.CELEBRATION.ANIMATION.PATH, APPCONFIG.CELEBRATION.ANIMATION.JSON);
                }
                //PRELOAD SOUNDS
                if(APPCONFIG.CELEBRATION.SOUNDS){
                    for (const key in APPCONFIG.CELEBRATION.SOUNDS) {
                        this.load.audio(APPCONFIG.ID+"-"+APPCONFIG.CELEBRATION.SOUNDS[key].ID, APPCONFIG.CELEBRATION.SOUNDS[key].PATH);
                    }
                }
            }
            //PRELOAD GTIMER
            if(APPCONFIG.GTIMER && APPCONFIG.GTIMER.FONT){
                this.load.bitmapFont(APPCONFIG.ID+"-"+APPCONFIG.GTIMER.FONT.ID, APPCONFIG.GTIMER.FONT.PATH, APPCONFIG.GTIMER.FONT.XML);
            }
            //SUMMARY
            if(APPCONFIG.SUMMARY){
                //PRELOAD ASSETS
                this.load.atlas((APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), APPCONFIG.SUMMARY.PATH, APPCONFIG.SUMMARY.JSON);
                //PRELOAD SOUNDS
                if(APPCONFIG.SUMMARY.SOUNDS){
                    for (const key in APPCONFIG.SUMMARY.SOUNDS) {
                        this.load.audio(APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.SOUNDS[key].ID, APPCONFIG.SUMMARY.SOUNDS[key].PATH);
                    }
                }
                //PRELOAD FONT
                if(APPCONFIG.SUMMARY.FONTS){
                    for (const key in APPCONFIG.SUMMARY.FONTS) {
                        this.load.bitmapFont(APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.FONTS[key].ID, APPCONFIG.SUMMARY.FONTS[key].PATH, APPCONFIG.SUMMARY.FONTS[key].XML);
                    }
                }
            }
        }
    },

    //GAME PAGE
    preloadgame: function(){
        let CONFIG = gamejson.CONFIG;
        let DATA = gamejson.DATA;
        if(typeof(CONFIG) != "undefined"){
            //BG
            if(CONFIG.BG){
                this.load.image(CONFIG.ID+"-"+CONFIG.BG.ID,CONFIG.BG.PATH);
            }
            //PREIMG
            if(CONFIG.PREIMG){
                this.load.image(CONFIG.ID+"-"+CONFIG.PREIMG.ID, CONFIG.PREIMG.PATH);
            }
            //MAINIMG
            if(CONFIG.MAINIMG){
                this.load.image(CONFIG.ID+"-"+CONFIG.MAINIMG.ID, CONFIG.MAINIMG.PATH);
            }
            //DROP_AREA
            if(CONFIG.DROP_AREA){
                this.load.image(CONFIG.ID+"-"+CONFIG.DROP_AREA.ID, CONFIG.DROP_AREA.PATH);
            }
            //PRELOAD SOUNDS
            for (const key in CONFIG.SOUNDS) {
                this.load.audio(CONFIG.ID+"-"+CONFIG.SOUNDS[key].ID, CONFIG.SOUNDS[key].PATH);
            }
            //TICKER FONT
            if(CONFIG.TICKER_IMG){
                if(CONFIG.TICKER_IMG.FONT){
                    this.load.bitmapFont(CONFIG.ID+"-"+CONFIG.TICKER_IMG.FONT.ID, CONFIG.TICKER_IMG.FONT.PATH, CONFIG.TICKER_IMG.FONT.XML);
                }
            }
        }
        if(typeof(DATA) != "undefined"){
            //PRELOAD GAME DATA
            for( const key in DATA){
                for( const keyt in DATA[key]){
                    if(keyt == "ENDIMG"){
                        if(DATA[key][keyt].ID && DATA[key][keyt].PATH != null){
                            this.load.image(CONFIG.ID+"-"+DATA[key][keyt].ID, DATA[key][keyt].PATH);
                        }
                        if(DATA[key][keyt].ID && DATA[key][keyt].GIF != null){
                            this.load.atlas((CONFIG.ID+"-"+DATA[key][keyt].GIF.ID), DATA[key][keyt].GIF.PATH, DATA[key][keyt].GIF.JSON);
                        }
                    }else if(keyt == "CNT"){
                        for( const keyc in DATA[key][keyt]){
                            let content = DATA[key][keyt][keyc];
                            if(content.IMG){
                                this.load.image(CONFIG.ID+"-"+content.ID, content.IMG);
                            }
                            if(content.GRID_SND){
                                this.load.audio(CONFIG.ID+"-"+content.ID, content.GRID_SND);
                            }
                            if(content.GRID_GIF){
                                this.load.atlas((CONFIG.ID+"-"+content.GRID_GIF.ID), content.GRID_GIF.PATH, content.GRID_GIF.JSON);
                            }
                            if(content.GRID_TICKER_SND){
                                this.load.audio(CONFIG.ID+"-"+"START_"+content.ID, content.GRID_TICKER_SND);
                            }
                            if(content.GRID_CHALLENGE_SND){
                                this.load.audio(CONFIG.ID+"-"+"CHALLENGE_"+content.ID, content.GRID_CHALLENGE_SND);
                            }
                        }
                    }
                }
            }
        }
    },

    preloadgamejs: function(){
        let CONFIG = gamejson.CONFIG;
        if(typeof(CONFIG) != "undefined"){
            //LOAD LANGUAGE GAME AUDIO & IMAGE
            this.applang = (CONFIG.LANG || "").toLowerCase();
            if(this.applang != null && this.applang != ""){
                this.load.script('TDictJS', "scripts/dictionary/letter_"+(this.applang)+".js");
                this.load.script('TDataJS', 'scripts/data/letter_'+(this.applang)+'.js');
                this.load.script('IDictJS', 'scripts/dictionary/image_'+(this.applang)+'.js');
                this.load.script('IDataJS', 'scripts/data/image_'+(this.applang)+'.js');
            }
        }
    },

    preloadgameassets: function(){
        let thisclass = this;
        let CONFIG = gamejson.CONFIG;
        if(this.applang != null && this.applang != ""){
            if(TDict && IDict){
                for(const key in TDict){
                    if(TDict[key].AUDIO && TDict[key].AUDIO != ""){
                        this.load.audio(CONFIG.ID+"-"+"LETTER-SND"+TDict[key].ID,TDict[key].AUDIO);
                    }
                }
                for(const key in IDict){
                    if(IDict[key].IMAGE && IDict[key].IMAGE != ""){
                        this.load.image(CONFIG.ID+"-"+"IMAGE"+IDict[key].ID,IDict[key].IMAGE);
                    }
                    if(IDict[key].AUDIO && IDict[key].AUDIO != ""){
                        this.load.audio(CONFIG.ID+"-"+"IMAGE-SND"+IDict[key].ID,IDict[key].AUDIO);
                    }
                }
                this.load.start();
            }else{
                thisclass.movetoscene();
            }
        }else{
            thisclass.movetoscene();
        }
    },

    //CREATE UI
    createui: function(){
        let width = this.game.config.width;
        let height = this.game.config.height;

        this.fpsmeter_lbl = this.add.text(120, 120, "00", { font: '60px Arial' });
        this.fpsmeter_lbl.setColor("#ff0000");

        this.progressbar_shp = this.add.rectangle(0, 0, (width * 0.3), (height * 0.05));
        this.progressbar_shp.setOrigin(0,0.5);
        this.progressbar_shp.x = width * 0.5 - this.progressbar_shp.displayWidth * 0.5;
        this.progressbar_shp.y = height * 0.85;
        this.progressbar_shp.setFillStyle(0x000000);
        this.progressbar_shp.scaleX = 0.01;
        
        this.loadinglbl_txt = this.add.text(
            width * 0.5, 
            height * 0.5, 
            "Loading.. 0%", 
            { 
                fontFamily: 'Arial', 
                fontSize: Math.floor(height * 0.05), 
                fill: '#000000', 
                align: 'left', 
            }
        );
        this.loadinglbl_txt.setOrigin(0.5);
    },

    //PRE-LOAD LISTENER
    preloadlistener: function(){
        let thisclass = this;

        this.load.on('progress', function (value) {
            thisclass.progress_val = Math.floor((value * 100) * 0.5) + thisclass.progresspercent_val;
            //Global.Log("PRELOAD: PROGRESS - "+thisclass.progress_val);
            //thisclass.loadinglbl_txt.text = "Loading.. "+thisclass.progress_val+"%";
            thisclass.progressbar_shp.scaleX = (thisclass.progress_val/100);
        });
                    
        this.load.on('fileprogress', function (file) {
            //Global.Log("PRELOAD: FILE - "+(file.src));
        });

        this.load.on('complete', function () {
            //Global.Log('PRELOAD: COMPLETE');
            thisclass.progresspercent_val = 50;
            if(thisclass.progress_val >= 100){
                thisclass.load.off('progress');;
                thisclass.load.off('fileprogress');
                thisclass.load.off('complete');
                thisclass.movetoscene();
            }
        });
    },

    //MOVE TOO GAME SCENE
    movetoscene:function(){
        //this.loadinglbl_txt.text = "Loading.. 100%";
        //this.scene.start('gridgame');
    },

    //Preload function
    preload: function(){
        this.declarevariable();
        this.createui();
        this.preloadgamejs();
        //this.preloadlistener();
        //this.preloadcommon();
        //this.preloadgame();
    },

    //init function
    init: function(){
       
    },

    //create function
    create: function(){
        this.preloadgameassets();
    },

    //update function
    update: function(){
        if(this.fpsmeter_lbl){
            this.fpsmeter_lbl.text = Math.floor(this.game.loop.actualFps);
        }
    },

}