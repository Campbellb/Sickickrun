const t = require('three');
const TextureAnimator = require('./texture_animator');

class GameView {
  constructor(game) {
    this.clock = new t.Clock();
    this.gameTime = new t.Clock();
    this.renderer = new t.WebGLRenderer({alpha:true});
    this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.scene = new t.Scene();
    this.scene.fog = new t.FogExp2( 0x000000, .02 );
    this.heroGroundedY = -1.5; 
    this.skyGeometry = new t.CylinderGeometry( 35,35,250,32);
    // this.skyMaterial = new t.MeshBasicMaterial ( { map: new t.TextureLoader().load('./matrix_green2.png') } )		
    this.skyMaterial = new t.MeshBasicMaterial ( { map: new t.TextureLoader().load('./shadow_back.png') } )		
		this.rollingSkyCylinder = new t.Mesh( this.skyGeometry, this.skyMaterial );
		this.sides = 80;
		this.tiers = 80;
		this.worldRadius = 26;
		this.sphereGeometry = new t.SphereGeometry( this.worldRadius, this.sides, this.tiers);	
    // this.sphereMaterial = new t.MeshBasicMaterial ( { map: new t.TextureLoader().load('./matrix_green2.png') } )
    this.sphereMaterial = new t.MeshBasicMaterial ( { map: new t.TextureLoader().load('./shadow_back.png') } )
    this.rollingGroundSphere = new t.Mesh( this.sphereGeometry, this.sphereMaterial );
    this.rollingSpeed = 0.008; 

    // animated runner
		this.spriteMap = new t.TextureLoader().load( "./SickickRunner.png" );
	  this.spriteMaterial = new t.SpriteMaterial( { map: this.spriteMap, color: 0xffffff } );
    this.annie = new TextureAnimator( this.spriteMap, 4, 1, 4, 80 );
    this.heroSprite = new t.Sprite( this.spriteMaterial );	
    

    this.heroGroundedY = -1.5; 
    this.sphericalHelper = new t.Spherical();
    this.pathAngleValues=[1.52,1.57,1.62];
    this.leftLane = -1;
		this.rightLane = 1;
    this.middleLane = 0;  
    this.currentLane = this.middleLane;
    this.bugPool =[];
    this.game = game;
  }

    createScene(effects){
      this.clock.start();
      this.gameTime.start();
      this.renderer.setClearColor(0xfffafa, 1); 
      this.renderer.shadowMap.enabled = true;//enable shadow
      this.renderer.shadowMap.type = t.PCFSoftShadowMap;
      this.renderer.setSize( this.sceneWidth, this.sceneHeight );
      this.dom = document.getElementById('Main-Game');
      this.dom.appendChild(this.renderer.domElement);
      this.addWorld();
      this.addHero();
      this.addSky();
      this.camera = new t.PerspectiveCamera( 90, this.sceneWidth / this.sceneHeight, .1, 100);
      this.camera.position.z = 20;
      this.camera.position.y = 2;
      this.camera.position.x = 0;
      this.renderer.render(this.scene, this.camera);//draw
      window.addEventListener('resize', this.onWindowResize.bind(this), false);//resize callback
  
    }

    addHero(){			
			this.heroSprite.scale.set(2, 2, 1)
			this.scene.add( this.heroSprite );
			this.heroSprite.position.y= this.heroGroundedY
			this.heroSprite.position.z= 16;
			this.currentLane=this.middleLane;
			this.heroSprite.position.x = this.currentLane;
	}

	/// populate world functions
	addWorld(){
		this.rollingGroundSphere.receiveShadow = true;
		this.rollingGroundSphere.castShadow = false;
		this.rollingGroundSphere.rotation.z = -Math.PI/2;
		this.scene.add( this.rollingGroundSphere );
		this.rollingGroundSphere.position.y = -24;
    this.rollingGroundSphere.position.z = 2;    
	}
	
	addSky(){
		this.rollingSkyCylinder.rotation.z = 0.5 * Math.PI;
		this.rollingSkyCylinder.receiveShadow = true;
		this.rollingSkyCylinder.castShadow = false;
		this.skyGeometry.scale( 1, -1, 1 );
		this.scene.add( this.rollingSkyCylinder );
		this.rollingSkyCylinder.position.y = -24;
		this.rollingSkyCylinder.position.z = 2;
	}

  render(){
    this.renderer.render(this.scene, this.camera);//draw
  }

  onWindowResize(){
		this.sceneHeight = window.innerHeight;
		this.sceneWidth = window.innerWidth;
		this.renderer.setSize(this.sceneWidth, this.sceneHeight);
		this.camera.aspect = this.sceneWidth/this.sceneHeight;
		this.camera.updateProjectionMatrix();
	}

}

module.exports = GameView;