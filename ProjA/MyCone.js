/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices, inverted = false, height = 1, radius = 0.5) {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.initBuffers(inverted);
    }
    initBuffers(inverted = false) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang)*this.radius, 0, -Math.sin(ang)*this.radius);
            if(inverted){
              this.indices.push((i+1) % this.slices, i, this.slices);
              this.normals.push(-Math.cos(ang), this.radius/this.height, Math.sin(ang));
            }
            else{
              this.indices.push(i, (i+1) % this.slices, this.slices);
              this.normals.push(Math.cos(ang), this.radius/this.height, -Math.sin(ang));
            }
            this.texCoords.push(0.5 + Math.cos(ang)*0.5, 0.5 - Math.sin(ang)*0.5);
            ang+=alphaAng;
        }
        this.vertices.push(0,this.height,0);
        if(inverted)
          this.normals.push(0,-this.height,0);
        else
          this.normals.push(0,this.height,0);
        this.texCoords.push(0.5, 0.5);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


