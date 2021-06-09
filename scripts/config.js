const APPCONFIG = {
    ID: "CONFIG1",
    //MENU BUTTONS
    MENU: {
        BTN: {
            ID:"MBUTTONS",
            ANIM_TIME: 0.1,
            PATH: "assets/sprite/common/buttons.png",
            JSON: "assets/sprite/common/buttons.json",
            POS: {
                HOME:{
                    NAME:"home.png",
                    X: 0.05, // 0.16% of stage width
                    Y: 0.10,  // 0.09% of stage height
                },
                REPLAY:{
                    NAME:"replay.png",
                    X: 0.145,
                    Y: 0.10,
                },
                CLOSE:{
                    NAME:"close.png",
                    X: 0.935,
                    Y: 0.10,
                }
            }
        },
    },
    //TIMER
    GTIMER: {
        ID: "GTIMER",
        NAME: "timer.png",
        POS:{
            X: 0.82,
            Y: 0.10,
        },
        FONT: {
            ID: "ROBOTO-BOLD-BLACK",
            PATH: "assets/fonts/Roboto_Bold_Black.png",
            XML: "assets/fonts/Roboto_Bold_Black.xml"
        },
    },
    //GAME SPARKLE
    SPARKLE: {
        ID: "SPARKLE",
        PATH: "assets/sprite/common/sparkle.png",
        JSON: "assets/sprite/common/sparkle.json",
        FRAME_RATE: 8, //ANIMATION SPEED
    },
    //CELEBRATION
    CELEBRATION: {
        ANIMATION:{
            ID: "CELEBRATION",
            PATH: "assets/sprite/common/celebration.png",
            JSON: "assets/sprite/common/celebration.json",
        },
        SOUNDS: {
            MAIN: { ID: "CELEBRATION", PATH: "assets/sounds/common/celebration.mp3", VOLUME: 0.6 }
        }
    },
    //SUMMARY WINDOW
    SUMMARY: {
        ID:"SUMMARY",
        DELAY: 2000, //Delay on showing summary window
        NEGATIVE_HIDE_TIME: 5000,
        POSITIVE_HIDE_TIME: 8000,
        BG_ALPHA: 0.8,
        PATH: "assets/sprite/common/summary.png",
        JSON: "assets/sprite/common/summary.json",
        SOUNDS: {
            CORRECT1: { ID: 'CORRECT1', PATH: "assets/sounds/common/FGSummary.m4a" },
            WRONG1: { ID: 'WRONG1', PATH: "assets/sounds/common/VOTryAgain.m4a" }
        },
        FONTS: {
            ROBOTO_REG: {
                ID: "ROBOTO-REG",
                PATH: "assets/fonts/Roboto_Reg.png",
                XML: "assets/fonts/Roboto_Reg.xml"
            },
            ROBOTO_BOLD: {
                ID: "ROBOTO-BOLD",
                PATH: "assets/fonts/Roboto_Bold.png",
                XML: "assets/fonts/Roboto_Bold.xml"
            }
        },
    }
}