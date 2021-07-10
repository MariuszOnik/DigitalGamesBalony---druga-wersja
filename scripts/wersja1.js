






var  g = hexi(1920, 1080, setup, [
    "./img/czerwonyBalon.png",
      "./img/zielonyBalon.png",
      "./img/niebieskiBalon.png",
      "./img/pomaranczowyBalon.png",
      "./img/zoltyBalon.png",
      "./img/TM.png",
      "./img/touchEfect.png",
      "./img/exit.png",
      "./img/balons2.png",
      "./sound/BalloonPopping/1.mp3",
    "./sound/BalloonPopping/2.mp3",
    "./sound/BalloonPopping/3.mp3",
    "./sound/BalloonPopping/4.mp3",
    "./sound/BalloonPopping/5.mp3",
    "./sound/BalloonPopping/6.mp3",
    "./sound/BalloonPopping/7.mp3"

  ], load);
  
  function load(){
    g.loadingBar();
  }
  
  g.start();
  
  
  g.fps = 30; 
  //Set the background color and scale the canvas
  g.backgroundColor = "rgb(78, 134, 236)";
  //g.border = "2px red dashed";
  g.scaleToWindow();


  let allBallonsGroup,
        StartPositionX,
        StartPositionY,
        ALL,
        DominateColor,
        Flag;  

  function setup(){

    StartPositionX = g.canvas.width/2 - (g.canvas.width/4 )
    StartPositionY = g.canvas.height/2 - ( g.canvas.height/4)
    allBallonsGroup = g.group()
    DominateColor = 0 ;

    Flag = false; 

    ALL = []

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 5; x++) {

            let newBalon = new Balon(g, g.randomInt(0,4))
                

            newBalon.graphic.setPosition(StartPositionX + (x * newBalon.graphic.width) + (x * 20), StartPositionY + (y * newBalon.graphic.height) + (y * 10)); 
            newBalon.startX = StartPositionX + (x * newBalon.graphic.width) + (x * 20);
            newBalon.startY = StartPositionY + (y * newBalon.graphic.height) + (y * 10)
            allBallonsGroup.addChild(newBalon.graphic); 

            newBalon.graphic.rotation = 0.1;
            ALL.push(newBalon)

        }
    }



    g.pointer.tap = function () {
      
        let allDominatecolors = []

        ALL.forEach(element => {
            if(element.color === DominateColor){
              allDominatecolors.push(element)
            }
        });

        ALL.forEach(element => {
          
          let licznik = 0
          let randomInterval = 0
                if(g.hitTestPoint(g.pointer.position, element.graphic) && Flag == true){

                        console.log("This color = " + element.color)
                        if(element.color === DominateColor && element.isActive()){
                            allDominatecolors.forEach(element => {
                                  let randomSnd = g.randomInt(1,2)
                                  g.wait(randomInterval, () => {
                                        element.soundEfectTable[randomSnd].play()
                                        licznik += 1
                                        g.createParticles(
                                              element.graphic.x,                             //The particle’s starting x position
                                              element.graphic.y,                             //The particle’s starting y position
                                              () => g.sprite("./img/star.png"),       //Particle function
                                              g.stage,                                 //The container group to add it to
                                              10,                                      //Number of particles
                                              0.5,                                     //Gravity
                                              true,                                    //Random spacing
                                              0, 6.28,                                 //Min/max angle
                                              10, 20,                                  //Min/max size
                                              5, 10,                                    //Min/max speed
                                              0.005, 0.01,                             //Min/max scale speed
                                              0.005, 0.01,                             //Min/max alpha speed
                                              0.05, 0.1 )                             //Min/max rotation speed);
                                        //g.createParticles(element.graphic.x, element.graphic.y, function () {
                                          //return g.sprite("./img/star.png");
                                        //}, g.stage, 300);
                                        element.hide()
                                        console.log(licznik)

                                        if(licznik == allDominatecolors.length){
                                          console.log(licznik)

                                          allBallonsGroup.setPosition(0,1080);
                                          //g.wait(1000, ()=>{
                                            ALL.forEach(element => {
                                              element.reset()
                                          })
                                          
                                          //})
                                         
                                        }
                                  });
                                  randomInterval += g.randomInt(100,150)

                                  

                                  
                            });

                            
                            //DominateColor = g.randomInt(0,4)
                            console.log("Kolor : " + DominateColor)
                            
                        }else{
                            element.wrongTouch()
                        }
                }
          
        });

        
    };



    g.state = update;

    allBallonsGroup.setPosition(0,1080)
    allBallonsGroup.vy = -70
  }

  function update(){

        //ALL[0].iterator.next(ALL[0])
        

        ALL.forEach(element => {

             //ran = 0.01

           
             let p = g.randomFloat(-0.5, 0.5)
              let  ran = g.randomFloat(-0.005, 0.005)
               element.graphic.rotation += ran
               element.graphic.x +=  p ;
               element.graphic.y +=  p ;
        })


        if(allBallonsGroup.position.y > 0 ){
            g.move(allBallonsGroup)
            
            Flag = false
        }else{
          Flag = true; 
        }

  }
  







