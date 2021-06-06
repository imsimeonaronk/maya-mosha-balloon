KGames.Summary = function(){};

//Prototype
KGames.Summary.prototype = {


    // Functions //

    // Variable Declaration
    declarevariable: function(data){
        //Boolean
        this.showceleb_bol = data.showcelebration;
        this.challenge_bol = false;
        this.challengelast_bol = data.cflag;

        //Value
        this.swidth_val = this.game.config.width; // stage width
        this.sheight_val = this.game.config.height; // stage height
        this.centerx_val = this.swidth_val * 0.5;
        this.centery_val = this.sheight_val * 0.5;
        this.score_val = data.score;
        this.scorepercent_val = data.percent;
        this.scenehidetime_val = null;
        this.scoreflag_val = data.flag;

        //Group
        this.frame_grp = this.add.container();

        //Boolean
        this.islast_bol = data.last;

        //Scene
        this.parent_scn = data.scene;

        //Sound
        this.correct1_snd = null;
        this.wrong1_snd = null;
        this.celebration_snd = null;

        //Animation
        this.celebrate_anim = null;

        //Timer
        this.scenehide_tmr = null;
    },

    //FUNCtiONS
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
                repeat: 0
            })
        }
    },
    
    callsceneclose: function(){
        let thisclass = this;
        this.scenehide_tmr = this.time.addEvent({
            delay: this.scenehidetime_val,               
            callback:()=>{
                thisclass.closethisscene();
            },
            loop: false,
        });
    },

    callnextwindow: function(){
        this.scenehide_tmr = this.time.addEvent({
            delay: this.scenehidetime_val,               
            callback:()=>{
                this.showcelebration(false);
                this.nextframe();
            },
            loop: false,
        });
    },
    
    closethisscene: function(flag){
        this.stopallsound();
        this.registry.destroy();
        this.events.off();
        this.scene.stop();
        if(this.scenehide_tmr){
            this.scenehide_tmr.remove();
            this.time.removeEvent(this.scenehide_tmr);
        }
        if(this.parent_scn){
            this.parent_scn.startchallenge({
                flag: this.challenge_bol
            })
        }
    },

    //Clear group
    removegroup: function(){
        if(this.frame_grp){
            this.frame_grp.remove(true);
            this.frame_grp.destroy(true);
            this.frame_grp = null;
            this.frame_grp = this.add.group();
        }
    },

    //Scale image
    scaleimage: function(tpe,obj){
        if(obj){
            if(tpe == 'negative'){
                if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                    obj.setScale((1 / obj.height) * this.sheight_val * 0.6);
                } else {
                    obj.setScale((1 / obj.width) * this.swidth_val * 0.28);
                }
            }else if(tpe == 'next'){
                if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                    obj.setScale((1 / obj.height) * this.sheight_val * 0.5);
                } else {
                    obj.setScale((1 / obj.width) * this.swidth_val * 0.22);
                }
            }else if(tpe == 'positive'){
                if (this.swidth_val / this.sheight_val > 1920 / 1080) {
                    obj.setScale((1 / obj.height) * this.sheight_val * 0.48);
                } else {
                    obj.setScale((1 / obj.width) * this.swidth_val * 0.27);
                }
            }
        }
    },

    //Add sound
    addaudio: function(){
        this.correct1_snd = this.sound.add(APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.SOUNDS.CORRECT1.ID);
        this.wrong1_snd = this.sound.add(APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.SOUNDS.WRONG1.ID);
        if(APPCONFIG.CELEBRATION && APPCONFIG.CELEBRATION.SOUNDS){
            this.celebration_snd = this.sound.add(APPCONFIG.ID+"-"+APPCONFIG.CELEBRATION.SOUNDS.MAIN.ID);
        }
    },

    playcorrectsnd: function(){
        this.correct1_snd.play();
    },

    stopcorrectsnd: function(){
        this.correct1_snd.stop();
    },

    playwrongsnd: function(){
        this.wrong1_snd.play();
    },

    stopwrongsnd: function(){
        this.wrong1_snd.stop();
    },

    playcelebrationsnd: function(){
        if(this.celebration_snd){
            if(APPCONFIG.CELEBRATION.SOUNDS.MAIN.VOLUME){
                this.celebration_snd.volume = APPCONFIG.CELEBRATION.SOUNDS.MAIN.VOLUME;
            }
            this.celebration_snd.play();
        }
    },
    
    stopcelebrationsnd: function(){
        if(this.celebration_snd){
            this.celebration_snd.stop();
        }
    },

    stopallsound: function(){
        this.stopcelebrationsnd();
        this.stopcorrectsnd();
        this.stopwrongsnd();
    },

    //CELEBRATION
    showcelebration: function(flag){
        if(this.celebrate_anim){
            if(flag){
                this.celebrate_anim.setVisible(true);
                this.celebrate_anim.start();
                this.playcelebrationsnd();
            }else{
                this.celebrate_anim.setVisible(false);
                this.celebrate_anim.stop();
            }
        }
    },

    createcelebration: function(){
        if(APPCONFIG.CELEBRATION && APPCONFIG.CELEBRATION.ANIMATION){
            let particles = this.add.particles(APPCONFIG.ID+"-"+APPCONFIG.CELEBRATION.ANIMATION.ID);
            this.celebrate_anim = particles.createEmitter({
                frame: ['celebration1.png', 'celebration2.png', 'celebration3.png', 'celebration4.png', 'celebration5.png', 'celebration6.png', 'celebration7.png', 'celebration8.png', 'celebration9.png', 'celebration10.png', 'celebration11.png', 'celebration12.png'], 
                x: { min: 0, max: this.swidth_val },
                y: 0,
                lifespan: 2500,
                speedY: { min: Math.floor(this.sheight_val * 0.3), max: Math.floor(this.sheight_val*0.6) },
                scale: { start: 0.5, end: 1 },
                blendMode: 'NORMAL',
                on: false,
                accelerationY: 10,
                alpha: 0.8,
                quantity: 1,
                frequency: 40,
                rotate: { start: 0 , end: 360 }
            });
            this.celebrate_anim.setVisible(false);
        }
    },

    // POSITIVE FRAME
    positiveframe: function(){
        this.removegroup();

        let baserect = this.add.rectangle(0, 0, this.swidth_val, this.sheight_val);
        baserect.setPosition(this.centerx_val, this.centery_val);
        baserect.setFillStyle(0x000000);
        baserect.alpha = APPCONFIG.SUMMARY.BG_ALPHA;
        baserect.setInteractive();
        this.frame_grp.add(baserect);

        let mousa = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "mosha_happy.png");
        this.scaleimage('positive',mousa);
        mousa.setPosition(this.centerx_val - mousa.displayWidth * 0.9, this.centery_val + mousa.displayHeight * 0.18);
        this.frame_grp.add(mousa);

        let congrat = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "congratulations.png");
        congrat.setScale((1 / congrat.width) * mousa.displayWidth * 1);
        congrat.setPosition(this.centerx_val, this.centery_val - congrat.displayHeight * 2.5);
        this.frame_grp.add(congrat);

        let fntsize = Math.floor( 0.09 * mousa.displayHeight )

        let textlbl1 = this.add.bitmapText(0, 0, APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.FONTS.ROBOTO_REG.ID, "You have earned", fntsize);
        textlbl1.setOrigin(0.5);
        textlbl1.setPosition(congrat.x, congrat.y + congrat.displayHeight * 1);
        this.frame_grp.add(textlbl1);

        let textlbl2 = this.add.bitmapText(0, 0, APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.FONTS.ROBOTO_BOLD.ID, (this.score_val || "").toString() + " Aha!", fntsize);
        textlbl2.setOrigin(1,0.5);
        textlbl2.setPosition(congrat.x, textlbl1.y + Math.floor(textlbl1.height * 1.3));
        this.frame_grp.add(textlbl2);

        let textlbl3 = this.add.bitmapText(0, 0, APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.FONTS.ROBOTO_BOLD.ID, " Points", fntsize);
        textlbl3.setOrigin(0,0.5);
        textlbl3.setPosition(congrat.x, textlbl2.y);
        this.frame_grp.add(textlbl3);

        let sx = 0, sy = 0;
        let stargrp_ctr = this.add.container();
        for(let i=0; i<3; i++){
            let star_ctr = this.add.container();
                let out = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "star_white.png");
                out.setScale((1 / out.width) * mousa.displayWidth * 0.3);
                let fil = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "star_golden.png");
                fil.setScale((1 / fil.width) * mousa.displayWidth * 0.3);
            star_ctr.add(out)
            star_ctr.add(fil)
            //METHODS
            star_ctr.show = function(flag){
                if(flag){
                    this.first.visible = false;
                    this.last.visible = true;
                }else{
                    this.first.visible = true;
                    this.last.visible = false;
                }
            }
            if(i == 0){ sx = congrat.x - out.displayWidth; sy = textlbl3.y + textlbl3.height * 2.5; }
            if(i == 1){ sx = congrat.x; sy = textlbl3.y + textlbl3.height * 4; }
            if(i == 2){ sx = congrat.x + out.displayWidth; sy = textlbl3.y + textlbl3.height * 2.5; }
            star_ctr.setPosition(sx, sy);
            stargrp_ctr.add(star_ctr);
            star_ctr.show(false);
        }
        this.frame_grp.add(stargrp_ctr);

        //UPDATE STAR
        if(this.scorepercent_val){
            let starcnt = 0;
            if(this.scorepercent_val >= 75){
                starcnt = 3;
            } else if (this.scorepercent_val >= 50) {
                starcnt = 2;
            } else if (this.scorepercent_val > 25) {
                starcnt = 1;
            }
            //UPDATE VISIBLE
            for(let i=0; i<starcnt; i++){
                stargrp_ctr.getAt(i).show(true);
            }
        }

        //PAGE HIDE
        this.scenehidetime_val = APPCONFIG.SUMMARY.POSITIVE_HIDE_TIME;
        if(this.scoreflag_val == 1 && !this.challengelast_bol){
            this.callnextwindow();
        }else{
            this.callsceneclose();
        }
    },

    // NEGATIVE FRAME
    negativeframe: function(){
        this.removegroup();

        let baserect = this.add.rectangle(0, 0, this.swidth_val, this.sheight_val);
        baserect.setPosition(this.centerx_val, this.centery_val);
        baserect.setFillStyle(0x000000);
        baserect.alpha = APPCONFIG.SUMMARY.BG_ALPHA;
        baserect.setInteractive();
        this.frame_grp.add(baserect);

        let mousa = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "mosha_fainting.png");
        this.scaleimage('negative',mousa);
        mousa.setPosition(this.centerx_val + mousa.displayWidth * 0.65, this.centery_val + mousa.displayHeight * 0.15);
        this.frame_grp.add(mousa);

        let ohuh = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "ohuh.png");
        ohuh.setScale((1 / ohuh.width) * mousa.displayWidth * 0.75);
        ohuh.setPosition(this.centerx_val, this.centery_val - ohuh.displayHeight * 1.3);
        this.frame_grp.add(ohuh);

        let tryagain = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "tryagain.png");
        tryagain.setScale((1 / tryagain.width) * mousa.displayWidth * 0.75);
        tryagain.setPosition(ohuh.x, this.centery_val - tryagain.displayHeight * 0.6);
        this.frame_grp.add(tryagain);

        //PAGE HIDE
        this.scenehidetime_val = APPCONFIG.SUMMARY.NEGATIVE_HIDE_TIME;
        this.callsceneclose();
    },

    // NEXT FRAME
    nextframe: function(){
        let thisclass = this;

        this.removegroup();

        let baserect = this.add.rectangle(0, 0, this.swidth_val, this.sheight_val);
        baserect.setPosition(this.centerx_val, this.centery_val);
        baserect.setFillStyle(0x000000);
        baserect.alpha = APPCONFIG.SUMMARY.BG_ALPHA;
        baserect.setInteractive();
        this.frame_grp.add(baserect);

        let mousa = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "mosha_standing.png");
        this.scaleimage('next',mousa);
        mousa.setPosition(this.centerx_val + mousa.displayWidth * 1.2, this.centery_val + mousa.displayHeight * 0.22);
        this.frame_grp.add(mousa);

        let woohoo = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "woohoo.png");
        woohoo.setScale((1 / woohoo.width) * mousa.displayWidth * 1.1);
        woohoo.setPosition(this.centerx_val, this.centery_val - woohoo.displayHeight * 2);
        this.frame_grp.add(woohoo);

        let challenge = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "challenge.png");
        challenge.setScale((1 / challenge.width) * mousa.displayWidth * 1.1);
        challenge.setPosition(woohoo.x, woohoo.y + challenge.displayHeight * 2);
        this.frame_grp.add(challenge);

        let yesbtn = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "yes.png");
        yesbtn.setScale((1 / yesbtn.width) * mousa.displayWidth * 0.8);
        yesbtn.setPosition(woohoo.x, woohoo.y + yesbtn.displayHeight * 2.7);
        yesbtn.isdown = false;
        yesbtn.setInteractive();
        this.frame_grp.add(yesbtn);

        let notbtn = this.add.sprite(0, 0, (APPCONFIG.ID+"-"+APPCONFIG.SUMMARY.ID), "notnow.png");
        notbtn.setScale((1 / notbtn.width) * mousa.displayWidth * 0.8);
        notbtn.setPosition(yesbtn.x, yesbtn.y + notbtn.displayHeight * 1.4);
        notbtn.isdown = false;
        notbtn.setInteractive();
        this.frame_grp.add(notbtn);

        // BTN Interactive
        yesbtn.on('pointerdown', function(pointer, localX, localY, event){
            this.isdown = true;
        });

        yesbtn.on('pointerup', function(pointer, localX, localY, event){
            if(this.isdown){
                Global.Log('BTN: Yes. Go Ahead.');
                this.isdown = false;
                thisclass.challenge_bol = true;
                thisclass.closethisscene();
            }
        });

        notbtn.on('pointerdown', function(pointer, localX, localY, event){
            this.isdown = true;
        });

        notbtn.on('pointerup', function(pointer, localX, localY, event){
            if(this.isdown){
                Global.Log('BTN: Not Now');
                this.isdown = false;
                thisclass.closethisscene();
            }
        });
    },

    // Game Methods //

    //Preload function
    preload: function(){

    },

    //init function
    init: function(){
        
    },

    //create function
    create: function(data){
        this.declarevariable(data);
        this.addaudio();
        if(data.frame == 'next'){
            this.nextframe();
        }else{
            if(this.score_val < 1){
                this.negativeframe();
                this.playwrongsnd();
            }else{
                this.positiveframe();
                this.createcelebration();
                this.playcorrectsnd();
                this.showcelebration(this.showceleb_bol);
            }
        }
    },

    //update function
    update: function(){

    },

}