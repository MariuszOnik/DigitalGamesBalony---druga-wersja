

//this.frames = this.g.frames(Balon.path, Balon.framesCoordinate, Balon.width, Balon.height)
//this.graphic =  hexi.sprite(this.frames)

/*  soundEffect(
    1046.5,           //frequency
    0,                //attack
    0.3,              //decay
    "sawtooth",       //waveform
    1,                //Volume
    -0.8,             //pan
    0,                //wait before playing
    1200,             //pitch bend amount
    false,            //reverse bend
    0,                //random pitch range
    25,               //dissonance
    [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
    undefined         //reverb: [duration, decay, reverse?]
    3                 //Maximum duration of sound, in seconds
  );
*/

function Balon(hexi, color = 0){
    
    this.frames = hexi.frames(this.path, this.framesCoordinate, this.frameWidth, this.frameHeight)
    this.graphic = hexi.sprite(this.frames)
    
    this.color = color 
    this.startX = 0
    this.startY = 0

    this.reset = function(){
        this.graphic.x = this.startX;
        this.graphic.y = this.startY; 
        this.graphic.rotation = 0; 
        //let newColor = hexi.randomInt(0,4)

        
        //this.color = newColor
        //this.ChangeColor(newColor)
        this.show()
    }

    this.graphic.interact = true; 

     this.graphic.setPivot(0.5, 0.5)
    // this.graphic.anchor.x = -1
    // this.graphic.anchor.y = -1

    this.isActive =  () => {
        return this.graphic.visible
    }

    this.graphic.tap = (()=>{

       //this.wrongTouch();
       //let idSound = hexi.randomInt(0, this.soundEfectTable.length -1)
       //console.log(idSound)
       //this.soundEfectTable[3].play()


    })

    this.soundEfect = {
        poping1 :  hexi.sound(this.soundPath[1]),
        poping2 :  hexi.sound(this.soundPath[2]),
        poping3 :  hexi.sound(this.soundPath[3]),
        poping4 :  hexi.sound(this.soundPath[4]),
        poping5 :  hexi.sound(this.soundPath[5]),
        poping6 :  hexi.sound(this.soundPath[6]),
        error: hexi.sound(this.soundPath[7])
        
    }

    this.test = function*(balon){
        
        
        while (balon.graphic.y < 1000) {

            balon.graphic.y +=1
            yield 
            
        }
        balon.graphic.y = 20
        
    }
    this.iterator = this.test(this)

 

    this.soundEfect.poping1.loop = false; 
    //this.soundEfect.error.loop = false;
    
    this.ChangeColor = ((color)=>{
        this.graphic.show(color)
    })

    this.soundEfectTable = [
        this.soundEfect.poping1, this.soundEfect.poping2,this.soundEfect.poping3,this.soundEfect.poping4,this.soundEfect.poping5,this.soundEfect.poping6
    ]

    this.wrongTouch = () =>{
       this.soundEfect.error.play()
        hexi.wobble(
            this.graphic, //sprite
            1.1,      //scaleFactorX
            1.1,     //scaleFactorY
            1,     //frames
            5,   //xStartMagnitude
            5,    // xEndMagnitude
            -5,  //yStartMagnitude
            -5,  //yEndMagnitude
            0.94, //friction
            true, //yoyo
            0, //delayBeforeRepeat
            ); 

            //this.ChangeColor(this.color++)
           
            //this.graphic.visible = false; 
            //g.wait(100, () => this.graphic.visible = false)
            //g.wait(1000, () => this.graphic.visible = true);
    }

    this.graphic.show(this.color)

    this.hide = () =>{
        //this.graphic.enabled = false; 
        this.graphic.visible = false; 
    }
    this.show = () =>{
        this.graphic.visible = true
    }
    
    
}

Balon.prototype.path = "./img/balons4.png";
Balon.prototype.soundPath = [
    "./sound/BalloonPopping/1.mp3",
    "./sound/BalloonPopping/2.mp3",
    "./sound/BalloonPopping/3.mp3",
    "./sound/BalloonPopping/4.mp3",
    "./sound/BalloonPopping/5.mp3",
    "./sound/BalloonPopping/6.mp3",
    "./sound/BalloonPopping/7.mp3",
    "./sound/error.mp3"
]

Balon.prototype.ColorsMap = {
    red:0,
    green: 1,
    blue: 2,
    yellow: 3,
    orange: 4,
    pink: 5
    
}

Balon.prototype.framesCoordinate = [[0,0], [216,0], [432,0], [648,0], [864,0], [1080, 0]]; 
Balon.prototype.frameWidth = 216; 
Balon.prototype.frameHeight = 256; 

