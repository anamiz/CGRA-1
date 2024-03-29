/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();
        this.enableTextures(true);

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cylinder = new MyCylinder(this, 10, 3, 0.5);
        this.cube = new MyUnitCube(this);
        this.cone = new MyCone(this, 10, false, 1.5, 0.5);
        this.treeGroupPatch = new MyTreeGroupPatch(this, 3, 4, 3, 0, 0);
        this.treeRow = new MyTreeRow(this, 5, 5, 3, 0, 0);
        this.plane = new MyQuad(this, [0, 10, 10, 10, 0, 0, 10, 0]);
        this.treerow = new MyTreeRow(this, 6, 3, 0, 0);
        this.house = new MyHouse(this);
        this.hill = new MyVoxelHill(this, 3);
        this.skybox = new MyCubeMap(this, 150);

        this.treeGroupPatch2 = new MyTreeGroupPatch(this, 5, 6, 4, 0, 0);
        this.treeRow2 = new MyTreeRow(this, 10, 5, 3, 0, 0);
        this.hill2 = new MyVoxelHill(this, 10);
        this.fireplace = new MyPyramid(this, 4, 2, 1.5);
        this.fireplace2 = new MyPyramid(this, 4, 3, 1.5);
        this.quad = new MyQuad(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.displaySkybox = true;
        this.displayGrass = true;
        this.toggleNight = false;
        this.toggleFire = false;
        this.textures = true;
        this.scaleFactor = 1;
              
        this.random_value = Math.random();
    }
    hexToRgbA(hex){
      var ret;
      //either we receive a html/css color or a RGB vector
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          ret=[
              parseInt(hex.substring(1,3),16).toPrecision()/255.0,
              parseInt(hex.substring(3,5),16).toPrecision()/255.0,
              parseInt(hex.substring(5,7),16).toPrecision()/255.0,
              1.0
          ];
      }
      else
          ret=[
              hex[0].toPrecision()/255.0,
              hex[1].toPrecision()/255.0,
              hex[2].toPrecision()/255.0,
              1.0
          ];
      return ret;
    }
    initLights() {
      this.lights[0].setPosition(100, 200, -75, 1);
      this.lights[0].setDiffuse(1.0, 1.0, 0.9, 1.0);
      this.lights[0].setAmbient(0.8, 0.8, 0.7, 1);
      this.lights[0].setSpecular(1.0, 1.0, 0.9, 1.0);
      this.lights[0].enable();
      this.lights[0].update();

      this.lights[1].setPosition(100, 200, -75, 1);
      this.lights[1].setDiffuse(0.5, 0.5, 0.7, 1.0);
      this.lights[1].setAmbient(0.4, 0.4, 0.6, 1);
      this.lights[1].setSpecular(0.5, 0.5, 0.7, 1.0);
      this.lights[1].disable();
      this.lights[1].update();

      var color = this.hexToRgbA('#d54801');
      this.lights[2].setPosition(30.75, 4, -0.75, 1);
      this.lights[2].setDiffuse(color[0], color[1], color[2], 1.0);
      this.lights[2].setSpecular(color[0], color[1], color[2], 1.0);
      this.lights[2].setAmbient(color[0], color[1], color[2], 1);
      this.lights[2].setQuadraticAttenuation(0.01);
      this.lights[2].disable();
      this.lights[2].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 350, vec3.fromValues(100, 50, 50), vec3.fromValues(0, 5, 0));
    }
    initMaterials() {
        //Materials
        this.grass = new CGFappearance(this);
        this.grass.setAmbient(0.7, 0.7, 0.7, 1);
        this.grass.setDiffuse(0.8, 0.8, 0.8, 1);
        this.grass.setSpecular(0.2, 0.2, 0.2, 1);
        this.grass.setShininess(10.0);
        this.grass.loadTexture('textures/grass.jpg');
        this.grass.setTextureWrap('REPEAT', 'REPEAT');

        this.skybox_t = new CGFappearance(this);
        this.skybox_t.setAmbient(1, 1, 1, 1);
        this.skybox_t.setDiffuse(1, 1, 1, 1);
        this.skybox_t.setSpecular(0, 0, 0, 1);
        this.skybox_t.setShininess(150.0);
        this.skybox_t.loadTexture('textures/skybox.png');
        this.skybox_t.setTextureWrap('REPEAT', 'REPEAT');    

        var color = this.hexToRgbA('#F60607');
        this.fire_1 = new CGFappearance(this);
        this.fire_1.setAmbient(color[0], color[1], color[2], 1);
        this.fire_1.setDiffuse(color[0], color[1], color[2], 1);
        this.fire_1.setSpecular(0, 0, 0, 1);
        this.fire_1.setShininess(150.0);

        color = this.hexToRgbA('#7F0800');
        this.fire_2 = new CGFappearance(this);
        this.fire_2.setAmbient(color[0], color[1], color[2], 1);
        this.fire_2.setDiffuse(color[0], color[1], color[2], 1);
        this.fire_2.setSpecular(0, 0, 0, 1);
        this.fire_2.setShininess(150.0);

        this.marble = new CGFappearance(this);
        this.marble.setAmbient(0.4, 0.4, 0.4, 1);
        this.marble.setDiffuse(1, 1, 1, 1);
        this.marble.setSpecular(0, 0, 0, 1);
        this.marble.setShininess(10.0);
        this.marble.loadTexture('textures/marble.jpg');
        this.marble.setTextureWrap('REPEAT', 'REPEAT');

        this.water = new CGFappearance(this);
        this.water.setAmbient(0.5, 0.5, 0.5, 1);
        this.water.setDiffuse(0, 0, 0, 1);
        this.water.setSpecular(1, 1, 1, 1);
        this.water.setShininess(50.0);
        this.water.loadTexture('textures/water.jpg');
        this.water.setTextureWrap('REPEAT', 'REPEAT');

        this.rock = new CGFappearance(this);
        this.rock.setAmbient(0.4, 0.4, 0.4, 1);
        this.rock.setDiffuse(1, 1, 1, 1);
        this.rock.setSpecular(0, 0, 0, 1);
        this.rock.setShininess(10.0);
        this.rock.loadTexture('textures/rock.jpg');
        this.rock.setTextureWrap('REPEAT', 'REPEAT');
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        if(this.textures) 
        this.enableTextures(true);
        else 
        this.enableTextures(false);

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // Handle lights
        if (this.toggleNight){
          this.lights[1].enable();
          this.lights[0].disable();
        }
        else {
          this.lights[1].disable();
          this.lights[0].enable();
        }

        if (this.toggleFire)
          this.lights[2].enable();
        else 
          this.lights[2].disable();

        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();

        // ---- BEGIN Primitive drawing section        

        this.pushMatrix();

        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        
        this.pushMatrix();
        this.pushMatrix();
        this.translate(-1, 0, -2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.translate(5,0,5);
        this.scale(1.5,1.5,1.5);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(42,0,-45);
        this.treeGroupPatch2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(50,0,45);
        this.scale(2,2,2);
        this.hill2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-12,0,-22);
        this.treeRow.display();
        this.translate(0,0,48);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-23,0,32);
        this.rotate(Math.PI/2,0,1,0);
        this.treeRow2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-40,0,15);
        this.scale(2,2,2);
        this.hill.display();
        this.popMatrix();

        this.pushMatrix();
        this.pushMatrix();
        this.translate(30,0,0);

        this.fire_2.apply();

        this.fireplace.display();
        this.translate(1.5,0,0);
        this.fireplace.display();
        this.translate(0,0,-1.5);
        this.fireplace.display();
        this.translate(-1.5,0,0);
        this.fireplace.display();
        this.fire_1.apply();
        this.translate(0.75,0,0.75)
        this.fireplace2.display();;

        this.popMatrix();
        this.popMatrix();

        //fountain
        this.pushMatrix();
        this.marble.apply();
        this.translate(0, 0, 35);
        this.scale(5, 1, 0.5);
        this.cube.display();
        this.translate(0, 0, 9);
        this.cube.display();
        this.popMatrix();

        this.pushMatrix();
        this.marble.apply();
        this.translate(2.5, 0, 37.25);
        this.rotate(Math.PI/2, 0, 1, 0);
        this.scale(5, 1, 0.5);
        this.cube.display();
        this.translate(0, 0, -10);
        this.cube.display();
        this.popMatrix();

        //fountain water and center piece
        this.pushMatrix();
        this.translate(0, 0.5, 37.25);
        this.pushMatrix();
        this.cylinder.display();
        this.translate(0, 3, 0);
        this.cone.display();
        this.popMatrix();
        this.water.apply();
        this.scale(4.5, 1, 4);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.popMatrix();

        //rocks
        this.pushMatrix();
        this.rock.apply();
        this.scale(2.5,2.5,2.5);
        this.translate(12,-0.2,4);
        this.rotate(Math.PI*this.random_value*100, 1, 1, 1);
        this.cube.display();
        this.popMatrix();

        this.pushMatrix();
        this.scale(2.5,2.5,2.5);
        this.translate(5,-0.2,-15);
        this.rotate(Math.PI*((this.random_value*10000) % 10), 1, 1, 1);
        this.cube.display();
        this.popMatrix();

        this.pushMatrix();
        this.scale(2.5,2.5,2.5);
        this.translate(-15,-0.2,-5);
        this.rotate(Math.PI*((this.random_value*1000000) % 10), 1, 1, 1);
        this.cube.display();
        this.popMatrix();

        if(this.displayGrass){
          this.pushMatrix();
          this.scale(150, 1, 150  );
          this.rotate(-Math.PI/2, 1, 0, 0);
          this.grass.apply();
          this.plane.display();
          this.popMatrix();
        }
        this.translate(0, 73, 0);

        if (this.displaySkybox){
          this.skybox_t.apply();
          this.skybox.display();
        }

        this.popMatrix();

        if (this.displayNormals){
          this.cylinder.enableNormalViz();
          this.cube.enableNormalViz();
          this.cone.enableNormalViz();
          this.treeGroupPatch.enableNormalViz();
          this.treeRow.enableNormalViz();
          this.plane.enableNormalViz();
          this.treerow.enableNormalViz();
          this.house.enableNormalViz();
          this.hill.enableNormalViz();
          this.skybox.enableNormalViz();
  
          this.treeGroupPatch2.enableNormalViz();
          this.treeRow2.enableNormalViz();
          this.hill2.enableNormalViz();
          this.fireplace.enableNormalViz();
          this.fireplace2.enableNormalViz();
          this.quad.enableNormalViz();
  
        }
        else{
          this.cylinder.disableNormalViz();
          this.cube.disableNormalViz();
          this.cone.disableNormalViz();
          this.treeGroupPatch.disableNormalViz();
          this.treeRow.disableNormalViz();
          this.plane.disableNormalViz();
          this.treerow.disableNormalViz();
          this.house.disableNormalViz();
          this.hill.disableNormalViz();
          this.skybox.disableNormalViz();
  
          this.treeGroupPatch2.disableNormalViz();
          this.treeRow2.disableNormalViz();
          this.hill2.disableNormalViz();
          this.fireplace.disableNormalViz();
          this.fireplace2.disableNormalViz();
          this.quad.disableNormalViz();
        }
         
        // ---- END Primitive drawing section
    }
}