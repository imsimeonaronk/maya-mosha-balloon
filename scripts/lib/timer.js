//NEW GAME TIMER
let GTimer = {}

//VARIABLE
let thisclass = this;

//PROPERTY
GTimer.view = null;
GTimer.time = null;
GTimer.timer = null;
GTimer.scene = null;
GTimer.initialtime = 0;
GTimer.phase = "init";

//FUNCTIONS
let resettime = function(){
    GTimer.initialtime = 0;
    GTimer.phase = "init";
}

let padnumber = function(num){
    return ( '0' + num ).substr( -2 );
}

let updatelabel = function(val){
    if(GTimer.view){
        GTimer.view.last.text = padnumber(val || 0);
    }
}

let calculatetime = function(){
    GTimer.initialtime --;
    if(GTimer.initialtime <= 0 ){
        GTimer.initialtime = 0;
        if(GTimer.phase != "stop"){
            GTimer.Stop();
            GTimer.scene.challengetimeend();
        }
    }
    updatelabel(GTimer.initialtime);
}

//METHOD
GTimer.Init = function(params){
    if(params){
        if(params.view){
            this.view = params.view;
        }
        if(params.time){
            this.time = params.time;
            this.initialtime = this.time;
        }
        if(params.scene){
            this.scene = params.scene;
        }   
        updatelabel(this.time);
    }
}

GTimer.UpdateTime = function(time){
    if(time){
        this.time = time;
        this.initialtime = this.time;
        updatelabel(this.time);
    }
}

GTimer.Start = function(){
    if(this.timer == null){
        Global.Log("Game Timer Started");
        this.phase = "start";
        this.timer = this.scene.time.addEvent({
            delay: 1000,               
            callback:(event)=>{
                calculatetime();
            },
            loop: true,
        });
    }
}

GTimer.Stop = function(){
    if(this.timer){
        Global.Log("Game Timer Stopped");
        this.phase = "stop";
        this.timer.remove();
        this.scene.time.removeEvent(GTimer.timer);
        this.timer = null;
    }
}

GTimer.Pause = function(){
    if(this.timer && !this.timer.paused){
        this.phase = "pause";
        this.timer.paused = true;
    }
}

GTimer.Resume = function(){
    if(this.timer && this.timer.paused){
        this.phase = "resume";
        this.timer.paused = false;
    }
}

GTimer.Reset = function(){
    resettime();
}

GTimer.GetTime = function(){
    if(this.time && this.initialtime){
        let timev = this.time - this.initialtime;
        if(timev < 0){ 
            timev = 0;
        }
        return timev;
    }
    return 0;
}

GTimer.GetTimePercent = function(){
    let timev = this.GetTime();
    if(timev > 0){
        return Math.floor((timev/this.time) * 100);
    }
    return 0;
}