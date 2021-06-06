KGames.GridGame = function(){};

//Prototype
KGames.GridGame.prototype = {

    // Functions //

    // Variable Declaration
    declarevariable: function(){
        //Shape
        this.tickerframe_shp = null;

        //Button
        this.tickerup_btn = null;
        this.tickerdown_btn = null;
        this.close_btn = null;
        this.home_btn = null;
        this.back_btn = null;

        //Label
        this.fpsmeter_lbl = null;

        //Boolean
        this.gamestart_bol = false;
        this.gameend_bol = false;
        this.scroll_bol = false;
        this.tickrdrag_bol = false;
        this.tickrnochild_bol = false;
        this.challengemode_bol = false;
        this.challengelast_bol = false;
        this.showceleb_bol = true;
        this.gametimermode_bol = false;
        this.gametimerend_bol = false;
        this.tickershuffle_bol = false;
        this.istickershuffled_bol = false;
        this.tickercelsnd_bol = true;
        this.gamereplay_bol = false;
        this.gamedrag_bol = true;
        this.isIpad = this.sys.game.device.os.iPad;

        //Image
        this.curtikcer_img = null;
        this.pre_img = null;
        this.bg_img = null;
        this.end_img = null;
        this.glowbox_img = null;

        //Value
        this.swidth_val = this.game.config.width; // stage width
        this.sheight_val = this.game.config.height; // stage height
        this.centerx_val = this.swidth_val * 0.5;
        this.centery_val = this.sheight_val * 0.5;
        this.tkrheight_val = 0;
        this.totticker_val = null;
        this.fndticker_val = 0;
        this.platicker_val = 0;
        this.gridboxstroke_val = this.sheight_val * 0.001;
        this.endimg_val = null;
        this.lasty_val = null;
        this.sclspeed_val = 10;
        this.rightmove_val = 0;
        this.wrongmove_val = 0;
        this.scoreratio_val = 0;
        this.trigtickertime_val = 1000;
        this.tickercelsnddelay_bol = 2000;
        this.autoplacedelay_val = 0;
        this.challengernd_val = 0;
        this.challengerndtot_val = 0;
        this.challengeflag_val = 0;
        this.draglimit_val = 5;
        this.maxtickervisible_val = 1;
        this.btnanimtime_val = 200;

        //Animation
        this.sparkle_anim = null;

        //Container
        this.drag_ctr = null;
        this.ticker_ctr = null;
        this.gridh_ctr = null;
        this.grid_ctr = null;
        this.glow_ctr = null;
        this.spr_ctr = null;
        this.timer_ctr = null;

        //Sound
        this.right_snd = null;
        this.wrong_snd = null;
        this.intro_snd = null;
        this.bg_snd = null;
        this.cintro_snd = null;

        //Array
        this.correctsnd_arr = null;
        this.incorrectsnd_arr = null;

        //Timer
        this.task_tmr = null;
        this.endscreen_tmr = null;
        this.introsnd_tmr = null;
        this.triticker_tmr = null;
        this.tkrupdate_tmr = null;
        this.tritickersnd_tmr = null;
        this.tickerautoplace_tmr = null;

        //Data
        this.game_data = {level: 1, task: 1, tottask: 0}
        this.tkrmask_data = {x:0, y:0, w:0, h:0};
        this.gridmap_data = {x: 0, y:0, w:0, h:0};

        //Tween
        this.trans_twn = null;
        this.alpha_twn = null;

        //Score
        this.main_score = 0;
        this.task_score = 0;
        this.point_score = this.CONFIG.SCORE.POINTS;

        //PRESET VALUES
        if(this.CONFIG.TICKER_IMG){
            if(this.CONFIG.TICKER_IMG.CELEBRATION_SND != null){
                this.tickercelsnd_bol = this.CONFIG.TICKER_IMG.CELEBRATION_SND;
            }
            if(this.CONFIG.TICKER_IMG.SHUFFLE != null){
                this.tickershuffle_bol = this.CONFIG.TICKER_IMG.SHUFFLE;
            }
            if(this.CONFIG.TICKER_IMG.SOUND_DELAY != null){
                this.trigtickertime_val = this.CONFIG.TICKER_IMG.SOUND_DELAY * 1000;
            }
            if(this.CONFIG.TICKER_IMG.CELEBRATION_DELAY != null){
                this.tickercelsnddelay_bol = this.CONFIG.TICKER_IMG.CELEBRATION_DELAY * 1000;
            }
            if(this.CONFIG.TICKER_IMG.MAX_VISIBLE != null){
                this.maxtickervisible_val = this.CONFIG.TICKER_IMG.MAX_VISIBLE;
            }
            if(this.CONFIG.TICKER_IMG.AUTOPLACE_DELAY != null){
                this.autoplacedelay_val = this.CONFIG.TICKER_IMG.AUTOPLACE_DELAY * 1000;
            }
        }

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
    },
      
    // SCALE IMAGE
    scaleimage: function(tpe,obj){
        if(tpe == "bg"){
            if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                obj.setScale((1 / obj.width) * this.swidth_val);
            } else {
                obj.setScale((1 / obj.height) * this.sheight_val);
            }
        }else if(tpe == "main" || tpe == "pre" || tpe == "end"){
            if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                obj.setScale((1 / obj.height) * this.sheight_val * 0.90);
            } else {
                obj.setScale((1 / obj.width) * this.swidth_val * 0.85);
            }
        }else if(tpe == "endgif"){
            if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                obj.setScale((1 / obj.height) * this.sheight_val * 0.51);
            } else {
                obj.setScale((1 / obj.width) * this.swidth_val * 0.85);
            }
        }
    },

    getboxsize: function(row,col, mapbound){
        let rows = mapbound.displayWidth/col;
        let cols = mapbound.displayHeight/row;
        return [rows, cols];
    },

    getgridchild: function(slots){
        let gchild = [];
        if(slots){
            this.grid_ctr.each(function (child) {
                for(let i=0; i<slots.length; i++){
                    if(child.index == slots[i]){
                        gchild[gchild.length] = child;
                    }
                }
            });
        }
        return gchild;
    },

    getglowbox: function(sindex, tindex){
        let gchild = null;
        if(this.glow_ctr && sindex && tindex){
            for(let i=0; i<this.glow_ctr.length; i++){
                for(let j = 0; j<this.glow_ctr.getAt(i).length; j++){
                    let bchild = this.glow_ctr.getAt(i).getAt(j);
                    if(bchild.index == tindex){
                        if(bchild.gindex == sindex){
                            bchild.parentContainer.parentContainer.bringToTop(bchild.parentContainer);
                            return bchild;
                        }
                    }
                }
            }
        }
        return gchild;
    },

    getshadow: function(name){
        let schild = null;
        if(this.drag_ctr){
            this.drag_ctr.each(function (child) {
                if(child.name == name){
                    schild = child;
                }
            });
        }
        return schild;
    },

    //Check hit
    inboundary: function(drop, target){
        let flag = false;
        let drpc = null;
        let sindex = null;
        if(drop && target){
            if(target.hitbound.length > 0){
                for(let k=0; k<target.hitbound.length; k++){
                    for( let j=0; j<target.hitbound[k].length; j++){
                        if(drop.index == target.hitbound[k][j]){
                            let childp = this.getglowbox(target.slotindex[k],target.index);
                            if(childp && !childp.filled){
                                flag = true;
                                drpc = childp;
                                sindex = k;
                                return [flag, drpc, sindex];
                            }
                        }
                    }
                }
            }
        }
        return [flag, drpc, sindex];
    },

    hitgrid: function (obj){
        let flag = false, thisclass = this;
        let drpc = null, sindex = null;
        this.grid_ctr.each(function (child) {
            let bound1 = obj.getBounds();
            let bound2 = child.getBounds();
            if((bound1.x < bound2.x + bound2.width * 0.5) && (bound1.x > bound2.x - bound2.width * 0.5)){
                if((bound1.y < bound2.y + bound2.height * 0.5) && (bound1.y > bound2.y - bound2.height * 0.5)){
                    let bres = thisclass.inboundary(child, obj);
                    flag = bres[0];
                    drpc = bres[1];
                    sindex = bres[2];
                }
            }
        });
        return [flag, drpc, sindex];
    },

    //Create other assets
    createmask: function(width, height) {
        const maskShape = this.make.graphics();
        maskShape.fillStyle(0xffffff, 1);
        this.tkrmask_data.x = this.tickerframe_shp.x - this.tickerframe_shp.width
        this.tkrmask_data.y = this.tickerframe_shp.y - height * this.CONFIG.TICKER_IMG.MASKY
        maskShape.fillRect(this.tkrmask_data.x, this.tkrmask_data.y, width, height);
        return new Phaser.Display.Masks.GeometryMask(this, maskShape);
    },

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

    //Ticker Move
    uptikcerlist: function(pointer){
        let boundc = this.ticker_ctr.last.getBounds();
        let maskbdy = this.tickerframe_shp.y - this.tkrmask_data.h * this.CONFIG.TICKER_IMG.MASKY
        if((boundc.y + boundc.height) > maskbdy){
            this.ticker_ctr.y = this.ticker_ctr.y - this.tkrheight_val * this.CONFIG.TICKER_IMG.SLIDE;
        }
    },

    downtikcerlist: function(pointer){
        let boundc = this.ticker_ctr.first.getBounds();
        let maskbdy = this.tickerframe_shp.y + this.tkrmask_data.h * this.CONFIG.TICKER_IMG.MASKY
        if(boundc.y < maskbdy){
            this.ticker_ctr.y = this.ticker_ctr.y + this.tkrheight_val * this.CONFIG.TICKER_IMG.SLIDE;
        }
    },

    //Animation
    playtickeranim: function(obj){
        if(this.curtikcer_img){
            this.curtikcer_img.playanim();
        }
    },

    //Show Sparkle
    showsparkle: function(flag,pos){
        if(flag){
            this.sparkle_anim.visible = true;
            this.sparkle_anim.play('sparkle');
            this.sparkle_anim.setPosition(pos.x, pos.y);
        }else{
            this.sparkle_anim.visible = false;
        }
    },

    //Show End Image
    showendimg: function(flag){
        if(this.end_img){
            this.end_img.visible = flag;
            if(this.end_img.isanimation){
                if(flag){
                    this.end_img.play("endimg");
                }else{
                    this.end_img.pause("endimg");
                }
            }
        }
        if(this.endimg_val){
            if(flag){
                if(this.endimg_val.HIDE_TICKER){
                    this.glow_ctr.visible = false;
                    this.drag_ctr.visible = false;
                    this.ticker_ctr.visible = false;
                }
                if(this.endimg_val.HIDE_PREIMG){
                    this.showpreimg(false);
                }
            }
        }
    },

    //Show Pre Image
    showpreimg: function(flag){
        if(this.pre_img){
            this.pre_img.visible = flag;
        }
    },

    //Reset Ticker Drag
    resetticker: function(resobj,flag){
        if(resobj){
            this.stopalltickersnd();
            this.playincorrectsnd();
            this.playwrongsnd(); 
            this.curtikcer_img = null;
            this.drag_ctr.remove(resobj);
            this.ticker_ctr.add(resobj);
            resobj.x = resobj.ox;
            resobj.y = resobj.oy;
            resobj.dragged = false;
            resobj.placed = false;
            resobj.draggable = true;
            resobj.setScale(resobj.cscl);
        }
        this.scroll_bol = false;
    },

    // TIMER
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

    stoptimer: function(){
        this.task_tmr = this.cleartimer(this.task_tmr);
        this.introsnd_tmr = this.cleartimer(this.introsnd_tmr);
        this.endscreen_tmr = this.cleartimer(this.endscreen_tmr);
        this.triticker_tmr = this.cleartimer(this.triticker_tmr);
        this.tkrupdate_tmr = this.cleartimer(this.tkrupdate_tmr);
        this.tritickersnd_tmr = this.cleartimer(this.tritickersnd_tmr);
        this.tickerautoplace_tmr = this.cleartimer(this.tickerautoplace_tmr);
    },

    stoptween: function(){
        this.trans_twn = this.cleartween(this.trans_twn);
        this.alpha_twn = this.cleartween(this.alpha_twn);
    },

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
                                thisclass.updatetickervisible(true);
                            },
                            loop: false,
                        });
                    }else{
                        thisclass.updatetickervisible(true);
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
                                thisclass.updatetickervisible(true);
                            },
                            loop: false,
                        });
                    }else{
                        thisclass.updatetickervisible(true);
                    }
                }
            });
        }
        //CHECK BG MUSIC
        if(this.CONFIG.SOUNDS.BGMUSIC){ 
            this.bg_snd = this.sound.add(this.CONFIG.ID+"-"+this.CONFIG.SOUNDS.BGMUSIC.ID);
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

    playtickersnd: function(){
        if(this.curtikcer_img){
            this.curtikcer_img.playsnd(false);
            this.curtikcer_img.playsnd(true);
        }
    },

    playfirsttickersnd: function(){
        this.stoplastplaced();
        let firstticker = this.ticker_ctr.first;
        firstticker.visible = true;
        this.tritickersnd_tmr = this.time.addEvent({
            delay: this.tickercelsnddelay_bol,
            callback:()=>{
                firstticker.playinitsnd(true);
            },
            loop: false
        })
    },

    stopalltickersnd: function(){
        if(this.ticker_ctr){
            this.ticker_ctr.each(function (child) {
                child.playsnd(false);
                child.playinitsnd(false);
            });
        }
        if(this.drag_ctr){
            this.drag_ctr.each(function (child) {
                child.playsnd(false);
                child.playinitsnd(false);
            });
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
        this.stopwrongsnd();
        this.stopalltickersnd();
    },

    // UI
    createfpsmeter: function(){
        if(Global.debug){
            this.fpsmeter_lbl = this.add.bitmapText(50, 50, APPCONFIG.ID+"-"+APPCONFIG.GTIMER.FONT.ID, "00", 60);
            this.fpsmeter_lbl.setOrigin(0.5);
            this.fpsmeter_lbl.setTintFill(0xff0000);
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
                    this.ondown();
                    thisclass.active_btn = this;
                    this.isdown = true;
                });
                this[key.toLowerCase()+"_btn"].on('pointerover',function(pointer, px, py, event){
                    if(thisclass.active_btn == this){
                        this.ondown();
                    }
                });
                this[key.toLowerCase()+"_btn"].on('pointerout',function(pointer, px, py, event){
                    if(this.isdown){
                        this.onup();
                    }
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

    createglowbox: function(tckr, slot, scl){
        //Get Slot Position
        let gchilds = this.getgridchild(slot);
        let thisclass = this;
        if(gchilds && gchilds.length > 0){
            let container = this.add.container();
            for(let i=0; i<gchilds.length; i++){
                let bound = gchilds[i].getBounds();
                //Top Glow
                let gbxctr = this.add.container();
                    let box = this.add.image(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.DROP_AREA.ID));
                    if(tckr.gorigins && tckr.gorigins[i]){
                        box.setOrigin(tckr.gorigins[i][0],tckr.gorigins[i][1])
                    }else if(tckr.origins && tckr.origins[i]){
                        box.setOrigin(tckr.origins[i][0],tckr.origins[i][1])
                    }else{
                        box.setOrigin(0.5);
                    }
                    box.setScale(scl);
                gbxctr.add(box);
                gbxctr.index = tckr.index;
                gbxctr.gindex = gchilds[i].index;
                gbxctr.filled = false;
                gbxctr.totslots = slot.length;
                gbxctr.glow = function(clr){
                    if(clr == null){
                        this.first.setTintFill(0x00ff00);
                    }else{
                        if(clr == "red"){
                            this.first.setTintFill(0xff0000);
                        }
                    }
                };
                gbxctr.reset = function(){
                    this.first.setTintFill(0xffffff);
                    this.visible = thisclass.CONFIG.DROP_AREA.SHOW;
                }
                gbxctr.visible = this.CONFIG.DROP_AREA.SHOW;
                gbxctr.setPosition(bound.x + bound.width * 0.5, bound.y + bound.height * 0.5);
                container.add(gbxctr);
            }
            tckr.slotindex = slot;
            tckr.glowbox = container;
            this.glow_ctr.add(container);
        }
    },

    creategridbox: function(boxsize, i, flag){
        let bxctr = this.add.container();
            let box = this.add.rectangle(0, 0, boxsize[0], boxsize[1]);
            box.setStrokeStyle(this.gridboxstroke_val, 0xffffff);
            box.setOrigin(0.5);
            if(flag){
                box.setInteractive();
                box.input.dropZone = true;
            }
            box.name = "gridbox";
            bxctr.add(box);
            if( this.CONFIG.GRID.LABEL){
                let text3 = this.add.text((0 - box.width * 0.3), (0 - box.height * 0.3), (i+1), { font: '14px Arial' });
                text3.setOrigin(0.5);
                bxctr.add(text3);
            }
        return bxctr;
    },

    creategrid: function(){
        this.gridh_ctr = this.add.container();
        this.children.sendToBack(this.gridh_ctr);
        this.grid_ctr = this.add.container();
        let row = this.CONFIG.GRID.ROW;
        let col = this.CONFIG.GRID.COLUMN;
        let gridbox = row * col;
        let boxsize = this.getboxsize(row, col, this.pre_img);
        let xv = 0, yv = 0;
        let gw = parseInt(boxsize[0]) * parseInt(col);
        let gh = parseInt(boxsize[1]) * parseInt(row);
        for(let i=0; i < gridbox; i++){
            //Grid Top
            let boxctr = this.creategridbox(boxsize, i, false);
            boxctr.setPosition(xv, yv);
            boxctr.index = (i+1);
            this.grid_ctr.add(boxctr);
            //Grid Bottom
            let boxhctr = this.creategridbox(boxsize, i, true);
            boxhctr.setPosition(xv, yv);
            boxhctr.index = (i+1);
            this.gridh_ctr.add(boxhctr);
            xv = xv + boxsize[0];
            if(i > 0 && (i+1)%col == 0){
                xv = 0;
                yv = yv + boxsize[1];
            }
        }
        let gridx = 0 + parseInt(boxsize[0]) * 0.5 + this.swidth_val * this.CONFIG.GRID.POS.X - gw * 0.5;
        let gridy = 0 + parseInt(boxsize[1]) * 0.5 + this.sheight_val * this.CONFIG.GRID.POS.Y - gh * 0.5;
        this.grid_ctr.setPosition(gridx, gridy);
        this.grid_ctr.visible = this.CONFIG.GRID.VISIBLE;
        this.gridh_ctr.setPosition(gridx,gridy);
    },

    createpreimg: function(){
        if(this.CONFIG.PREIMG){
            let POS = this.CONFIG.PREIMG.POS;
            this.pre_img = this.add.image(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.PREIMG.ID));
            this.pre_img.setOrigin(0.5);
            this.scaleimage("pre",this.pre_img);
            this.pre_img.setPosition(this.swidth_val * POS.X, this.sheight_val * POS.Y);
        }
    },

    createmainimg: function(){
        if(this.CONFIG.MAINIMG){
            let POS = this.CONFIG.MAINIMG.POS;
            this.main_img = this.add.image(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.MAINIMG.ID));
            this.main_img.setOrigin(0.5);
            this.scaleimage("main",this.main_img);
            this.main_img.setPosition(this.swidth_val * POS.X, this.sheight_val * POS.Y);
        }
    },

    createendimage: function(){
        let thsiclass = this;
        if(this.endimg_val){
            let POS = this.endimg_val.POS;
            let imgtype = "end";
            if(this.endimg_val.PATH != null){
                this.end_img = this.add.image(0, 0, (this.CONFIG.ID+"-"+this.endimg_val.ID));
                this.end_img.isanimation = false;
            }else if(this.endimg_val.GIF != null){
                imgtype = "endgif";
                let loopcnt = this.endimg_val.GIF.LOOP || 0;
                let endimgtex = this.textures.get(this.CONFIG.ID+"-"+this.endimg_val.GIF.ID);
                this.createanim((this.CONFIG.ID+"-"+this.endimg_val.GIF.ID),"endimg",endimgtex,this.endimg_val.GIF.FRAME_RATE,loopcnt)
                this.end_img = this.add.sprite(200, 200, (this.CONFIG.ID+"-"+this.endimg_val.GIF.ID));
                this.end_img.isanimation = true;
                this.end_img.on('animationcomplete', function(){
                    thsiclass.delaysummary();
                });
            }
            this.end_img.setOrigin(0.5);
            this.scaleimage(imgtype,this.end_img);
            this.end_img.setPosition(this.swidth_val * POS.X, this.sheight_val * POS.Y);
            this.end_img.visible = false;
            if( this.endimg_val.LAYER == "bottom"){
                this.children.sendToBack(this.end_img);
                this.children.sendToBack(this.bg_img);
            }
            this.children.sendToBack(this.gridh_ctr);
        }
    },

    createtickerframe: function(){
        this.tickerframe_shp = this.add.rectangle(0, 0, this.swidth_val * this.CONFIG.TICKER_FRAME.WIDTH, this.sheight_val * this.CONFIG.TICKER_FRAME.HEIGHT, '0x000000');
        this.tickerframe_shp.alpha = this.CONFIG.TICKER_FRAME.ALPHA;
        this.tickerframe_shp.setOrigin(1,0.5);
        let tfx = this.swidth_val - ( this.swidth_val * this.CONFIG.TICKER_FRAME.POS.X);
        let tfy = this.centery_val + ( this.sheight_val * this.CONFIG.TICKER_FRAME.POS.Y);
        this.tickerframe_shp.setPosition(tfx, tfy);
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

    createtickerbtn: function(){
        let POSU = this.CONFIG.TICKER_BTN.UP.POS
        this.tickerup_btn = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.MENU.BTN.ID), this.CONFIG.TICKER_BTN.UP.NAME);
        this.tickerup_btn.visible = this.CONFIG.TICKER_BTN.UP.VISIBLE;
        this.tickerup_btn.setOrigin(0.5);
        this.tickerup_btn.setScale((1/this.tickerup_btn.displayWidth) * this.swidth_val * 0.03);
        this.tickerup_btn.setPosition(this.swidth_val * POSU.X, this.sheight_val * POSU.Y);
        this.tickerup_btn.setInteractive();
        this.tickerup_btn.on('pointerdown',this.uptikcerlist);

        let POSD = this.CONFIG.TICKER_BTN.DOWN.POS
        this.tickerdown_btn = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.MENU.BTN.ID), this.CONFIG.TICKER_BTN.DOWN.NAME);
        this.tickerdown_btn.visible = this.CONFIG.TICKER_BTN.DOWN.VISIBLE;
        this.tickerdown_btn.setOrigin(0.5);
        this.tickerdown_btn.setScale((1/this.tickerdown_btn.displayWidth) * this.swidth_val * 0.03);
        this.tickerdown_btn.setPosition(this.swidth_val * POSD.X, this.sheight_val * POSD.Y);
        this.tickerdown_btn.setInteractive();
        this.tickerdown_btn.on('pointerdown',this.downtikcerlist);
    },

    createsparkle: function(){
        let sparkletex = this.textures.get(APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID);
        this.createanim((APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID),"sparkle",sparkletex,APPCONFIG.SPARKLE.FRAME_RATE,0)
        this.sparkle_anim = this.add.sprite(200, 200, (APPCONFIG.ID+"-"+APPCONFIG.SPARKLE.ID));
        this.sparkle_anim.setScale(this.swidth_val * 0.18 * (1/this.sparkle_anim.displayWidth));
        this.sparkle_anim.play('sparkle');
        this.sparkle_anim.visible = false;
    },

    scrollcontainer: function(ctr, pointer, localX, localY, gameObject){
        let boundcf = this.ticker_ctr.first.getBounds();
        let boundcl = this.ticker_ctr.last.getBounds();
        let maskbdy = this.tkrmask_data.h * 0.5 + this.tkrmask_data.y
        if(gameObject && !gameObject.draggable){
            let duration = pointer.getDuration();
            if(duration > this.CONFIG.TICKER_IMG.HOLD && !this.scroll_bol){
                gameObject.draggable = true;
            }else if(Math.abs(pointer.downY - pointer.y) > 7){
                this.scroll_bol = true;
                if(this.lasty_val == null){
                    this.lasty_val = pointer.downY;
                }
                if(this.lasty_val > pointer.y){
                    if((boundcl.y + boundcl.height) > maskbdy){
                        ctr.y -= this.sclspeed_val;
                    }
                }else if(this.lasty_val < pointer.y){
                    if((boundcf.y + boundcf.height) < maskbdy){
                        ctr.y += this.sclspeed_val;
                    }
                }
                this.lasty_val = pointer.y;
            }
        }else{
            if(!this.tickrdrag_bol){
                if(Math.abs(pointer.downY - pointer.y) > 7){
                    this.scroll_bol = true;
                    if(this.lasty_val == null){
                        this.lasty_val = pointer.downY;
                    }
                    if(this.lasty_val > pointer.y){
                        if((boundcl.y + boundcl.height) > maskbdy){
                            ctr.y -= this.sclspeed_val;
                        }
                    }else if(this.lasty_val < pointer.y){
                        if((boundcf.y + boundcf.height) < maskbdy){
                            ctr.y += this.sclspeed_val;
                        }
                    }
                    this.lasty_val = pointer.y;
                }
            }
        }
    },

    stoptickertrigger: function(){
        this.triticker_tmr = this.cleartimer(this.triticker_tmr);
    },

    triggertickermethod: function(){
        this.triticker_tmr = this.time.addEvent({
            delay: this.trigtickertime_val,               
            callback:()=>{
                this.playtickeranim();
                this.playtickersnd();
            },
            loop: false,
        });
    },

    stoptriggertickersnd: function(){
        this.tritickersnd_tmr = this.cleartimer(this.tritickersnd_tmr);
    },

    updatetickervisible: function(flag){
        let mxvis = this.maxtickervisible_val;
        if(mxvis && this.ticker_ctr){
            //SHUFFLE TICKER
            if(this.tickershuffle_bol && !this.istickershuffled_bol){
                this.istickershuffled_bol = true;
                this.ticker_ctr.shuffle();
            }
            //INIT POSITION
            let tckhgt = 0;
            let mrat = 0.5;
            let ty = 0;
            let space = this.CONFIG.TICKER_IMG.SPACE
            if(this.isIpad && this.CONFIG.TICKER_IMG.SPACE_IPAD != null){
                space = this.CONFIG.TICKER_IMG.SPACE_IPAD;
            }
            //UPDATE POSITION
            for(let i=0; i<this.ticker_ctr.length; i++){
                if(this.ticker_ctr.getAt(i)){
                    let tckobj = this.ticker_ctr.getAt(i);
                    tckobj.y = ty + tckobj.displayHeight * mrat;
                    tckobj.ox = tckobj.x;
                    tckobj.oy = tckobj.y;
                    ty = tckobj.y + tckobj.displayHeight * 0.5 + this.tickerframe_shp.displayHeight * space;
                }
            }
            //HIDE ALL IN TICKER
            for(let i=0; i<this.ticker_ctr.length; i++){
                if(this.ticker_ctr.getAt(i)){
                    this.ticker_ctr.getAt(i).visible = false
                }
            }
            //VISIBLE NEEDED
            for(let i=0; i<mxvis; i++){
                if(this.ticker_ctr.getAt(i)){
                    this.ticker_ctr.getAt(i).visible = true;
                    tckhgt += this.ticker_ctr.getAt(i).displayHeight;
                }
            }
            //PLAY AUDIO AUTOMATICALLY
            if(mxvis == 1 && flag){
                if(this.ticker_ctr.first && this.ticker_ctr.first.initsnd){
                    this.playfirsttickersnd();
                }
            }
            //CHECK TICKER
            if(this.ticker_ctr.length > 0){
                this.startgametimer();
            }
            //UPDATE TICKER POSITION
            this.ticker_ctr.setPosition(
                this.swidth_val * this.CONFIG.TICKER_IMG.POS.X, 
                this.sheight_val * this.CONFIG.TICKER_IMG.POS.Y - tckhgt * 0.5
            );
        }
    },

    checktickervisiblity: function(){
        let flag = true;
        if(this.challengemode_bol){
            if(this.CONFIG.SOUNDS.CHALLENGE_INTRO){
                if(this.CONFIG.SOUNDS.CHALLENGE_INTRO.FORCE_PLAY){
                    if(!this.CONFIG.SOUNDS.CHALLENGE_INTRO.HIDE_TICKER){
                        flag = false;
                    }
                }
            }
        }else{
            if(this.CONFIG.SOUNDS.INTRO){
                if(this.CONFIG.SOUNDS.INTRO.FORCE_PLAY){
                    if(!this.CONFIG.SOUNDS.INTRO.HIDE_TICKER){
                        flag = false;
                    }
                }
            }
        }
        this.updatetickervisible(flag);
    },

    createticker: function(){
        let thisclass = this;
        //CONTAINERS
        this.glow_ctr = this.add.container();
        this.ticker_ctr = this.add.container();
        this.drag_ctr = this.add.container();
        this.spr_ctr = this.add.container();
        //GET CONTENT
        let tkrdata = this.DATA["TASK"+this.game_data.task]['CNT'];
        let tkrcnt = Global.GetLength( tkrdata );
        let tscl = this.pre_img.displayHeight * this.CONFIG.TICKER_IMG.SIZE;
        let ty = 0;
        this.game_data.tottask = Global.GetLength( this.DATA );
        this.totticker_val = tkrcnt;
        //END IMAGE
        if(this.DATA["TASK"+this.game_data.task]["ENDIMG"] && this.DATA["TASK"+this.game_data.task]["ENDIMG"]["ID"]){
            this.endimg_val = this.DATA["TASK"+this.game_data.task]["ENDIMG"];
        }
        //NEW TICKER
        for(let j=0; j<tkrcnt; j++){
            let cntdata = tkrdata["CNT"+(j+1)];
            let tckimg = null;
            if(cntdata.IMG != null){
                tckimg = this.add.image(0, 0, (this.CONFIG.ID+"-"+cntdata.ID));
            }else if(cntdata.TXT != null){
                let let_str = Global.GetLetterData(TDict,cntdata.TXT)["LETTER"];
                let fontsize = this.CONFIG.TICKER_IMG.FONT.SIZE || 60;
                fontsize = this.pre_img.displayHeight * (1/fontsize)
                tckimg = this.add.bitmapText(0, 0, (this.CONFIG.ID+"-"+this.CONFIG.TICKER_IMG.FONT.ID), (let_str), fontsize);
                tckimg.setTintFill(0x000000);
                if(this.CONFIG.TICKER_IMG.FONT.COLOR != null){
                    tckimg.setTintFill(Phaser.Display.Color.HexStringToColor(this.CONFIG.TICKER_IMG.FONT.COLOR).color);
                }
                tckimg.displayWidth = tckimg.width;
                tckimg.displayHeight = tckimg.height;
            }
            //SCALE TICKER
            let scl = 1;
            if(cntdata.TXT == null){ //SCALE FOR IMAGE
                tscl = this.pre_img.displayHeight * this.CONFIG.TICKER_IMG.SIZE;
                scl = tscl;
                if(this.CONFIG.TICKER_IMG.DRAG_SCALE){
                    scl = (this.tickerframe_shp.displayWidth * 0.8)/tckimg.displayWidth;
                    if(tscl < scl){ scl = tscl }
                }
                tckimg.setScale(scl);
            }else{ // NO SCALE FOR TEXT
                tscl = 1;
                scl = 1;
            }
            tckimg.setOrigin(0.5);
            tckimg.setPosition(0, ty);
            tckimg.alpha = 1;
            //PROPERTY
            tckimg.name = cntdata.ID;
            tckimg.gridtime = cntdata.GRID_TIME;
            tckimg.index = (j+1);
            tckimg.hitbound = cntdata.GRID_BOUND;
            tckimg.ox = tckimg.x;
            tckimg.oy = tckimg.y;
            tckimg.dragged = false;
            tckimg.placed = false;
            tckimg.tappable = false;
            tckimg.boundary = false;
            tckimg.draggable = true;
            tckimg.cscl = scl;
            tckimg.tscl = tscl;
            tckimg.shadow = null;
            tckimg.sindex = null;
            tckimg.autoplace = null;
            tckimg.hidetime = null;
            tckimg.gridglowcolour = null;
            tckimg.istouchdown = false;
            tckimg.isbutton = false;
            //AUTO PLACE
            if(cntdata.AUTO_PLACE != null){
                tckimg.autoplace = cntdata.AUTO_PLACE;
            }
            //CHECK BUTTON
            if(cntdata.GRID_BTN){
                tckimg.isbutton = true;
            }
            //TICKER ALPHA
            if(cntdata.GRID_ALPHA != null){
                tckimg.alpha = cntdata.GRID_ALPHA;
            }
            //TICKER ORIGIN
            if(cntdata.ORIGIN != null){
                tckimg.origins = cntdata.ORIGIN;
            }
            if(cntdata.ORIGIN_GLOW != null){
                tckimg.gorigins = cntdata.ORIGIN_GLOW;
            }
            //TICKER SND
            if(cntdata.GRID_SND != null){
                tckimg.snd = this.sound.add(this.CONFIG.ID+"-"+cntdata.ID);
                tckimg.snd.on('complete',function(){
                    tckimg.onplace();
                });
                tckimg.snd.on('stop',function(){
                    tckimg.onplace();
                });
            }
            let initsndid = null;
            if(cntdata.GRID_TICKER_SND != null){
                initsndid = this.CONFIG.ID+"-"+"START_"+cntdata.ID;
            }
            if(this.challengemode_bol){
                if(cntdata.GRID_CHALLENGE_SND != null){
                    initsndid = this.CONFIG.ID+"-"+"CHALLENGE_"+cntdata.ID;
                }
            }
            if(initsndid != null){
                tckimg.initsnd = this.sound.add(initsndid);
            }
            //GRID TICKER AUTO HIDE TIME
            if(cntdata.GRID_TICKER_HIDE_TIME != null){
                tckimg.hidetime = cntdata.GRID_TICKER_HIDE_TIME;
            }
            //GLOW BOX
            this.createglowbox(tckimg, cntdata.GRID_PLACEMENT, tscl);
            //SHADOW BOX
            if(cntdata.SHADOW != null){
                let shadow = this.getshadow(cntdata.SHADOW);
                tckimg.shadow = shadow;
            }
            //TICKER GIF
            if(cntdata.GRID_GIF != null){
                tckimg.animname = 'ANIM'+(cntdata.GRID_GIF.ID);
                let sparkletex = this.textures.get((this.CONFIG.ID+"-"+cntdata.GRID_GIF.ID));
                let GORI = cntdata.GRID_GIF.ORIGIN;
                let tglowobj = this.getglowbox(tckimg.slotindex[0], tckimg.index);
                this.createanim((this.CONFIG.ID+"-"+cntdata.GRID_GIF.ID),(tckimg.animname),sparkletex,cntdata.GRID_GIF.FRAME_RATE,0);
                tckimg.anim = this.add.sprite(200, 200);
                tckimg.anim.setScale(tscl);
                tckimg.anim.visible = true;
                if(tglowobj){
                    if(GORI){
                        tckimg.anim.setOrigin(GORI[0][0],GORI[0][1]);
                    }
                    tckimg.anim.setPosition(tglowobj.x, tglowobj.y);
                }
                this.spr_ctr.add(tckimg.anim)
            }
            this.tkrheight_val = tckimg.displayHeight;
            this.ticker_ctr.add(tckimg);
            ty = ty + tckimg.displayHeight + tckimg.displayHeight * this.CONFIG.TICKER_IMG.SPACE;
            //GIRD TIME
            if (tckimg.gridtime == 0){ // PRE POPULATE GRID
                let glowobj = this.getglowbox(tckimg.slotindex[0], tckimg.index);
                if(glowobj){
                    if(this.CONFIG.DROP_AREA.SHOW_ON_PREPLACED || this.CONFIG.DROP_AREA.SHOW){
                        glowobj.visible = true;
                        glowobj.glow();
                    }
                    this.ticker_ctr.remove(tckimg);
                    this.drag_ctr.add(tckimg);
                    this.drag_ctr.bringToTop(tckimg);
                    tckimg.tappable = true;
                    tckimg.placed = true;
                    if(tckimg.origins){
                        tckimg.setOrigin(tckimg.origins[0][0],tckimg.origins[0][1]);
                    }
                    tckimg.setScale(tckimg.tscl);
                    tckimg.setPosition(glowobj.x, glowobj.y);
                    this.fndticker_val++;
                }
            } else {
                tckimg.visible = false;
            }
            //FUNCTIONS(METHODS)
            tckimg.playanim = function(){
                if(this.anim){
                    this.alpha = 0.01;
                    this.hideshadow();
                    this.anim.play(this.animname);
                }
            };
            tckimg.hideshadow = function(){
                if(this.shadow){
                    this.shadow.alpha = 0;
                }
            }
            tckimg.playinitsnd = function(flag){
                if(this.initsnd){
                    if(flag){
                        this.initsnd.play();
                    }else{
                        this.initsnd.stop();
                    }
                }
            };
            tckimg.playsnd = function(flag){
                if(this.snd){
                    if(flag){
                        this.snd.play();
                    }else{
                        this.snd.stop();
                    }
                }else if(flag){
                    this.onplace();
                }
            };
            tckimg.updateorigin = function(){
                if(this.origins != null && this.sindex != null){
                    if(this.origins[this.sindex]){
                        this.setOrigin(this.origins[this.sindex][0],this.origins[this.sindex][1]);
                    }
                }
            };
            tckimg.ondropped = function(flag){
                this.placed = true;
                this.dragged = false;
                thisclass.scroll_bol = false;
                if(this.curglowbox){
                    this.updateorigin();
                    this.hideshadow();
                    this.setScale(this.tscl);
                    this.setPosition(this.curglowbox.x, this.curglowbox.y);
                    this.curglowbox.glow(this.gridglowcolour);
                    this.curglowbox.visible = thisclass.CONFIG.DROP_AREA.SHOW_ON_DROP;
                }
            };
            tckimg.hide = function(){
                if(this.gridtime > 1){
                    let htime = this.hidetime;
                    if(htime == null){
                        htime = 0;
                    }
                    this.tick_tmr = thisclass.time.addEvent({
                        delay: (htime * 1000),               
                        callback:()=>{
                            this.visible = false;
                            if(this.curglowbox){
                                this.curglowbox.visible = false;
                            }
                            thisclass.showsparkle(false);
                        },
                        loop: false,
                    });
                }
            };
            tckimg.onplace = function(){
                thisclass.curtikcer_img = null;
                this.tappable = true;
                this.hide();
                thisclass.delayendimg();
            };
            //BUTTON EFFECT
            tckimg.ondown = function(){
                if(tckimg.isbutton){
                    if(this.scaleX != (this.cscl * 0.92)){
                        this.tween1 = thisclass.cleartween(this.tween1);
                        this.tween1 = thisclass.tweens.add({
                            targets: this,
                            scaleX: (this.cscl * 0.92),
                            scaleY: (this.cscl * 0.92),
                            duration: thisclass.btnanimtime_val,
                            ease: 'Linear',
                        });
                    }
                }
            };
            tckimg.onup = function(){
                if(tckimg.isbutton){
                    if(this.scaleX != (this.cscl * 1.0)){
                        this.tween2 = thisclass.cleartween(this.tween2);
                        this.tween2 = thisclass.tweens.add({
                            targets: this,
                            scaleX: (this.cscl * 1.0),
                            scaleY: (this.cscl * 1.0),
                            duration: thisclass.btnanimtime_val,
                            ease: 'Linear',
                        });
                    }
                }
            }
            //Enable Ticker Interactive
            this.enableinteractive(tckimg);
        }
        //POSITION
        this.ticker_ctr.setPosition(
            this.swidth_val * this.CONFIG.TICKER_IMG.POS.X, 
            this.sheight_val * this.CONFIG.TICKER_IMG.POS.Y
        );
        // MASK
        //this.tkrmask_data = { w: this.tickerframe_shp.width, h: this.tickerframe_shp.height } // * 0.6
        //this.ticker_ctr.mask = this.createmask(this.tkrmask_data.w, this.tkrmask_data.h);
        /*
        this.ticker_ctr.setInteractive();
        this.ticker_ctr.on('pointermove', function(pointer, localX, localY, event){
            if(pointer.isDown){
                thisclass.scrollcontainer(this, pointer, localX, localY, null);
            }
        });
        */
    },

    stoplastplaced: function(){
        this.stopallsnd({
            stopbg: false,
            stopright: false,
            stopceleb: !this.tickercelsnd_bol
        });
        this.stoptriggertickersnd();
        this.stoptickertrigger();
        this.stopalltickersnd();
        if(this.curtikcer_img){
            this.curtikcer_img.onplace();
        }
    },

    swapcontainer: function(gameObject){
        if(gameObject && gameObject.parentContainer == this.ticker_ctr){
            if(!gameObject.placed && gameObject.draggable){
                this.stoplastplaced();
                this.ticker_ctr.remove(gameObject);
                this.drag_ctr.add(gameObject);
                this.drag_ctr.bringToTop(gameObject);
                gameObject.x = gameObject.x + this.ticker_ctr.x - gameObject.parentContainer.x;
                gameObject.y = gameObject.y + this.ticker_ctr.y - gameObject.parentContainer.y;
            }
        }
    },

    canplaceover: function(gobject){
            let thisclass = this;
            let overridedrop = this.CONFIG.DROP_AREA.OVER_RIDE;
            if(overridedrop == null){ overridedrop = true }
            if(gobject.slotindex && gobject.slotindex.length > 1){
                overridedrop = false;
            }
            if(overridedrop){
                return true;
            }else{
                if(this.glowbox_img && this.drag_ctr){
                    for(let j=0; j<this.drag_ctr.length; j++){
                        let child = this.drag_ctr.getAt(j);
                        if(child.curglowbox && child.curglowbox.gindex){
                            if(thisclass.glowbox_img.gindex == child.curglowbox.gindex){
                                if(child.curglowbox.filled){ return false; }
                            }
                        }
                    }
                }
            }
        return true;
    },

    oncorrectplacement: function(gameobj, flag, sindex){
        this.incrementplaced();
        this.calculatescore();
        this.tickrdrag_bol = false;
        this.curtikcer_img = gameobj;
        this.glowbox_img.filled = true;
        if(sindex != null){ 
            gameobj.sindex = sindex 
        }
        gameobj.curglowbox = this.glowbox_img;
        gameobj.ondropped();
        if(flag){
            this.triggertickermethod();
        }
        this.showsparkle(true,{x: this.glowbox_img.x, y: this.glowbox_img.y});
        this.tkrupdate_tmr = this.cleartimer(this.tkrupdate_tmr);
        this.tkrupdate_tmr = this.time.addEvent({
            delay: 10,               
            callback:()=>{
                this.updatetickervisible(true);
            },
        })
        this.checkresult();
    },

    movetorightplace: function(gameObject){
        //FIND EMPTY SLOT
        let emptyslot = [];
        this.scoreratio_val = 0;
        if(this.drag_ctr){
            for(let j=0; j<this.drag_ctr.length; j++){
                let child = this.drag_ctr.getAt(j);
                if(child.curglowbox && child.curglowbox.gindex && child.curglowbox.totslots){
                    if(child.curglowbox.filled && child.curglowbox.totslots > 1){ 
                        emptyslot[ emptyslot.length ] = child.sindex;
                    }
                }
            }
        }
        //CHECK EMPTY SLOT
        let slots = [0,1,2];
        if(emptyslot.length>0){
            for(let e=0; e<emptyslot.length; e++){
                for(let s=0; s<slots.length; s++){
                    if(emptyslot[e] == slots[s]){
                        let aindex = slots.indexOf(slots[s]);
                        if(aindex > -1){
                            slots.splice(aindex,1)
                        }
                    }
                }
            }
        }
        if(gameObject.slotindex.length == 1){
            slots = [0];
        }else{
            Global.Shuffle(slots);
        }
        if(slots.length > 0){
            let delaytime = this.autoplacedelay_val;
            if(delaytime < 10){ delaytime = 10 }
            this.gamedrag_bol = false;
            this.glowbox_img = this.getglowbox(gameObject.slotindex[slots[0]], gameObject.index);
            gameObject.gridglowcolour = "red";
            this.tickerautoplace_tmr = this.cleartimer(this.tickerautoplace_tmr);
            this.tickerautoplace_tmr = this.time.addEvent({
                delay: delaytime,
                callback:()=>{
                    this.swapcontainer(gameObject);
                    this.playrightsnd();
                    this.oncorrectplacement(gameObject,true,slots[0]);
                    this.gamedrag_bol = true;
                },
                loop:false
            })
        }
    },

    enableinteractive: function(object){
        let thisclass = this;
        //Enable interactive
        object.setInteractive({draggable: true});
        //Touch
        object.on('pointerdown', function(pointer, localX, localY, event){
            this.istouchdown = true;
            this.ondown();
        });
        object.on('pointermove', function(pointer, localX, localY, event){
            if(Math.abs(pointer.worldX - pointer.downX) > 10 || Math.abs(pointer.worldY - pointer.downY) > 10){
                this.onup();
                this.istouchdown = false;
            }
        });
        object.on('pointerup', function(pointer, localX, localY, event){
            this.onup();
            if(this.istouchdown){
                if(thisclass.maxtickervisible_val > 1){
                    if(!this.dragged){
                        thisclass.stopintrosnd();
                        thisclass.stopalltickersnd();
                        this.playinitsnd(false);
                        this.playsnd(false);
                        this.playinitsnd(true);
                        this.playanim();
                    }
                }else{
                    if(!this.dragged && this.placed){
                        this.playinitsnd(false);
                        this.playsnd(false);
                        this.playinitsnd(true);
                        this.playanim();
                    }
                }
            }
            this.istouchdown = false;
        });
        // Drag
        object.on('dragstart', function (pointer, dragX, dragY) {
            if(thisclass.gamedrag_bol){
                if(!this.placed && !thisclass.gametimerend_bol){
                    //
                }
            }
        });
        object.on('drag', function (pointer, dragX, dragY) {
            if(thisclass.gamedrag_bol){
                if(!this.placed && this.draggable && !thisclass.gametimerend_bol){
                    let xdrgv = Math.abs( this.x - dragX )
                    let ydrgv = Math.abs( this.x - dragX )
                    if( xdrgv > thisclass.draglimit_val || ydrgv > thisclass.draglimit_val ){
                        thisclass.swapcontainer(this);
                        this.setScale(this.tscl);
                        thisclass.tickrdrag_bol = true;
                        this.dragged = true;
                        this.x = dragX + thisclass.ticker_ctr.x - this.parentContainer.x;
                        this.y = dragY + thisclass.ticker_ctr.y - this.parentContainer.y;
                    }
                }
            }
        });
        object.on('dragenter', function (pointer, dropObject) {
            if(thisclass.gamedrag_bol){
                if(!this.placed && this.draggable && !thisclass.gametimerend_bol){
                    if(this.dragged){
                        let hitres = thisclass.inboundary(dropObject.parentContainer, this);
                        if(hitres[0]){
                            let childp = thisclass.getglowbox(hitres[1].gindex,this.index);
                            if(childp){
                                if(thisclass.CONFIG.DROP_AREA.SHOW_ON_DRAG || thisclass.CONFIG.DROP_AREA.SHOW){
                                    childp.visible = true;
                                }
                                childp.glow();
                                thisclass.glowbox_img = childp;
                            }
                            this.sindex = hitres[2];
                            this.boundary = true;
                        }
                    }
                }
            }
        });
        object.on('dragleave', function (pointer, dropObject) {
            if(thisclass.gamedrag_bol){
                if(!this.placed && this.draggable && !thisclass.gametimerend_bol){
                    if(this.dragged){
                        let hitres = thisclass.inboundary(dropObject.parentContainer, this);
                        if(hitres[0]){
                            let childp = thisclass.getglowbox(hitres[1].gindex, this.index);
                            if(childp){
                                childp.reset();
                                thisclass.glowbox_img = null;
                            }
                            this.sindex = null;
                            this.boundary = false;
                        }
                    }
                }
            }
        });
        object.on('dragend',function (pointer, dropped) {
            if(thisclass.gamedrag_bol){
                if(!this.placed && this.draggable && !thisclass.gametimerend_bol){ //&& this.glowbox
                    if(this.dragged){
                        let condition = thisclass.canplaceover(this);
                        if(this.boundary && thisclass.glowbox_img && condition){
                            thisclass.scoreratio_val = 1;
                            if(thisclass.wrongmove_val > 0 && this.autoplace){
                                thisclass.scoreratio_val = 0.5;
                            }
                            thisclass.stopallsnd({stopbg: false, stopright: true, stopceleb: true});
                            thisclass.playrightsnd();
                            thisclass.playcorrectsnd();
                            thisclass.triggertickermethod();
                            thisclass.wrongmove_val = 0;
                            thisclass.rightmove_val++;
                            thisclass.oncorrectplacement(this,false);
                        }else{
                            thisclass.tickrdrag_bol = false;
                            thisclass.wrongmove_val++;
                            if(this.autoplace && thisclass.wrongmove_val >= this.autoplace){
                                thisclass.wrongmove_val = 0;
                                thisclass.stopallsnd({stopbg: false, stopright: true, stopceleb: true});
                                thisclass.playincorrectsnd();
                                thisclass.movetorightplace(this);
                            }
                            thisclass.resetticker(this);
                        }
                    }
                }
            }
        });
    },

    stagelistener: function(){
        let thisclass = this;
        this.input.on('pointerup',function(pointer, gameObject, event){
            thisclass.scroll_bol = false;
            if(thisclass.ticker_ctr){
                if(thisclass.ticker_ctr.length < 1){
                    if(gameObject.name == "gridbox"){
                        thisclass.tickrnochild_bol = true;
                        thisclass.stopallsnd({
                            stopbg: false,
                            stopright: true,
                            stopceleb: true
                        });
                    }
                }
            }
        });
    },

    disableinteractive: function(){
        if(this.ticker_ctr && this.ticker_ctr.length > 0){
            for(let i=0; i<this.ticker_ctr.length; i++){
                this.ticker_ctr.getAt(i).removeInteractive();
                this.ticker_ctr.getAt(i).x = this.ticker_ctr.getAt(i).ox;
                this.ticker_ctr.getAt(i).y = this.ticker_ctr.getAt(i).oy;
                this.ticker_ctr.getAt(i).visible = false;
            }
        }
        if(this.drag_ctr && this.drag_ctr.length > 0){
            for(let i=0; i<this.drag_ctr.length; i++){
                this.drag_ctr.getAt(i).removeInteractive();
                this.drag_ctr.getAt(i).visible = false;
            }
        }
    },

    removetickertween: function(){
        if(this.ticker_ctr && this.ticker_ctr.length > 0){
            for(let i=0; i<this.ticker_ctr.length; i++){
                this.ticker_ctr.getAt(i).tween1 = this.cleartween(this.ticker_ctr.getAt(i).tween1);
                this.ticker_ctr.getAt(i).tween2 = this.cleartween(this.ticker_ctr.getAt(i).tween2);
            }
        }
        if(this.drag_ctr && this.drag_ctr.length > 0){
            for(let i=0; i<this.drag_ctr.length; i++){
                this.drag_ctr.getAt(i).tween1 = this.cleartween(this.drag_ctr.getAt(i).tween1);
                this.drag_ctr.getAt(i).tween2 = this.cleartween(this.drag_ctr.getAt(i).tween2);
            }
        }
    },

    //Result Check
    checkresult: function(){
        if(this.fndticker_val >= this.totticker_val){
            Global.Log('Game End!');
            this.gameend_bol = true;
            this.stoptriggertickersnd();
            this.stopgametimer();
        }else{
            this.rightmove_val = 0;
            this.wrongmove_val = 0;
        }
    },

    delayendimg: function(){
        if(!this.gamereplay_bol){
            if(this.fndticker_val >= this.totticker_val){
                if(this.endimg_val && this.endimg_val.VISIBLE){
                    this.endscreen_tmr = this.time.addEvent({
                        delay: this.CONFIG.ENDVIEW.DELAY,               
                        callback:()=>{
                            this.endtimerlistener(true);
                        },
                        loop: false,
                    });
                }else{
                    this.endtimerlistener(false);
                }
            }
        }
    },

    endtimerlistener: function(flag){
        this.stopallsnd({
            stopbg: true,
            stopright: true,
            stopceleb: true
        });
        this.showendimg(flag);
        if(flag && this.endimg_val){
            if(this.endimg_val.GIF == null){
                this.delaysummary();
            }
        }else{
            this.delaysummary();
        }
    },

    delaysummary: function(){
        this.task_tmr = this.time.addEvent({
            delay: APPCONFIG.SUMMARY.DELAY,               
            callback:()=>{
                this.loadsummary();
            },
            loop: false,
        });
    },

    //Score calculation
    calculatescore: function(){
        this.task_score += (this.point_score * this.scoreratio_val);
        this.main_score += this.task_score;
    },

    getscorepercent: function(){
        let maxscore = this.platicker_val * this.point_score;
        let score = this.task_score;
        Global.Log("TaskScore: "+this.task_score+" MainScore: "+this.main_score+" TickerVal: "+this.platicker_val+" PointScore:"+this.point_score);
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

    //Next Task Process
    clearstage: function(){
        this.disableinteractive();
        this.removetickertween();
        if(this.end_img){
            this.end_img.destroy();
            this.end_img = null;
        }
        this.drag_ctr.removeAll(true);
        this.drag_ctr.destroy();
        this.ticker_ctr.removeAll(true);
        this.ticker_ctr.destroy();
        this.glow_ctr.removeAll(true);
        this.glow_ctr.destroy();
        this.spr_ctr.removeAll(true);
        this.spr_ctr.destroy();
    },

    resetgrid: function(){
        this.grid_ctr.each(function (child) {
            child.first.strokeColor = 0xffffff;
        });
        this.gridh_ctr.each(function (child) {
            child.first.strokeColor = 0xffffff;
        });
    },

    incrementtask: function(){
        this.game_data.task = this.game_data.task + 1;
    },

    incrementplaced: function(){
        this.platicker_val++;
        this.fndticker_val++;
    },

    incrementchallenge: function(){
        this.challengernd_val ++;
    },

    resetchallenge: function(){
        this.challengernd_val = 0;
        this.challengemode_bol = false;
    },

    resettask: function(){
        this.game_data.task = 1;
        this.task_score = 0;
        this.platicker_val = 0;
        this.rightmove_val = 0;
        this.wrongmove_val = 0;
        this.scoreratio_val = 0;
        this.timer_ctr.show(false);
    },

    resetvariable: function(){
        this.fndticker_val = 0;
        this.curtikcer_img = null;
        this.gameend_bol = false;
        this.platicker_val = 0;
        this.tickrdrag_bol = false;
        this.scroll_bol = false;
        this.tickrnochild_bol = false;
        this.glowbox_img = null;
        this.challengelast_bol = false;
        this.gametimerend_bol = false;
        this.gametimermode_bol = false;
        this.istickershuffled_bol = false;
        this.gamereplay_bol = false;
        this.gamedrag_bol = true;
    },

    loadsummary: function(){
        let taskscores = this.getscorepercent();
        if(this.CONFIG.SCORE.FLAG == 0){
            if(this.game_data.task < this.game_data.tottask){
                Global.Log("Loading next task");
                this.loadnexttask();
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
            this.clearstage();
            this.resetgrid();
            this.resetvariable();
            this.incrementtask();
            this.showpreimg(true);
            this.createticker();
            this.createendimage();
            this.playbgsnd();
            this.updatetickervisible(true);
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
        this.clearstage();
        this.resetgrid();
        this.resettask();
        this.resetvariable();
        this.showpreimg(true);
        this.createticker();
        this.createendimage();
        this.playbgsnd();
        this.playintrosnd();
        this.checktimermode();
        this.checktickervisiblity();
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
        this.showendimg(true);
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
        this.createpreimg();
        this.createmainimg();
        this.creategrid();
        this.createtickerframe();
        this.createticker();
        this.createendimage();
        this.stagelistener();
        this.createtickerbtn();
        this.createtimebox();
        this.createsparkle();
        this.createbtn();
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
        this.checktickervisiblity();
        this.physics.world.setFPS(60);
    },

    //update function
    update: function(){
        if(this.fpsmeter_lbl){
            this.fpsmeter_lbl.text = Math.floor(this.game.loop.actualFps);
        }
    },

}