

/*
Learn to create sprites that you can drag and drop
with the mouse or touch
*/

/* 
lerp(20, 80, 0)   // 20
lerp(20, 80, 1)   // 80
lerp(20, 80, 0.5) // 40 
*/
const lerp = (x, y, a) => x * (1 - a) + y * a;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


GameColors =[
  "rgb(225,81,65)", //czerwony: 
  "rgb(84,185,121)", //zielony: 
 "rgb(78,134,236)", // niebieski : 
  "rgb(247, 194, 68)", //zolty:
   "rgb(239, 121, 52)", //pomaranczowy:
   
]
const randomUnique = (range, count) => {
  let nums = new Set();
  while (nums.size < count) {
      nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
  }
  return [...nums];
}



function GetDistanceTo(a,b){

  var vx = a.x  - b.x ; 
  var vy = a.y  - b.y ; 
  return Math.sqrt(vx * vx + vy * vy);
}




function  LosujKolory(balony) {
    

  let pierwsze6 = randomUnique(balony.length, 6)

  console.log(pierwsze6)

  let color = 0;//red

  for (let index = 0; index < pierwsze6.length; index++) {
      balony[pierwsze6[index]-1].color = color;
      balony[pierwsze6[index]-1].graphic.show(color)
        
      console.log(" Index : " + (pierwsze6[index] -1) + "  KOLOR " + color)
      color+=1;
  }

  for (let index = 0; index < balony.length; index++) {
      
      
      if( index == pierwsze6[0]-1 ||  index == pierwsze6[1]-1 || index == pierwsze6[2]-1|| index == pierwsze6[3]-1 || index == pierwsze6[4]-1 || index == pierwsze6[5]-1  ){
        //balony[index].
    

      }else{

           let nowyKolor = g.randomInt(0,5)
           balony[index].color = nowyKolor
           balony[index].graphic.show(nowyKolor)
       }

  }

}

