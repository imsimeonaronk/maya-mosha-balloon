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

        //Image
        this.bg_img = null;

        //Button
        this.active_btn = null;

        //Value
        this.swidth_val = this.game.config.width; // stage width
        this.sheight_val = this.game.config.height; // stage height
        this.centerx_val = this.swidth_val * 0.5;
        this.centery_val = this.sheight_val * 0.5;
        this.totalcard_val = null;
        this.cardopened_val = 0;
        this.scoreratio_val = 1;
        this.challengeflag_val = 0;
        this.challengerndtot_val = 0;
        this.challengernd_val = 0;
        this.cardopentime_val = 400;
        this.btnanimtime_val = 200;

        //Sound
        this.right_snd = null;
        this.wrong_snd = null;
        this.intro_snd = null;
        this.bg_snd = null;
        this.cintro_snd = null;
        this.taskcomplete_snd = null;

        //Animation
        this.sparkle_anim = null;

        //Data
        this.game_data = {level: 1, task: 1, tottask: 0};

        //Score
        this.main_score = 0;
        this.task_score = 0;
        this.point_score = this.CONFIG.SCORE.POINTS;

        //Container
        this.timer_ctr = null;
        this.cards_ctr = null;

        //Array
        this.correctsnd_arr = null;
        this.incorrectsnd_arr = null;

        //Card
        this.first_card = null;
        this.second_card = null;
        this.active_card = null;

        //Timer
        this.cardclose_tmr = null;
        this.introsnd_tmr = null;
        this.task_tmr = null;

        //PRESET VALUES
        if(this.CONFIG.CELEBRATION){
            if(this.CONFIG.CELEBRATION.VISIBLE != null){
                this.showceleb_bol = this.CONFIG.CELEBRATION.VISIBLE
            }
        }

        if(this.CONFIG.BOX){
            if(this.CONFIG.BOX.OPEN_TIME){
                this.cardopentime_val = this.CONFIG.BOX.OPEN_TIME * 1000;
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

        // APP LANGUAGE
        this.applang_val = this.CONFIG.LANG || "";
        this.applang_val = this.applang_val.toLowerCase();
    },
      
    // SCALE IMAGE
    scaleimage: function(tpe,obj){
        if(tpe == "bg"){
            if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                obj.setScale((1 / obj.width) * this.swidth_val);
            } else {
                obj.setScale((1 / obj.height) * this.sheight_val);
            }
        }
    },

    // CREATE ANIMATION
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

    //Show Sparkle
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

    //STOP TIMER
    stoptimer: function(){
        this.task_tmr = this.cleartimer(this.task_tmr);
        this.introsnd_tmr = this.cleartimer(this.introsnd_tmr);
        this.cardclose_tmr = this.cleartimer(this.cardclose_tmr);
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
                if(thisclass.CONFIG.SOUNDS.INTRO && thisclass.CONFIG.SOUNDS.INTRO.FORCE_PLAY){
                    if(thisclass.CONFIG.SOUNDS.INTRO.END_DELAY){
                        thisclass.introsnd_tmr = thisclass.time.addEvent({
                            delay: thisclass.CONFIG.SOUNDS.INTRO.END_DELAY,               
                            callback:()=>{
                                thisclass.introsnd_tmr = thisclass.cleartimer(thisclass.introsnd_tmr);
                                thisclass.gamestart_bol = true;
                            },
                            loop: false,
                        });
                    }else{
                        thisclass.gamestart_bol = true;
                    }
                }
            });
        }
        //CHECK CHALLENGE INTRO SOUND
        if(this.CONFIG.SOUNDS.CHALLENGE_INTRO){ 
            this.cintro_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.CHALLENGE_INTRO.ID);
            this.cintro_snd.on('complete',function(){
                if(thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO && thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO.FORCE_PLAY){
                    if(thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO.END_DELAY){
                        thisclass.introsnd_tmr = thisclass.time.addEvent({
                            delay: thisclass.CONFIG.SOUNDS.CHALLENGE_INTRO.END_DELAY,               
                            callback:()=>{
                                thisclass.introsnd_tmr = thisclass.cleartimer(thisclass.introsnd_tmr);
                                thisclass.gamestart_bol = true;
                            },
                            loop: false,
                        });
                    }else{
                        thisclass.gamestart_bol = true;
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
        this.stopwrongsnd();
        this.stopintrosnd();
        this.stoptaskcompletesnd();
    },

    // Card data generation
    generatecarddata: function(tdata){
        let cardarr = []
        let lineval = 1;
        //LINE
        if(tdata.LINE != null){
            lineval = tdata.LINE;
        }
        //TYPE
        if(tdata.TEXT != null && tdata.IMAGE != null && tdata.TEXT && tdata.IMAGE){
            let idatavl = IData["line"+lineval];
            let tdatavl = TData["line"+lineval];
            if(idatavl != null && tdatavl != null){
                let icnt = 0, lcnt = 0;
                let textlimit = Math.ceil(this.totalcard_val/2);
                if(tdata.TEXT_LIMIT != null){ textlimit = tdata.TEXT_LIMIT }
                for(let j=0; j<this.totalcard_val; j++){
                    if( j >= textlimit ){
                        cardarr[ j ] = ["image", idatavl[icnt] || "", icnt];
                        icnt = icnt + 1;
                        if(icnt >= Global.GetLength(idatavl)){
                            icnt = 0;
                        }
                    }else{
                        cardarr[ j ] = ["text", tdatavl[lcnt] || "", lcnt];
                        lcnt = lcnt + 1;
                        if(lcnt >= Global.GetLength(tdatavl)){
                            lcnt = 0;
                        }
                    }
                }
            }
        }else if(tdata.TEXT != null && tdata.TEXT){
            let tdatavl = TData["line"+lineval];
            let lcnt = 0;
            if(tdatavl != null){
                for(let j=0; j<this.totalcard_val; j++){
                    cardarr[ j ] = ["text", tdatavl[lcnt] || "", lcnt];
                    lcnt = lcnt + 1;
                    if(lcnt >= Global.GetLength(tdatavl)){
                        lcnt = 0;
                    }
                }
            }
        }else if(tdata.IMAGE != null && tdata.IMAGE){
            let idatavl = IData["line"+lineval];
            let icnt = 0;
            if(idatavl != null){
                for(let j=0; j<this.totalcard_val; j++){
                    cardarr[ j ] = ["image", idatavl[icnt] || "", icnt];
                    icnt = icnt + 1;
                    if(icnt >= Global.GetLength(idatavl)){
                        icnt = 0;
                    }
                }
            }
        }
        return cardarr;
    },

    // UI
    createfpsmeter: function(){
        if(Global.debug){
            this.fpsmeter_lbl = this.add.bitmapText(50, 50, APPCONFIG.ID+"-"+APPCONFIG.GTIMER.FONT.ID, "00", 60);
            this.fpsmeter_lbl.setOrigin(0.5);
            this.fpsmeter_lbl.visible = Global.debugfps || false;
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

    createsparkle: function(){
        let sparkletex = this.textures.get(APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID);
        this.createanim((APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID),"sparkle",sparkletex,APPCONFIG.SPARKLE.FRAME_RATE,0)
        this.sparkle_anim = this.add.sprite(200, 200, (APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID));
        this.sparkle_anim.setScale(this.swidth_val * 0.18 * (1/this.sparkle_anim.displayWidth));
        this.sparkle_anim.visible = false;
    },

    createcard: function(cdata,boxsize_val){
        let thisclass = this;
        let cardctr = this.add.container();
            if(boxsize_val == null){ boxsize_val = 0.0005 }
            let carddetails = null;
            let sclimg_val = 1;
            let sclbox_val = null;
            //DOWN IMAGE
            sclbox_val = this.swidth_val * boxsize_val;
            let downtile_img = this.add.sprite(0,0,this.CONFIG.ID+"-"+this.CONFIG.BOX.ID,this.CONFIG.BOX.DOWN_BOX_NAME);
            downtile_img.setScale(0.01, sclbox_val);
            cardctr.add(downtile_img);
            //CONTENT
            if(cdata[0] == "text"){
                carddetails = Global.GetLetterData(TDict,cdata[1]);
                let fontsize = this.CONFIG.BOX.FONT.SIZE || 60;
                fontsize = Math.floor(downtile_img.displayHeight * fontsize);
                let label_btxt = this.add.bitmapText(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.BOX.FONT.ID), carddetails["LETTER"], fontsize);
                label_btxt.setOrigin(0.5);
                label_btxt.setTintFill(0x000000);
                label_btxt.setScale(0.01,1);
                if(this.CONFIG.BOX.FONT.COLOR != null){
                    label_btxt.setTintFill(Phaser.Display.Color.HexStringToColor(this.CONFIG.BOX.FONT.COLOR).color);
                }
                label_btxt.displayWidth = label_btxt.width;
                label_btxt.displayHeight = label_btxt.height;
                cardctr.add(label_btxt);
                fontsize = null;
            }else if(cdata[0] == "image"){
                carddetails = Global.GetImageData(IDict,cdata[1]);
                let card_img = this.add.image(0, 0, (this.CONFIG.ID+"-"+"IMAGE"+carddetails["ID"]));
                sclimg_val = Math.max(downtile_img.displayWidth/card_img.displayWidth, downtile_img.displayHeight/card_img.displayWidth);
                card_img.setScale(0.01,sclimg_val);
                card_img.setOrigin(0.5);
                cardctr.add(card_img);
            }
            //TOP IMAGE
            let toptile_img = this.add.sprite(0,0,this.CONFIG.ID+"-"+this.CONFIG.BOX.ID,this.CONFIG.BOX.TOP_BOX_NAME);
            toptile_img.setScale(sclbox_val);
            cardctr.add(toptile_img);
            //SOUND
            if(carddetails){
                if(carddetails["AUDIO"] && carddetails["AUDIO"] != null){
                    cardctr.snd = this.sound.add(this.CONFIG.ID+"-"+"LETTER-SND"+carddetails["ID"]);
                }
            }
            //PROPERTY
            cardctr.ctype = cdata[0];
            cardctr.opened = false;
            cardctr.index = 0;
            if(carddetails){
                cardctr.index = carddetails["ID"] || 0;
            }
            cardctr.sclbox_val = sclbox_val;
            cardctr.sclimg_val = sclimg_val;
            sclbox_val, sclimg_val = null, null;
            //METHOD
            cardctr.playsnd = function(flag){
                if(this.snd){
                    if(flag){
                        this.snd.play();
                    }else{
                        this.snd.stop();
                    }
                }
            };
            cardctr.open = function(){
                cardctr.tween1 = thisclass.cleartween(cardctr.tween1);
                cardctr.tween1 = thisclass.tweens.add({
                    targets: this.getAt(2),
                    scaleX: 0.01,
                    duration: thisclass.cardopentime_val,
                    ease: 'Linear',
                    onComplete: function(tween, targets){
                        targets[0].parentContainer.sendToBack(targets[0]);
                    }
                });
                cardctr.tween2 = thisclass.cleartween(cardctr.tween2);
                cardctr.tween2 = thisclass.tweens.add({
                    targets: this.getAt(1),
                    scaleX: this.sclimg_val,
                    duration: thisclass.cardopentime_val,
                    ease: 'Linear',
                    delay: thisclass.cardopentime_val,
                });
                cardctr.tween3 = thisclass.cleartween(cardctr.tween3);
                cardctr.tween3 = thisclass.tweens.add({
                    targets: this.getAt(0),
                    scaleX: this.sclbox_val,
                    duration: thisclass.cardopentime_val,
                    ease: 'Linear',
                    delay: thisclass.cardopentime_val,
                    onComplete: function(){
                        if(thisclass.second_card != null){
                            thisclass.checkresult();
                        }
                    }
                });
            };
            cardctr.close = function(){
                cardctr.tween4 = thisclass.cleartween(cardctr.tween4);
                cardctr.tween4 = thisclass.tweens.add({
                    targets: this.getAt(0),
                    scaleX: this.sclbox_val,
                    duration: thisclass.cardopentime_val,
                    ease: 'Linear',
                    delay: thisclass.cardopentime_val,
                    onStart: function(tween, targets){
                        targets[0].parentContainer.bringToTop(targets[0]);
                    }
                });
                cardctr.tween5 = thisclass.cleartween(cardctr.tween5);
                cardctr.tween5 = thisclass.tweens.add({
                    targets: this.getAt(1),
                    scaleX: 0.01,
                    duration: thisclass.cardopentime_val,
                    ease: 'Linear',
                });
                cardctr.tween6 = thisclass.cleartween(cardctr.tween6);
                cardctr.tween6 = thisclass.tweens.add({
                    targets: this.getAt(2),
                    scaleX: 0.01,
                    duration: thisclass.cardopentime_val,
                    ease: 'Linear',
                });
            };
        return cardctr;
    },

    creatememorygrid: function(){
        this.game_data.tottask = Global.GetLength( this.DATA );
        this.cards_ctr = this.add.container();
        let taskdata = this.DATA[ "TASK"+ this.game_data.task ];
        this.totalcard_val = taskdata[ "TOTAL_CARD" ];
        let cardpairs = this.totalcard_val * 2;
        let carddata = this.generatecarddata(taskdata);
        let gridsize = Global.Split(taskdata.GRID || "3X3", "X");
        let ccnt = 0, cx = 0, cy = 0;
        let space_val = this.CONFIG.BOX.SPACE || 0;
        let bounds = null;
        let positions = [];
        for(let v=0; v<cardpairs; v++){
            let card = this.createcard(carddata[ccnt],taskdata.SIZE);
            this.cards_ctr.add(card);
            //CARD BOUNDS
            bounds = card.getBounds();
            card.setPosition(cx + bounds.width * 0.5, cy + bounds.height * 0.5);
            cx = cx + bounds.width + Math.floor(bounds.width * space_val);
            positions[v] = [card.x, card.y];
            //ENABLE INETRACTIVE
            card.setInteractive(
                new Phaser.Geom.Rectangle((0-bounds.width*0.5),(0-bounds.height*0.5),bounds.width,bounds.height), 
                Phaser.Geom.Rectangle.Contains
            );
            this.enableinteractive(card);
            //NEW ROW
            if((v+1)%gridsize[1] == 0){
                cx = 0;
                cy = cy + bounds.height + Math.floor(bounds.height * space_val);
            }
            //CONTENT COUNT
            ccnt = ccnt + 1;
            if(ccnt >= this.totalcard_val){ ccnt = 0; }
        }
        let cardsbounds = this.cards_ctr.getBounds();
        this.cards_ctr.setPosition(this.centerx_val - cardsbounds.width * 0.5, this.centery_val - cardsbounds.height * 0.4);
        //SHUFFLE CARDS
        this.cards_ctr.shuffle();
        for(let v=0; v<this.cards_ctr.length; v++){
            this.cards_ctr.getAt(v).setPosition(positions[v][0],positions[v][1])
        }
        //CLEAR VARIABLES
        bounds, space_val, ccnt = null, null, null;
        cx, cy, gridsize, cardsbounds = null, null, null, null;
        carddata, cardpairs, taskdata = null, null, null;
        positions = null;
    },

    animatecard: function(card){
        if(card){
            card.open();
        }
    },

    enableinteractive: function(object){
        let thisclass = this;
        object.on('pointerdown',function(pointer, dragX, dragY, event){
            if(thisclass.gamestart_bol && !this.opened){
                thisclass.active_card = this;
            }
        });
        object.on('pointerup',function(pointer, dragX, dragY, event){
            if(thisclass.gamestart_bol){
                thisclass.stopallsnd();
                if(thisclass.active_card != null && thisclass.active_card == this){
                    if(thisclass.first_card == null){
                        thisclass.first_card = this;
                        thisclass.first_card.opened = true;
                        thisclass.first_card.playsnd(true);
                        thisclass.animatecard(thisclass.first_card);
                    }else if(thisclass.first_card != this){
                        if(thisclass.second_card == null){
                            thisclass.second_card = this;
                            thisclass.second_card.opened = true;
                            thisclass.second_card.playsnd(true);
                            thisclass.animatecard(thisclass.second_card);
                        }
                    }
                }else{
                    thisclass.active_card = null;
                }
            }
        });
    },

    disableinteractive: function(){
        if(this.cards_ctr && this.cards_ctr.length > 0){
            for(let i=0; i<this.cards_ctr.length; i++){
                this.cards_ctr.getAt(i).removeInteractive();
            }
        }
    },

    clearcardtween: function(){
        if(this.cards_ctr && this.cards_ctr.length > 0){
            for(let i=0; i<this.cards_ctr.length; i++){
                let obj = this.cards_ctr.getAt(i);
                obj.tween1 = this.cleartimer(obj.tween1);
                obj.tween2 = this.cleartimer(obj.tween2);
                obj.tween3 = this.cleartimer(obj.tween3);
                obj.tween4 = this.cleartimer(obj.tween4);
                obj.tween5 = this.cleartimer(obj.tween5);
                obj.tween6 = this.cleartimer(obj.tween6);
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
        this.gamestart_bol = flag;
        this.startgametimer();
    },

    //RESET OPEN CARDS
    resetopencard: function(flag){
        if(flag){
            if(this.first_card != null){
                this.first_card.close();
                this.first_card.opened = false;
            }
            if(this.second_card != null){
                this.second_card.close();
                this.second_card.opened = false;
            }
        }
        this.second_card = null;
        this.first_card = null;
    },

    //CHECK RESULT
    checkresult: function(){
        let thisclass = this;
        if(this.first_card != null && this.second_card != null){
            if(this.first_card.index == this.second_card.index && this.first_card.ctype == this.second_card.ctype){
                //CORRECT FOUND
                this.cardopened_val ++;
                this.playrightsnd();
                this.playcorrectsnd();
                this.calculatescore();
                let cardmat = this.second_card.getWorldTransformMatrix();
                this.showsparkle(true,{x: cardmat.getX(0,0), y: cardmat.getY(0,0)});
                //RESET
                let cdelay = this.CONFIG.BOX.CORRECT_DELAY || 1;
                this.cardclose_tmr = this.cleartimer(this.cardclose_tmr);
                this.cardclose_tmr = this.time.addEvent({
                    delay: (cdelay * 1000),               
                    callback:()=>{
                        thisclass.resetopencard(false);
                    },
                    loop: false,
                });
                cardmat, cdelay = null, null;
                //COMPARE CARD OPENED
                if(this.cardopened_val >= this.totalcard_val){
                    //GAME END
                    Global.Log("Game End!");
                    this.gameend_bol = true;
                    this.stopgametimer();
                    this.delaysummary();
                }
            }else{
                //CLOSE CARDS
                this.playwrongsnd();
                this.playincorrectsnd();
                let cdelay = this.CONFIG.BOX.CLOSE_DELAY || 1;
                this.cardclose_tmr = this.cleartimer(this.cardclose_tmr);
                this.cardclose_tmr = this.time.addEvent({
                    delay: (cdelay * 1000),               
                    callback:()=>{
                        thisclass.resetopencard(true);
                    },
                    loop: false,
                });
                cdelay = null;
            }
        }
    },

    //Score calculation
    calculatescore: function(){
        this.task_score += (this.point_score * this.scoreratio_val);
        this.main_score += this.task_score;
    },

    getscorepercent: function(){
        let maxscore = this.cardopened_val * this.point_score;
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
                this.stopallsnd({ stopbg: false, stopright: true, stopceleb: true });
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
        this.clearcardtween();
        this.cards_ctr.removeAll(true);
        this.cards_ctr.destroy();
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
        this.cardopened_val = 0;
        this.active_btn = null;
        this.active_card = null
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
                stopceleb: true
            });
            this.resetopencard(true);
            this.clearstage();
            this.resetvariable();
            this.incrementtask();
            this.playbgsnd();
            this.creatememorygrid();
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
            stopceleb: true
        });
        this.resetopencard(true);
        this.clearstage();
        this.resettask();
        this.resetvariable();
        this.creatememorygrid();
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
            stopceleb: true
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
        this.createbtn();
        this.creatememorygrid();
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
    },

}