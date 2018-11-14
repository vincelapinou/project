"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null
    };

    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph);


    animationLoop(sceneThreeJs);
}

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph) {

	const A = creerSphere("A",Vector3(0,10,0));
	const I = creerSphere("I",Vector3(0,5,0));
	const O = creerSphere("O",Vector3(0,0,0));
	const C = creerSphere("C",Vector3(0,-12,0));
	const B = creerSphere("B",Vector3(Math.sqrt(37),-1,0));
	const D = creerSphere("D",Vector3(-Math.sqrt(37),-1,0));
	sceneGraph.add(A);
	sceneGraph.add(O);
	sceneGraph.add(I);
	sceneGraph.add(C);
	sceneGraph.add(B);
	sceneGraph.add(D);
	
	const AI = creerBarre(5, "AI",Vector3(0,10,0),0);
	sceneGraph.add(AI);
	
	
	var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3( -20, -12, 0));
	geometry.vertices.push(new THREE.Vector3( 20, -12, 0));
	var line = new THREE.Line( geometry, material );
	sceneGraph.add(line);
	
	const cylinderGeometryx = primitive.Cylinder(Vector3(0,0,0),Vector3(10,0,0),0.1);
    const cylinderx = new THREE.Mesh( cylinderGeometryx,MaterialRGB(1,0,0) );
    cylinderx.castShadow = true;
	cylinderx.name = "cylinderx";
    sceneGraph.add( cylinderx );
	
	const cylinderGeometryy = primitive.Cylinder(Vector3(0,0,0),Vector3(0,10,0),0.1);
    const cylindery = new THREE.Mesh( cylinderGeometryy,MaterialRGB(0,1,0) );
    cylindery.castShadow = true;
	cylindery.name = "cylindery";
    sceneGraph.add( cylindery );
	
	const cylinderGeometryz = primitive.Cylinder(Vector3(0,0,0),Vector3(0,0,10),0.1);
    const cylinderz = new THREE.Mesh( cylinderGeometryz,MaterialRGB(0,0,1) );
    cylinderz.castShadow = true;
	cylinderz.name = "cylinderz";
    sceneGraph.add( cylinderz);
	

}

// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time) {

    const t = time/1000;//time in second
	
	const angle = 1.3*Math.cos(t);
	
	
	const A = sceneThreeJs.sceneGraph.getObjectByName("A");
	A.position.set(5*Math.sin(angle),5+5*Math.cos(angle),0);
	
	const C = sceneThreeJs.sceneGraph.getObjectByName("C");
	C.position.set(-12*Math.sin(angle)/(1+Math.cos(angle)),-12,0);
	
	const AI = sceneThreeJs.sceneGraph.getObjectByName("AI");
	AI.translateY(-2.5);
	AI.rotateZ(0.01);
	AI.translateY(2.5);
	
	const pointsBD = getCoord(angle, 5, 12, Math.sqrt(158));
	const B = sceneThreeJs.sceneGraph.getObjectByName("B");
	B.position.set(pointsBD[1], yDroiteBD(pointsBD[1], angle, 5, 12),0)
	
	const D = sceneThreeJs.sceneGraph.getObjectByName("D");
	D.position.set(pointsBD[0], yDroiteBD(pointsBD[0], angle, 5, 12),0)

	
    render(sceneThreeJs);
}


function RotationBetweenTwoAxes(v1,v2) {
    const v1n = v1.clone().normalize();
    const v2n = v2.clone().normalize();

    const axis = v1n.clone().cross(v2n).normalize();
    const angle = Math.acos( v1n.dot(v2n) );

    return new THREE.Matrix4().makeRotationAxis(axis,angle);
}








// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene( );

    sceneThreeJs.camera = sceneInit.createCamera(-10,8,30);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(0,0,20));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

    const onResizeFunction = function(event) { onResize(sceneThreeJs); };
    window.addEventListener('resize', onResizeFunction );
}

// Fonction de gestion d'animation
function animationLoop(sceneThreeJs) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(sceneThreeJs,timeStamp); // appel de notre fonction d'animation
            animationLoop(sceneThreeJs); // relance une nouvelle demande de mise à jour
        }

     );

}

// Fonction appelée lors du redimensionnement de la fenetre
function onResize(sceneThreeJs) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneThreeJs.camera.aspect = width / height;
    sceneThreeJs.camera.updateProjectionMatrix();

    sceneThreeJs.renderer.setSize(width, height);
}

function Vector3(x,y,z) {
    return new THREE.Vector3(x,y,z);
}

function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}

function creerSphere(n,position){
	const SGeometry = new THREE.SphereGeometry(1,32,32);
	const sphere = new THREE.Mesh(SGeometry,MaterialRGB(1,0,0) );
	sphere.position.set(position.x, position.y,position.z);
	sphere.castShadow = true;
	sphere.name = n;
	return sphere;
}

function creerBarre(l, n ,position,angle){
	const BGeometry = new THREE.BoxGeometry(1,l,0.2);
	const barre = new THREE.Mesh(BGeometry,MaterialRGB(1,1,1) );
	barre.rotateZ(angle);
	barre.position.set(position.x+l/2*Math.sin(angle),position.y-l/2*Math.cos(angle),position.z);
	barre.castShadow = true;
	barre.name = n;
	return barre;
}

function trinome(a,b,c){// a,b,c sont les coefficients du trinome a resoudre, renvoie les 2 racines réelles si elles existent 
  	const delta = b*b-4*a*c;
  	var x1 = (-b+Math.sqrt(delta))/(2*a);
	var x2 = (-b-Math.sqrt(delta))/(2*a);
	return [x2,x1];
}


function yDroiteBD(x, theta, a, d ) { // renvoie l'ordonnée de la droite BD quand on lui donne l abscisse
  	//theta a d parametres du parallelogramme etudie
	
	const A = -Math.sin(theta)/(1+Math.cos(theta));
	const B = (a+a*Math.cos(theta)-d)/2 - A/2*(a*Math.sin(theta)- d*Math.sin(theta)/(1+Math.cos(theta)));
	
  	return A*x + B;
}
                                                    
function getCoord(theta, a, d, L) { // dans le cas du point d'intersection du cercle avec la droite QB du parallelogramme de peaucelier
  	// x, theta a et d sont les parametres du parallelogramme
    // definition des cstes
    const A = -Math.sin(theta)/(1+Math.cos(theta));
    const B = (a+a*Math.cos(theta)-d)/2 - A/2*(a*Math.sin(theta)- d*Math.sin(theta)/(1+Math.cos(theta)));
    const C = a*Math.sin(theta);
	const D = a+a*Math.cos(theta) - B;
    var x1x2 = trinome(1+A*A,
    -2*C-2*A*D,
    C*C+D*D-L*L
    );
  	return x1x2;
}
