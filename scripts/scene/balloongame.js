KGames.BalloonGame = function(){};

//Prototype
KGames.BalloonGame.prototype = {

    // Functions //

    // Variable Declaration
    declarevariable: function(){

        //Boolean
        this.challengemode_bol = false;
        this.gamereplay_bol = false ;
        this.gameend_bol = false; 
        this.gamestart_bol = false;
        this.challengelast_bol = false;
        this.showceleb_bol = true;
        this.gametimermode_bol = false;
        this.gametimerend_bol = false;

        //Label
        this.fpsmeter_lbl = null;
        this.topscore_lbl = null;

        //Image
        this.bg_img = null;

        //Button
        this.active_btn = null;
        this.close_btn = null;
        this.home_btn = null;
        this.back_btn = null;

        //Value
        this.swidth_val = this.game.config.width; // stage width
        this.sheight_val = this.game.config.height; // stage height
        this.centerx_val = this.swidth_val * 0.5;
        this.centery_val = this.sheight_val * 0.5;
        this.balloonblast_val = 0;
        this.scoreratio_val = 1;
        this.challengeflag_val = 0;
        this.challengerndtot_val = 0;
        this.challengernd_val = 0;
        this.btnanimtime_val = 200;
        this.balotimegap_val = 1;
        this.letrtimegap_val = 1;
        this.ballooncnt_val = 0;
        this.falldirection_val = "bottom";
        this.curletterkey_val = null;
        this.curlettercnt_val = 0;
        this.curletterindex_val = null;
        this.scoreearned_val = 0;
        this.gravitychange_val = [0,0];

        //Sound
        this.right_snd = null;
        this.wrong_snd = null;
        this.intro_snd = null;
        this.bg_snd = null;
        this.cintro_snd = null;
        this.taskcomplete_snd = null;
        this.curletter_snd = null;

        //Animation
        this.sparkle_anim = null;
        this.positive_anim = null;
        this.negative_anim = null;

        //Data
        this.game_data = {level: 1, task: 1, tottask: 0};
        this.balloon_data = null;
        this.ballooncpy_data = null;

        //Score
        this.main_score = 0;
        this.task_score = 0;
        this.point_score = this.CONFIG.SCORE.POINTS;

        //Container
        this.timer_ctr = null;
        this.balloon_ctr = null;

        //Array
        this.correctsnd_arr = null;
        this.incorrectsnd_arr = null;
        this.balloonlist_arr = null;
        this.balloonboundary_arr = {
            left: {xMin: this.swidth_val, xMax: this.swidth_val, yMin: 0, yMax: this.sheight_val },
            right: {xMin: 0, xMax: 0, yMin: 0, yMax: this.sheight_val },
            top: {xMin: 0, xMax: this.swidth_val, yMin: 0, yMax: 0 },
            bottom: {xMin: 0, xMax: this.swidth_val, yMin: this.sheight_val, yMax: this.sheight_val },
        };

        //Timer
        this.balloon_tmr = null;
        this.introsnd_tmr = null;
        this.task_tmr = null;
        this.letter_tmr = null;

        //PRESET VALUES
        if(this.CONFIG.CELEBRATION){
            if(this.CONFIG.CELEBRATION.VISIBLE != null){
                this.showceleb_bol = this.CONFIG.CELEBRATION.VISIBLE
            }
        }

        if(this.CONFIG.CHALLENGE != null){
            if(this.CONFIG.CHALLENGE.FLAG != null){
                this.challengeflag_val = this.CONFIG.CHALLENGE.FLAG;
            }
            if(this.CONFIG.CHALLENGE.ROUNDS != null){
                this.challengerndtot_val = Global.GetLength(this.CONFIG.CHALLENGE.ROUNDS);
            }
        }

        if(APPCONFIG.MENU.BTN){
            if(APPCONFIG.MENU.BTN.ANIM_TIME){
                this.btnanimtime_val = APPCONFIG.MENU.BTN.ANIM_TIME * 1000;
            }
        }

        if(this.CONFIG.BALLONS){
            if(this.CONFIG.BALLONS.BALLOON_INTERVAL != null){
                this.balotimegap_val = this.CONFIG.BALLONS.BALLOON_INTERVAL;
            }
            if(this.CONFIG.BALLONS.LETTER_INTERVAL != null){
                this.letrtimegap_val = this.CONFIG.BALLONS.LETTER_INTERVAL;
            }
            if(this.CONFIG.BALLONS.GRAVITY_CHANGE != null){
                this.gravitychange_val = this.CONFIG.BALLONS.GRAVITY_CHANGE;
            }
        }
        
        //APP LANGUAGE
        this.applang_val = this.CONFIG.LANG || "";
        this.applang_val = this.applang_val.toLowerCase();
    },
      
    //SCALE IMAGE
    scaleimage: function(tpe,obj){
        if(tpe == "bg"){
            if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                obj.setScale((1 / obj.width) * this.swidth_val);
            } else {
                obj.setScale((1 / obj.height) * this.sheight_val);
            }
        }
    },

    //CREATE ANIMATION
    createanim: function(id,name,texture,frate,repeat){
        if(texture && name && id){
            var frameNames = this.anims.generateFrameNames(id, {
                start: 1, end: (texture.frameTotal-1), zeroPad: 4,
                prefix: '', suffix: '.png'
            });
            this.anims.create({
                key: name,
                frames: frameNames,
                frameRate: frate,
                repeat: repeat
            })
        }
    },

    //SHOW SPARKLE
    showsparkle: function(flag,pos){
        if(this.sparkle_anim){
            if(flag){
                this.sparkle_anim.visible = true;
                this.sparkle_anim.play('sparkle');
                this.sparkle_anim.setPosition(pos.x, pos.y);
                this.children.bringToTop(this.sparkle_anim);
            }else{
                this.sparkle_anim.visible = false;
            }
        }
    },

    //SHOW POSITIVE/NEAGTIVE SPLASH
    showgamesplash: function(animty, sflag, pos){
        if(animty == "positive"){
            if(sflag){
                this.positive_anim.play('positive');
                this.positive_anim.setPosition(pos.x, pos.y);
                this.children.bringToTop(this.positive_anim);
            }
            this.positive_anim.visible = sflag;
        }else if(animty == "negative"){
            if(sflag){
                this.negative_anim.play('negative');
                this.negative_anim.setPosition(pos.x, pos.y);
                this.children.bringToTop(this.negative_anim);
            }
            this.negative_anim.visible = sflag;
        }
    },

    //CLEAN
    cleartimer: function(timer){
        if(timer){
            timer.remove();
            this.time.removeEvent(timer);
        }
        return null;
    },

    cleartween: function(tween){
        if(tween){
            tween.stop();
        }
        return null;
    },

    clearobject: function(obj){
        if(obj){
            obj.body.enable = false;
            if(obj.snd && obj.sndkey){
                this.sound.removeByKey(obj.sndkey);
            }
            obj.removeInteractive();
            obj.destroy();
        }
    },

    //STOP TIMER
    stoptimer: function(){
        this.task_tmr = this.cleartimer(this.task_tmr);
        this.letter_tmr = this.cleartimer(this.letter_tmr);
        this.balloon_tmr = this.cleartimer(this.balloon_tmr);
        this.introsnd_tmr = this.cleartimer(this.introsnd_tmr);
    },

    //STOP TWEEN
    stoptween: function(){

    },

    //GAME TIMER
    stopgametimer: function(){
        if(this.challengemode_bol || this.gametimermode_bol){
            GTimer.Stop({flag: this.gameend_bol});
        }
    },

    startgametimer: function(){
        //START TIMER
        if(GTimer != null){
            if(this.gametimermode_bol || this.challengemode_bol){
                GTimer.Start();
            }
        }
    },

    // AUDIO
    addaudio: function(){
        let thisclass = this;
        //CHECK RIGHT SOUND
        if(this.CONFIG.SOUNDS.RIGHT){
            this.right_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.RIGHT.ID);
        }
        //CORRECT & IN CORRECT SOUND
        if (this.correctsnd_arr == null){
            this.correctsnd_arr = [];
            this.incorrectsnd_arr = [];
            for (const key in this.CONFIG.SOUNDS) {
                if(key.search("CORRECT") == 0){
                    this.correctsnd_arr[ this.correctsnd_arr.length ] = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS[key].ID);
                }else if(key.search("INCORRECT") == 0){
                    this.incorrectsnd_arr[ this.incorrectsnd_arr.length ] = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS[key].ID);
                }
            }
        }
        //CHECK WRONG SOUND
        if(this.CONFIG.SOUNDS.WRONG){ 
            this.wrong_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.WRONG.ID);
        }
        //CHECK INTRO SOUND
        if(this.CONFIG.SOUNDS.INTRO){ 
            this.intro_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.INTRO.ID);
            this.intro_snd.on('complete',function(){
                if(this.gamestart_bol){
                    thisclass.triggergame(true);
                }else{
                    if(thisclass.CONFIG.SOUNDS.INTRO && thisclass.CONFIG.SOUNDS.INTRO.FORCE_PLAY){
                        if(thisclass.CONFIG.SOUNDS.INTRO.END_DELAY){
                            thisclass.introsnd_tmr = thisclass.time.addEvent({
                                delay: thisclass.CONFIG.SOUNDS.INTRO.END_DELAY,               
                                callback:()=>{
                                    thisclass.introsnd_tmr = thisclass.cleartimer(thisclass.introsnd_tmr);
                                    thisclass.triggergame(true);
                                },
                                loop: false,
                            });
                        }else{
                            thisclass.triggergame(true);
                        }
                    }
                }
            });
        }
        //CHECK CHALLENGE INTRO SOUND
        if(this.CONFIG.SOUNDS.CHALLENGE_INTRO){ 
            this.cintro_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.CHALLENGE_INTRO.ID);
            this.cintro_snd.on('complete',function(){
                if(this.gamestart_bol){
                    thisclass.triggergame(true);
                }else{
                    if(thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO && thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO.FORCE_PLAY){
                        if(thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO.END_DELAY){
                            thisclass.introsnd_tmr = thisclass.time.addEvent({
                                delay: thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO.END_DELAY,               
                                callback:()=>{
                                    thisclass.introsnd_tmr = thisclass.cleartimer(thisclass.introsnd_tmr);
                                    thisclass.triggergame(true);
                                },
                                loop: false,
                            });
                        }else{
                            thisclass.triggergame(true);
                        }
                    }
                }
            });
        }
        //CHECK BG MUSIC
        if(this.CONFIG.SOUNDS.BGMUSIC){ 
            this.bg_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.BGMUSIC.ID);
        }
        //CHECK TASK COMPLETE SOUND
        if(this.CONFIG.SOUNDS.TASK_COMPLETE){ 
            this.taskcomplete_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.TASK_COMPLETE.ID);
            this.taskcomplete_snd.on('complete',function(){
                if(thisclass.gameend_bol){
                    thisclass.loadnexttask();
                }
            });
            this.taskcomplete_snd.on('stop',function(){
                if(thisclass.gameend_bol){
                    thisclass.loadnexttask();
                }
            });
        }
    },

    playcorrectsnd: function(){
        if(this.correctsnd_arr != null && this.correctsnd_arr.length > 0){
            let rand = Global.GetRandomInt(this.correctsnd_arr.length);
            if(this.correctsnd_arr[rand]){
                this.correctsnd_arr[rand].play();
            }
        }
    },

    stopcorrectsnd: function(){
        if(this.correctsnd_arr && this.correctsnd_arr.length > 0){
            for(let j=0; j<this.correctsnd_arr.length; j++){
                this.correctsnd_arr[j].stop();
            }
        }
    },

    playincorrectsnd: function(){
        if(this.incorrectsnd_arr != null && this.incorrectsnd_arr.length > 0){
            let rand = Global.GetRandomInt(this.incorrectsnd_arr.length);
            if(this.incorrectsnd_arr[rand]){
                this.incorrectsnd_arr[rand].play();
            }
        }
    },

    stopincorrectsnd: function(){
        if(this.incorrectsnd_arr && this.incorrectsnd_arr.length > 0){
            for(let j=0; j<this.incorrectsnd_arr.length; j++){
                this.incorrectsnd_arr[j].stop();
            }
        }
    },

    playrightsnd: function(){
        if(this.right_snd){
            this.right_snd.play();
        }
    },

    stoprightsnd: function(){
        if(this.right_snd){
            this.right_snd.stop();
        }
    },

    playwrongsnd: function(){
        if(this.wrong_snd){
            this.wrong_snd.play();
        }
    },

    stopwrongsnd: function(){
        if(this.wrong_snd){
            this.wrong_snd.stop();
        }
    },

    playintrosnd: function(){
        let flag = true;
        if(this.challengemode_bol){
            if(this.cintro_snd){
                flag = false;
                if(this.CONFIG.SOUNDS.CHALLENGE_INTRO.VOLUME){
                    this.cintro_snd.volume = this.CONFIG.SOUNDS.INTRO.VOLUME;
                }
                this.cintro_snd.play();
            }
        }
        if(flag && this.intro_snd){
            if(this.CONFIG.SOUNDS.INTRO.VOLUME){
                this.intro_snd.volume = this.CONFIG.SOUNDS.INTRO.VOLUME;
            }
            this.intro_snd.play();
        }
    },

    stopintrosnd: function(){
        if(this.intro_snd){
            this.intro_snd.stop();
        }
        if(this.cintro_snd){
            this.cintro_snd.stop();
        }
    },

    playbgsnd: function(){
        if(this.bg_snd){
            if(this.CONFIG.SOUNDS.BGMUSIC.LOOP){
                this.bg_snd.loop = true;
            }
            if(this.CONFIG.SOUNDS.BGMUSIC.VOLUME){
                this.bg_snd.volume = this.CONFIG.SOUNDS.BGMUSIC.VOLUME;
            }
            this.bg_snd.play();
        }
    },

    stopbgsnd: function(){
        if(this.bg_snd){
            this.bg_snd.stop();
        }
    },

    playtaskcompletesnd: function(){
        if(this.taskcomplete_snd){
            this.taskcomplete_snd.play();
        }else{
            this.loadnexttask();
        }
    },

    stoptaskcompletesnd: function(){
        if(this.taskcomplete_snd){
            this.taskcomplete_snd.stop();
        }
    },

    playcurlettersnd: function(){
        if(this.curletter_snd){
            this.curletter_snd.play();
        }
    },

    stopcurlettersnd: function(){
        if(this.curletter_snd){
            this.curletter_snd.stop();
        }
    },

    stopallsnd: function(params){
        if(params && params.stopbg){
            this.stopbgsnd();
        }
        if(params && params.stopright){
            this.stoprightsnd();
        }
        if(params && params.stopceleb){
            this.stopincorrectsnd();
            this.stopcorrectsnd();
        }
        if(params && params.stopintro){
            this.stopintrosnd();
        }
        this.stopwrongsnd();
        this.stopcurlettersnd();
        this.stoptaskcompletesnd();
    },

    // Balloon data generation
    generateballoondata: function(tdata){
        let textarr = []
        let lineval = 1;
        let limit = tdata.TEXT_LIMIT || 2;
        //LINE
        if(tdata.LINE != null){
            lineval = tdata.LINE;
        }
        //TYPE
        let tdatavl = TData["line"+lineval];
        let lcnt = 0;
        if(tdatavl != null){
            for(let j=0; j<limit; j++){
                textarr[ j ] = ["text", tdatavl[lcnt] || "", lcnt];
                lcnt = lcnt + 1;
                if(lcnt >= Global.GetLength(tdatavl)){
                    lcnt = 0;
                }
            }
        }
        return textarr;
    },

    generateballoonpos: function(wd,ht){
        let pos = {X:0, y:0};
            let xg = this.physics.world.gravity.x;
            let yg = this.physics.world.gravity.y;
            let direction = "bottom";
            let boundary = {xMin:0, xMax:0, yMin: 0, yMax:0 }
            if(xg > 0 && yg == 0){
                direction = "right";
                boundary = this.balloonboundary_arr[ direction ]
                pos.x = Global.GetRandomArbitrary(boundary.xMin - wd * 2.0, boundary.xMax - wd * 0.5);
                pos.y = Global.GetRandomArbitrary(boundary.yMin + ht * 0.5, boundary.yMax - ht * 0.5);
            }else if(xg < 0 && yg == 0){
                direction = "left";
                boundary = this.balloonboundary_arr[ direction ]
                pos.x = Global.GetRandomArbitrary(boundary.xMin + wd * 0.5, boundary.xMax + wd * 2.0);
                pos.y = Global.GetRandomArbitrary(boundary.yMin + ht * 0.5, boundary.yMax - ht * 0.5);
            }else if(xg == 0 && yg > 0){
                direction = "top";
                boundary = this.balloonboundary_arr[ direction ]
                pos.x = Global.GetRandomArbitrary(boundary.xMin + wd * 0.5, boundary.xMax - wd * 0.5);
                pos.y = Global.GetRandomArbitrary(boundary.yMin - ht * 2.0, boundary.yMax - ht * 0.5);
            }else if(xg == 0 && yg < 0){
                direction = "bottom";
                boundary = this.balloonboundary_arr[ direction ]
                pos.x = Global.GetRandomArbitrary(boundary.xMin + wd * 0.5, boundary.xMax - wd * 0.5);
                pos.y = Global.GetRandomArbitrary(boundary.yMin + ht * 0.5, boundary.yMax + ht * 2.0);
            }
            this.falldirection_val = direction;
        return pos;
    },

    playrandomletter: function(){
        if(this.ballooncpy_data && this.curlettercnt_val != null){
            let letdetail = Global.GetLetterData(TDict,this.ballooncpy_data[this.curlettercnt_val][1]);
            this.stopcurlettersnd();
            if(this.curletter_snd && this.curletterkey_val){
                this.sound.removeByKey(this.curletterkey_val);
            }
            this.curletterkey_val = this.CONFIG.ID+"-"+"LETTER-SND"+letdetail["ID"];
            this.curletterindex_val = this.ballooncpy_data[this.curlettercnt_val][2];
            this.curletter_snd = this.sound.add(this.curletterkey_val);
            this.playcurlettersnd();
            this.curlettercnt_val++;
            if(this.curlettercnt_val >= Global.GetLength(this.ballooncpy_data)){
                Global.Shuffle(this.ballooncpy_data);
                this.curlettercnt_val = 0;
            }
            //TIMER
            this.letter_tmr = this.cleartimer(this.letter_tmr);
            this.letter_tmr = this.time.addEvent({
                delay: this.letrtimegap_val * 1000,
                callback:() => {
                    this.playintrosnd();
                },
                loop: false,
            })
        }
    },

    triggergame: function(flag){
        this.gamestart_bol = flag;
        if(flag){
            //LETTER SOUND
            this.playrandomletter();
            //CREATE BALLOON
            this.createballoon();
            this.balloon_tmr = this.cleartimer(this.balloon_tmr);
            this.balloon_tmr = this.time.addEvent({
                delay: (this.balotimegap_val * 1000),
                callback: () =>{
                    this.createballoon();
                },
                loop: true
            });
        }
    },

    updatescorevalue: function(){
        if(this.topscore_lbl){
            this.topscore_lbl.text = "SCORE: "+ this.scoreearned_val;
        }
    },

    // UI
    createfpsmeter: function(){
        if(Global.debugfps){
            this.fpsmeter_lbl = this.add.bitmapText(50, 50, APPCONFIG.ID+"-"+APPCONFIG.GTIMER.FONT.ID, "00", 60);
            this.fpsmeter_lbl.setOrigin(0.5);
        }
    },

    createbg: function(){
        this.bg_img = this.add.image(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.BG.ID));
        this.bg_img.setOrigin(0.5);
        this.scaleimage("bg",this.bg_img);
        this.bg_img.setPosition(this.centerx_val, this.centery_val);
    },

    createbtn: function(){
        let thisclass = this;
        if(APPCONFIG.MENU && APPCONFIG.MENU.BTN){
            for (const key in APPCONFIG.MENU.BTN.POS) {
                let POS = APPCONFIG.MENU.BTN.POS[key];
                this[key.toLowerCase()+"_btn"] = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.MENU.BTN.ID), POS.NAME);
                this[key.toLowerCase()+"_btn"].ID = POS.NAME.toUpperCase().replace(".PNG","");
                this[key.toLowerCase()+"_btn"].isdown = false;
                //BTN SCALE
                this[key.toLowerCase()+"_btn"].scl = (1/this[key.toLowerCase()+"_btn"].displayWidth) * this.swidth_val * 0.05;
                this[key.toLowerCase()+"_btn"].setScale(this[key.toLowerCase()+"_btn"].scl);
                this[key.toLowerCase()+"_btn"].setPosition(
                    this.swidth_val * POS.X,
                    this.sheight_val * POS.Y
                );
                this[key.toLowerCase()+"_btn"].ondown = function(){
                    if(this.scaleX != (this.scl * 0.92)){
                        this.tween1 = thisclass.cleartween(this.tween1);
                        this.tween1 = thisclass.tweens.add({
                            targets: this,
                            scaleX: (this.scl * 0.92),
                            scaleY: (this.scl * 0.92),
                            duration: thisclass.btnanimtime_val,
                            ease: 'Linear',
                        });
                    }
                }
                this[key.toLowerCase()+"_btn"].onup = function(){
                    if(this.scaleX != (this.scl * 1.0)){
                        this.tween2 = thisclass.cleartween(this.tween2);
                        this.tween2 = thisclass.tweens.add({
                            targets: this,
                            scaleX: (this.scl * 1.0),
                            scaleY: (this.scl * 1.0),
                            duration: thisclass.btnanimtime_val,
                            ease: 'Linear',
                        });
                    }
                }
                this[key.toLowerCase()+"_btn"].setInteractive();
                this[key.toLowerCase()+"_btn"].on('pointerdown',function(pointer, px, py, event){
                    thisclass.active_btn = this;
                    this.isdown = true;
                    this.ondown();
                });
                this[key.toLowerCase()+"_btn"].on('pointerover',function(pointer, px, py, event){
                    if(thisclass.active_btn == this){
                        this.ondown();
                    }
                });
                this[key.toLowerCase()+"_btn"].on('pointerout',function(pointer, px, py, event){
                    this.onup();
                });
                this[key.toLowerCase()+"_btn"].on('pointerup',function(pointer, px, py, event){
                    this.onup();
                    if(this.isdown){
                        if(thisclass.active_btn != null && thisclass.active_btn == this){
                            Global.Log("BTN: "+(this.ID));
                            if(this.ID == "REPLAY"){
                                thisclass.gamereplay_bol = true;
                                thisclass.replaytask({chareset: true});
                            }
                        }
                    }
                    this.isdown = false;
                });
            }
        }
    },

    createtimebox: function(){
        if(APPCONFIG.MENU && APPCONFIG.MENU.BTN){
            let POS = APPCONFIG.GTIMER.POS;
            this.timer_ctr = this.add.container();
                //IMAGE
                let tframe = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.MENU.BTN.ID), APPCONFIG.GTIMER.NAME);
                tframe.setScale((1/tframe.displayWidth) * this.swidth_val * 0.05);
                this.timer_ctr.add(tframe);
                //LABEL
                let fntsize = Math.floor(0.5 * tframe.displayHeight);
                let txtlbl = this.add.bitmapText(0, 0, APPCONFIG.ID+"-"+APPCONFIG.GTIMER.FONT.ID, "00", fntsize);
                txtlbl.setTintFill(0x000000);
                txtlbl.setOrigin(0.5);
                this.timer_ctr.add(txtlbl);
            this.timer_ctr.setPosition(this.swidth_val * POS.X, this.sheight_val * POS.Y);
            this.timer_ctr.show = function(flag){
                this.visible = flag;
            }
            this.timer_ctr.show(false);
            //INIT Game Timer
            GTimer.Init({
                view: this.timer_ctr,
                time: 0,
                scene: this
            });
        }
    },

    createscorelbl: function(){
        let fontsize = Math.floor(this.home_btn.displayHeight * 0.7);
        this.topscore_lbl = this.add.bitmapText(0, 0, this.CONFIG.ID+"-"+this.CONFIG.TOP_SCORE_LBL.FONT.ID, "SCORE: 0", fontsize);
        this.topscore_lbl.setPosition(this.centerx_val, this.home_btn.y);
        this.topscore_lbl.setOrigin(0.5);
    },

    createsparkle: function(){
        let sparkletex = this.textures.get(APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID);
        this.createanim((APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID),"sparkle",sparkletex,APPCONFIG.SPARKLE.FRAME_RATE,0);
        this.sparkle_anim = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID));
        this.sparkle_anim.setScale(this.swidth_val * 0.18 * (1/this.sparkle_anim.displayWidth));
        this.sparkle_anim.visible = false;
    },

    createblastanim: function(){
        //POSITIVE
        let postex = this.textures.get(this.CONFIG.ID+"-"+this.CONFIG.ANIMATION.POSITIVE.ID);
        this.createanim((this.CONFIG.ID+"-"+this.CONFIG.ANIMATION.POSITIVE.ID),"positive",postex,this.CONFIG.ANIMATION.POSITIVE.FRAME_RATE,0);
        this.positive_anim = this.add.sprite(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.ANIMATION.POSITIVE.ID));
        this.positive_anim.setScale(this.swidth_val * 0.18 * (1/this.positive_anim.displayWidth));
        this.positive_anim.visible = false;
        this.positive_anim.on('animationcomplete',function(){
            this.visible = false;
        })
        //NEGATIVE
        let negtex = this.textures.get(this.CONFIG.ID+"-"+this.CONFIG.ANIMATION.NEGATIVE.ID);
        this.createanim((this.CONFIG.ID+"-"+this.CONFIG.ANIMATION.NEGATIVE.ID),"negative",negtex,this.CONFIG.ANIMATION.NEGATIVE.FRAME_RATE,0)
        this.negative_anim = this.add.sprite(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.ANIMATION.NEGATIVE.ID));
        this.negative_anim.setScale(this.swidth_val * 0.18 * (1/this.negative_anim.displayWidth));
        this.negative_anim.visible = false;
        this.negative_anim.on('animationcomplete',function(){
            this.visible = false;
        })
    },

    createballoon: function(){
        if(this.balloonlist_arr != null && this.balloonlist_arr.length > 0){
            Global.Shuffle(this.balloonlist_arr); // SHUFFLE BALLONS LIST
            let balloondetails = Global.GetLetterData(TDict,this.balloon_data[this.ballooncnt_val][1]);
            let fontsize = this.CONFIG.BALLONS.FONT.SIZE || 60;
            let balloon = this.add.container();
                //IMAGE
                let balsprite = this.add.sprite(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.BALLONS.ID), this.balloonlist_arr[0]);
                balloon.add(balsprite);
                //LABEL
                fontsize = Math.floor(balsprite.displayHeight * fontsize);
                let ballbl = this.add.bitmapText(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.BALLONS.FONT.ID), balloondetails["LETTER"], fontsize);
                ballbl.setOrigin(0.5);
                balloon.add(ballbl);
            this.physics.add.existing(balloon);
            let balpos = this.generateballoonpos(balsprite.displayWidth, balsprite.displayHeight);
            balloon.setPosition(balpos.x, balpos.y);
            this.balloon_ctr.add(balloon);
            //PROPERTY
            balloon.index = this.balloon_data[this.ballooncnt_val][2];
            if(balloondetails["AUDIO"] && balloondetails["AUDIO"] != null){
                balloon.sndkey = this.CONFIG.ID+"-"+"LETTER-SND"+balloondetails["ID"];
                balloon.snd = this.sound.add(balloon.sndkey);
            }
            //METHOD
            let bounds = balloon.getBounds();
            balloon.setInteractive(
                new Phaser.Geom.Rectangle((0-bounds.width*0.5),(0-bounds.height*0.5),bounds.width,bounds.height), 
                Phaser.Geom.Rectangle.Contains
            );
            this.enableinteractive(balloon);
            balloon.playsnd = function(flag){
                if(this.snd){
                    if(flag){
                        this.snd.play();
                    }else{
                        this.snd.stop();
                    }
                }
            };
            //INCREMENT TEXT INDEX
            this.ballooncnt_val++;
            if(this.ballooncnt_val >= Global.GetLength( this.balloon_data )){
                Global.Shuffle(this.balloon_data);
                this.ballooncnt_val = 0;
            }
        }
    },

    initballoon: function(){
        this.balloon_ctr = this.add.container();
        this.game_data.tottask = Global.GetLength( this.DATA );
        let taskdata = this.DATA[ "TASK"+ this.game_data.task ];
        //GENERATE BALLON DATA
        this.balloon_data = this.generateballoondata(taskdata);
        Global.Shuffle(this.balloon_data);
        this.ballooncpy_data = Global.CloneArray(this.balloon_data);
        //BALLON LIST
        this.balloonlist_arr = this.CONFIG.BALLONS.LIST;
        //ADJUST GRAVITY
        this.physics.world.gravity.x = (this.CONFIG.BALLONS.GRAVITY[0] || 0) * 100;
        this.physics.world.gravity.y = (this.CONFIG.BALLONS.GRAVITY[1] || 0) * 100;
    },

    enableinteractive: function(object){
        let thisclass = this;
        object.on('pointerdown',function(pointer, dragX, dragY, event){
            if(thisclass.gamestart_bol){
                thisclass.stopallsnd({stopceleb: true});
                thisclass.clearobject(this);
                let balmat = this.getWorldTransformMatrix();
                if(this.index == thisclass.curletterindex_val){
                    thisclass.scoreearned_val += 10;
                    thisclass.balloonblast_val++;
                    thisclass.playrightsnd();
                    thisclass.playcorrectsnd();
                    thisclass.showgamesplash('positive', true, {x: balmat.getX(0,0), y: balmat.getY(0,0)});
                }else{
                    thisclass.scoreearned_val -= 10;
                    thisclass.playwrongsnd();
                    thisclass.playincorrectsnd();
                    thisclass.showgamesplash('negative', true, {x: balmat.getX(0,0), y: balmat.getY(0,0)});
                }
                thisclass.updatescorevalue();
            }
        });
    },

    disableinteractive: function(){
        if(this.balloon_ctr && this.balloon_ctr.length > 0){
            for(let i=0; i<this.balloon_ctr.length; i++){
                this.balloon_ctr.getAt(i).removeInteractive();
                this.clearobject(this.balloon_ctr.getAt(i));
            }
        }
    },

    //CHECK GAME START
    checkgamestart: function(){
        let flag = true;
        if(this.challengemode_bol){
            if(this.CONFIG.SOUNDS.CHALLENGE_INTRO){
                if(this.CONFIG.SOUNDS.CHALLENGE_INTRO.FORCE_PLAY){
                    flag = false;
                }
            }
        }else{
            if(this.CONFIG.SOUNDS.INTRO){
                if(this.CONFIG.SOUNDS.INTRO.FORCE_PLAY){
                    flag = false;
                }
            }
        }
        this.triggergame(flag);
        this.startgametimer();
    },

    //Score calculation
    calculatescore: function(){
        this.task_score += (this.point_score * this.scoreratio_val);
        this.main_score += this.task_score;
    },

    getscorepercent: function(){
        let maxscore = this.balloonblast_val * this.point_score;
        let score = this.task_score;
        if(this.game_data.tottask > 1){
            score = this.main_score;
        }
        Global.Log("TaskScore: "+this.task_score+" MainScore: "+this.main_score+" PointScore:"+this.point_score);
        if(this.challengemode_bol){
            maxscore = 1.6 * maxscore;
            let timep = GTimer.GetTimePercent();
            if(timep < 50){
                score = 2 * score;
            }else if(timep >=50 && timep < 75){
                score = 1.5 * score;
            }else if(timep >= 75){
                score = 1 * score;
            }
        }
        else{
            if(this.CONFIG.SCORE.FLAG == 0){
                score = this.point_score;
                maxscore = this.point_score;
            }
        }
        let percent = Math.floor((score/maxscore)*100);
        Global.Log("Score: "+score+" Percentage: "+percent+" Maxscore: "+maxscore);
        return [ score, percent ];
    },

    //SUMMARY
    delaysummary: function(){
        this.task_tmr = this.time.addEvent({
            delay: APPCONFIG.SUMMARY.DELAY,               
            callback:()=>{
                this.loadsummary();
            },
            loop: false,
        });
    },

    loadsummary: function(){
        let taskscores = this.getscorepercent();
        if(this.CONFIG.SCORE.FLAG == 0){
            if(this.game_data.task < this.game_data.tottask && taskscores[0] > 0){
                Global.Log("Loading next task");
                this.stopallsnd({ stopbg: false, stopright: true, stopceleb: true, stopintro: true });
                this.playtaskcompletesnd();
            }else{
                this.scene.launch('summary',{
                    score: taskscores[0], 
                    scene: this, 
                    last: true,
                    percent: taskscores[1],
                    flag: this.challengeflag_val,
                    cflag: this.challengelast_bol,
                    showcelebration: this.showceleb_bol
                });
            }
        }else if(this.CONFIG.SCORE.FLAG == 1){
            let islast = false;
            if(this.game_data.task >= this.game_data.tottask){
                islast = true;
            }
            this.scene.launch('summary',{
                score: taskscores[0], 
                scene: this, 
                last: islast,
                percent: taskscores[1],
                flag: this.challengeflag_val,
                cflag: this.challengelast_bol,
                showcelebration: this.showceleb_bol
            });
        }
    },

    //TASK CLEAR & LOAD NEXT
    clearstage: function(){
        this.disableinteractive();
        this.balloon_ctr.removeAll(true);
        this.balloon_ctr.destroy();
    },

    incrementtask: function(){
        this.game_data.task = this.game_data.task + 1;
    },

    resettask: function(){
        this.game_data.task = 1;
        this.task_score = 0;
        this.scoreratio_val = 1;
        this.timer_ctr.show(false);
    },

    resetvariable: function(){
        this.gameend_bol = false;
        this.challengelast_bol = false;
        this.gametimerend_bol = false;
        this.gametimermode_bol = false;
        this.gamereplay_bol = false;
        this.balloonblast_val = 0;
        this.active_btn = null;
        this.ballooncnt_val = 0;
        this.curletterkey_val = null;
        this.curlettercnt_val = 0;
        this.curletterindex_val = null;
        this.scoreearned_val = 0;
    },

    loadnexttask: function(){
        if(this.game_data.task >= this.game_data.tottask){
            this.resettask();
        }else{
            GTimer.Reset();
            this.stoptween();
            this.stoptimer();
            this.stopallsnd({
                stopbg: true,
                stopright: true,
                stopceleb: true,
                stopintro: true
            });
            this.clearstage();
            this.resetvariable();
            this.incrementtask();
            this.playbgsnd();
            this.initballoon();
            this.playintrosnd();
            this.checktimermode();
            this.checkgamestart();
        }
    },

    replaytask: function(params){
        if(params && params.chareset){
            this.resetchallenge();
        }
        GTimer.Reset();
        this.stoptimer();
        this.stopgametimer();
        this.stoptween();
        this.stopallsnd({
            stopbg: true,
            stopright: true,
            stopceleb: true,
            stopintro: true
        });
        this.clearstage();
        this.resettask();
        this.resetvariable();
        this.initballoon();
        this.playbgsnd();
        this.playintrosnd();
        this.checktimermode();
        this.checkgamestart();
    },

    //CHALLENGE
    incrementchallenge: function(){
        this.challengernd_val ++;
    },

    resetchallenge: function(){
        this.challengernd_val = 0;
        this.challengemode_bol = false;
    },

    challengetimeend: function(){
        this.stoptween();
        this.stoptimer();
        this.stopallsnd({
            stopbg: true,
            stopright: true,
            stopceleb: true,
            stopintro: true
        });
        this.gameend_bol = true;
        this.gametimerend_bol = true;
        this.disableinteractive();
        this.loadsummary();
    },

    startchallenge: function(params){
        this.challengemode_bol = params.flag;
        if(params.flag != null && params.flag){
            this.incrementchallenge();
            if(this.CONFIG.CHALLENGE && this.CONFIG.CHALLENGE.ROUNDS){
                let chtime = this.CONFIG.CHALLENGE.ROUNDS["ROUND"+this.challengernd_val];
                if(chtime){
                    this.replaytask();
                    this.timer_ctr.show(true);
                    GTimer.UpdateTime(chtime);
                }
            }
            if (this.challengernd_val >= this.challengerndtot_val){
                Global.Log("Last Challenge!");
                this.challengelast_bol = true;
            }   
        }else if(params.init != null){
            if(params.time != null){
                this.gametimermode_bol = true;
                this.timer_ctr.show(true);
                GTimer.UpdateTime(params.time);
            }
        }
    },

    checktimermode: function(){
        if(!this.challengemode_bol){
            if(this.CONFIG.GTIMER != null){
                if(this.CONFIG.GTIMER.FLAG){
                    this.startchallenge({
                        init: true,
                        time: this.CONFIG.GTIMER.TIME
                    })
                }
            }
        }
    },

    createui: function(){
        this.createbg();
        this.createtimebox();
        this.createsparkle();
        this.createblastanim();
        this.createbtn();
        this.createscorelbl();
        this.initballoon();
        this.createfpsmeter();
    },

    // Game Methods //

    //Preload function
    preload: function(){
        
    },

    //init function
    init: function(){
        this.CONFIG = gamejson.CONFIG;
        this.DATA = gamejson.DATA;
        Global.Log(this.CONFIG.NAME+": "+this.CONFIG.VERSION);
    },

    //create function
    create: function(){
        this.declarevariable();
        this.addaudio();
        this.createui();
        this.playbgsnd();
        this.playintrosnd();
        this.checktimermode();
        this.checkgamestart();
    },

    //update function
    update: function(){
        if(this.fpsmeter_lbl){
            this.fpsmeter_lbl.text = Math.floor(this.game.loop.actualFps);
        }
        if(this.gravitychange_val){
            this.physics.world.gravity.x += (this.gravitychange_val[0] * 100);
            this.physics.world.gravity.y += (this.gravitychange_val[1] * 100);
        }
    },

}