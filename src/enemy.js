const t = require('three');
const GameView = require('./game_view');
const Item = require('./items');

class Enemy{
    constructor(){
        this.bugsInPath = []
        this.bugPool =[]
        this.items = new Item();
        this.spawnTimer = new t.Clock().start();
    }

  addWorldBugs(ground){
    this.currentGround = ground
    const numBugs=36;
    const gap=6.28/36;
    for(let i=0;i<numBugs;i++){
      this.addBug(false,i*gap, true, this.currentGround);
      this.addBug(false,i*gap, false, this.currentGround);
    }
  }

  addBug(inPath, row, isLeft){
    this.newBug;
    const sphericalHelper = new t.Spherical();
    const worldRadius = 26;
    const pathAngleValues = [1.52,1.57,1.62]
    if(inPath){

      if(this.bugPool.length === 0)return;
        this.newBug = this.bugPool.pop();
        this.newBug.visible = true;
        this.bugsInPath.push(this.newBug);
     
        if(Math.random()>0.5){
        // This handles the starting position of objects relative to the spinning world
        sphericalHelper.set( worldRadius+1, pathAngleValues[row], -this.currentGround.rotation.x+4 );
        }else {
        //// This is for Flying Bugs
        sphericalHelper.set( worldRadius+2, pathAngleValues[row], -this.currentGround.rotation.x+4 );
        }
      }else {
        this.newBug = this.createBug();
        let swarmAreaAngle=0;
      
          if(isLeft){
            swarmAreaAngle=1.68+Math.random()*0.1;
          }else{
            swarmAreaAngle=1.46-Math.random()*0.1;
          }
          sphericalHelper.set( worldRadius+1, swarmAreaAngle, row );
        }

    this.newBug.position.setFromSpherical( sphericalHelper );
    this.groundVector = this.currentGround.position.clone().normalize();
    let bugVector = this.newBug.position.clone().normalize();
    this.newBug.quaternion.setFromUnitVectors(bugVector, this.groundVector);
    this.newBug.rotation.x += (Math.random() * (2*Math.PI/10))+-Math.PI/10;
    this.currentGround.add(this.newBug);
  }

  addPathBug(ground, difficulty){
    this.currentGround = ground
    let options=[0,1,2];
    let theRandomNum = Math.random()

    if(theRandomNum<0.05 && theRandomNum > 0.01 && difficulty==='easy'){
      let lane10= Math.floor(Math.random()*2);
      // this.items.addItem(lane10, this.currentGround);
      // this.items.createItem();
      this.items.addToken(lane12, this.currentGround);
      this.items.createToken();

    }else if(theRandomNum<0.03 && theRandomNum > 0.01 && difficulty==='hard'){
      let lane11= Math.floor(Math.random()*2);
      this.items.addItem(lane11, this.currentGround);
      this.items.createItem();
    } else if(theRandomNum<0.01){
      let lane12= Math.floor(Math.random()*2);
      // token populated onto the screen

      // this.items.addToken(lane12, this.currentGround);
      // this.items.createToken();
    }
    else{
      // this is the 15 secs before bugs start spawning
      if(this.spawnTimer > 15){
      this.addBug(true, 0, false, ground, this.bugPool);
      options.splice(0,1);
      this.addBug(true, 1, false, ground, this.bugPool);
      options.splice(1,1);
      this.addBug(true, 2, false, ground, this.bugPool);
      options.splice(2,1);
      } 
    

      if(theRandomNum>0.2){
        // Add difficulty here!
        let lane1= Math.floor(Math.random()*3);
        this.addBug(true, lane1, false, ground, this.bugPool);
        let lane2= Math.floor(Math.random()*3);
        this.addBug(true, lane2, false, ground, this.bugPool);
      }
      if(theRandomNum>0.5){
        // Add difficulty here!
        let lane4= Math.floor(Math.random()*3);
        this.addBug(true, lane4, false, ground, this.bugPool);
        let lane5= Math.floor(Math.random()*3);
        this.addBug(true, lane5, false, ground, this.bugPool);
        let lane6= Math.floor(Math.random()*3);
        this.addBug(true, lane6, false, ground, this.bugPool);

      }
    }
  }

  createBug(){
    let midPointVector= new t.Vector3();
    let vertexVector= new t.Vector3();


    // add bug randomization here

    //

    this.bugMap = new t.TextureLoader().load( "./red_spider.png");
    this.spriteMaterial = new t.SpriteMaterial( { map: this.bugMap, color: 0xffffff } );
    let bug = new t.Sprite( this.spriteMaterial );
    bug.scale.set(1, 1, 1)
    bug.receiveShadow=false;
    bug.position.y = -1;
    bug.position.z = 5;
    return bug;
  }

  createBugsPool(){
    let maxBugsInPool=100;
    let newBug;
    
    for(let i=0; i<maxBugsInPool;i++){
      newBug=this.createBug();
      this.bugPool.push(newBug);
    }
  }
}

module.exports = Enemy;
