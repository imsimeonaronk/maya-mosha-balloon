//GLOBAL Variable
let Global = {}

//Property
Global.debug = false;
Global.debugfps = false;

//Method
Global.Log = function(msg){
    if(this.debug){
        console.log(msg);
    }
}

Global.Shuffle = function (array) {
    if(array.length > 0){
        array.sort(() => Math.random() - 0.5);
    }
}

Global.GetRandomInt = function(max){
    return (Math.floor(Math.random() * max));
}

Global.GetRandomArbitrary = function(min, max){
    return Math.random() * (max - min) + min;
}

Global.GetLength = function(arr){
    let cnt = 0;
    if(arr != null){
        for(const key in arr){
            cnt = cnt + 1;
        }
    }
    return cnt;
}

Global.GetLetterData = function(dict, txt){
    if( dict != null && dict[txt] != null ){
        return dict[txt];
    }
    return txt;
}

Global.GetImageData = function(dict, txt){
    if( dict != null && dict[txt] != null ){
        return dict[txt];
    }
    return txt;
}

Global.CloneArray = function(array){
    let clone = array.map(a => {return {...a}});
    return clone;
}

Global.Split = function (str, seperator) {
    if(seperator != null){
        return str.split(seperator);
    }
}