var  g = hexi(1920, 1080, setup, [
    "./img/czerwonyBalon.png",
      "./img/zielonyBalon.png",
      "./img/niebieskiBalon.png",
      "./img/pomaranczowyBalon.png",
      "./img/zoltyBalon.png",
      "./img/TM.png",
      "./img/touchEfect.png",
      "./img/exit.png",
      "./img/balons4.png",
      "./sound/BalloonPopping/1.mp3",
    "./sound/BalloonPopping/2.mp3",
    "./sound/BalloonPopping/3.mp3",
    "./sound/BalloonPopping/4.mp3",
    "./sound/BalloonPopping/5.mp3",
    "./sound/BalloonPopping/6.mp3",
    "./sound/BalloonPopping/7.mp3",
    "./img/puchar2.png",
    "./sound/error.mp3",
    "./img/home.png"

  ], load);
  
  function load(){
    g.loadingBar();
  }
  
  g.start();
  
  
  g.fps = 30; 
  //Set the background color and scale the canvas
  g.backgroundColor = "rgb(78, 50, 50)";
  //g.border = "2px red dashed";
  g.scaleToWindow();


  let allBallonsGroup,
        StartPositionX,
        StartPositionY,
        ALL,
        DominateColor,
        Flag, 
        licznikZbitychBalonikow = 0, 
        informatorKolorow, 
        informatorKolorowRamka, 
        licznikPunktow,
        znakFirmy,
        startTime , 
        endTime ,
        progresBarGenerator, 
        gameRune = true,
        GeneratorStart, 
        colorWynikuPlanszy = "rgb(248,194,68)",
        planszaWyniku,
        wynikGroup,
        napisKoncowy, 
        gwiazdkiKoncowe, 
        karnePunkty,
        puchar,
        czasGry,
        informatorKolorowSwich,
        homeButton; 

  function setup(){

    czasGry = 30000
    wynikGroup = g.group()

    homeButton = g.sprite("./img/home.png")
    
    homeButton.setPosition(1600, 100)

    homeButton.visible = false; 

    homeButton.setPivot(0.5, 0.5)

    homeButton.tap = ()=>{
      if(homeButton.visible == true){
        window.location.reload()
      }
      
    }

    


    karnePunkty = 3; 
   informatorKolorowSwich = 1; 
    planszaWyniku = g.rectangle(1920,1080, colorWynikuPlanszy)
    //planszaWyniku.visible = false; 

    /*



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
                              0.05, 0.1 )    
    */



    gwiazdkiKoncowe = g.particleEmitter(
      100,                                   //The interval, in milliseconds
      () => g.createParticles(               //The `createParticles` method
        960,
        400,
        () => g.sprite("./img/star.png"),
        g.stage,
        5,
        0.5,
        true,
        0, 6.28,                                 //Min/max angle
        15, 30,                                  //Min/max size
        5, 10,                                    //Min/max speed
        0.005, 0.01,                             //Min/max scale speed
        0.005, 0.01,                             //Min/max alpha speed
        0.05, 0.1     

      )
    );
    puchar = g.sprite("./img/puchar2.png")

    
    wynikGroup.addChild(planszaWyniku, puchar)

    puchar.setPivot(0.5, 0.5)
    puchar.setScale(0.5,0.5)
    wynikGroup.putCenter(puchar,0)
    wynikGroup.visible = false; 
    
    progresBarGenerator = function *(bar, st) {
  
      let ST = st
      let CT = Date.now() - ST
      while (CT < czasGry) {
       
        bar.inner.width =lerp(0,1920, (CT/czasGry))
        CT = Date.now() - ST
        yield 
        
      }
        gameRune = false
        console.log( bar.inner.width)
        bar.inner.width = 0 

        g.state = pokazWynik; 
        allBallonsGroup.visible = false;
        informatorKolorow.graphic.visible = false; 
        wynikGroup.visible = true; 
        puchar.putCenter(licznikPunktow, 20)
        //licznikPunktow.setPosition(930, 540)
        licznikPunktow.setPivot(0.5, 0.5)
        gwiazdkiKoncowe.play();
        healthBar.visible = false; 
        napisKoncowy.visible = true; 
        Flag = false; 
        g.breathe(licznikPunktow, 1.5, 1.5, 30, true, 0);
        
         
        homeButton.visible = true; 

        homeButton.visible = true; 
        homeButton.interact = true; 
        homeButton.setPivot(0.5, 0.5)
        g.breathe(homeButton, 1.5, 1.5, 30, true, 0);
        //GeneratorStart = progresBarGenerator(bar, Date.now())

    }

    


    //PASEK CZASU
    outerBar = g.rectangle(1920, 40, "gray"),
    innerBar = g.rectangle(1920, 40, "rgb(84,185,121)");

      //Group the inner and outer bars
      healthBar = g.group(outerBar, innerBar);

      //Set the `innerBar` as a property of the `healthBar`
      healthBar.inner = innerBar;

      //Position the health bar
      healthBar.x = 0;
      healthBar.y = 1040;

      healthBar.inner.width = 0;


      


    znakFirmy = g.sprite("./img/TM.png")
    znakFirmy.setPivot(0.5, 0.5)
    znakFirmy.setPosition(200, 100)
    licznikPunktow = g.text("12", "bold 70px Verdana", "white", "center");

    napisKoncowy =  g.text("Brawo! Oto liczba zdobytych przez Ciebie punktów.", "bold 60px Verdana", "black");
    napisKoncowy.setPosition(70, 900)
    napisKoncowy.visible = false; 
    licznikPunktow.content  = 0
    licznikPunktow.setPosition(147, 400)

    StartPositionX = g.canvas.width/2 - (g.canvas.width/4 )
    StartPositionY = g.canvas.height/2 - ( g.canvas.height/4)
    allBallonsGroup = g.group()
    DominateColor = g.randomInt(0,5)

    Flag = false; 

    ALL = []


    
    //informatorKolorowRamka = g.circle(170, "white")
    informatorKolorow = new Balon(g, DominateColor)

    //informatorKolorow.graphic.setPivot(0.5, 0.5)
    informatorKolorow.graphic.setScale(0.5, 0.5)

    

    
    // informatorKolorowRamka.setPivot(0.5, 0.5)
    
    //setPosition(g.canvas.width - 192, 400)
    // informatorKolorow.fillStyle = GameColors[0]; 
    informatorKolorow.graphic.setPosition(180, 250)
    informatorKolorow.graphic.interact = false
    //g.breathe(informatorKolorow.graphic, 0.4, 0.4, 5, true, 0);

    //informatorKolorowRamka.addChild(informatorKolorow)
    

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 5; x++) {

            //let newBalon = new Balon(g, g.randomInt(0,4))
            let newBalon = new Balon(g)
                

            newBalon.graphic.setPosition(StartPositionX + (x * newBalon.graphic.width) + (x * 20), StartPositionY + (y * newBalon.graphic.height) + (y * 10)); 
            newBalon.startX = StartPositionX + (x * newBalon.graphic.width) + (x * 30);
            newBalon.startY = StartPositionY + (y * newBalon.graphic.height) + (y * 40)
            allBallonsGroup.addChild(newBalon.graphic); 

            newBalon.graphic.rotation = 0.1;

            //let ramka = g.rectangle(newBalon.graphic.width, newBalon.graphic.height, "rgba(44,544,44,0.1)", "pink", 5)
            //ramka.x = newBalon.graphic.x
            //ramka.y = newBalon.graphic.y

            ALL.push(newBalon)

        }
    }

    LosujKolory(ALL); 




   
    g.pointer.tap = function () {
      
        let allDominatecolors = []

        ALL.forEach(element => {
            if(element.color === DominateColor){
              allDominatecolors.push(element)
            }
        });

        let licznikWszystkichwDanymKolorze = allDominatecolors.length;

        ALL.forEach(element => {
          
          
          let randomInterval = 0
                var test = {
                  width: element.graphic.width, 
                  height: element.graphic.height +20 ,
                  x: element.graphic.x + 22,
                  y: element.graphic.y - 80 , 
                  xAnchorOffset: element.graphic.xAnchorOffset,
                  yAnchorOffset: element.graphic.yAnchorOffset ,
                  radius : false
                }
              
                //console.log(test)
                if(g.hitTestPoint(g.pointer.position, test) && Flag == true){

                  //alert(test)
                        //console.log("This color = " + element.color)
                        if(element.color === DominateColor && element.isActive() == true){

                         
                            /* allDominatecolors.forEach(element => {
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
                                              LosujKolory(ALL)
                                              element.reset()
                                          })
                                          
                                          //})
                                         
                                        }
                                  });
                                  randomInterval += g.randomInt(100,150)

                                  

                                  
                            }); */

                            
                            //DominateColor = g.randomInt(0,4)
                            let randomSnd = g.randomInt(1,2)
                            element.soundEfectTable[randomSnd].play()
                            licznikZbitychBalonikow += 1; 
                            licznikPunktow.content = parseInt(licznikPunktow.content) + 1; 

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


                        //console.log(element.isActive())

                        if(licznikZbitychBalonikow == licznikWszystkichwDanymKolorze){

                          allBallonsGroup.setPosition(0,1080);

                          ALL.forEach(element => {
                            
                            element.reset()
                          })

                          LosujKolory(ALL)

                          licznikZbitychBalonikow = 0; 

                          

                          DominateColor = g.randomInt(0,5)

                          

                          informatorKolorow.color = DominateColor; 
                          informatorKolorow.ChangeColor(DominateColor)
                          g.charm.globalTweens.length = 0; 

                          

                        }

                              //alert("JUZ ZBITO " + licznikZbitychBalonikow + " BALONIKOW")
                            //console.log("Kolor : " + DominateColor)

                            //alert("W Kolorze Czerwonym jest " + licznikWszystkichwDanymKolorze + " Balonikow a pozostalo : " + licznik)
                            
                        }else{
                            element.wrongTouch()



                            if(element.isActive()){
                              licznikPunktow.content = parseInt(licznikPunktow.content) - karnePunkty; 
                            }
                             

                        }
                }
          
        });

        
    };


    startTime = Date.now() ;
    endTime = startTime + 30000
    allBallonsGroup.setPosition(0,1080)
    allBallonsGroup.vy = -70

    GeneratorStart = progresBarGenerator(healthBar, Date.now())
    g.state = update;

   
  }

  function update(){

        //ALL[0].iterator.next(ALL[0])
        

        /* ALL.forEach(element => {

             //ran = 0.01

           
             let p = g.randomFloat(-0.5, 0.5)
              let  ran = g.randomFloat(-0.005, 0.005)
               element.graphic.rotation += ran
               element.graphic.x +=  p ;
               element.graphic.y +=  p ;


               let distanceToStart = GetDistanceTo(element.graphic, {x: element.startX, y: element.startY })
               if (distanceToStart >= 1){
                    element.graphic.x = element.startX; 
                    element.graphic.y = element.startY
               }

          }) */


        if(allBallonsGroup.position.y > 0 ){
            g.move(allBallonsGroup)
            
            Flag = false
        }else{
          Flag = true; 
        }


        GeneratorStart.next(endTime, healthBar)

        if(informatorKolorow.graphic.visible == true   ){
              informatorKolorow.graphic.scale.x += 0.008 * informatorKolorowSwich
              informatorKolorow.graphic.scale.y += 0.008  * informatorKolorowSwich

                if(informatorKolorow.graphic.scale.x > 0.7){
                   informatorKolorowSwich = informatorKolorowSwich * -1
                }
                if(informatorKolorow.graphic.scale.x < 0.5){
                  informatorKolorowSwich = informatorKolorowSwich * -1
               }
        }

  }


  function pokazWynik(){


   // if(g.pointer.isDown){
      //if(g.hitTestPoint( g.pointer.position, planszaWyniku)){
      
        //g.wait(2000, ()=>{
          
        //})
        //console.log("DUPA")
            
      //}
    //}
    
      //g.pulse(licznikPunktow, 120, 0.3);
      //g.breathe(licznikPunktow, 1.4, 1.4, 60, true, 300);


      

  }
  







