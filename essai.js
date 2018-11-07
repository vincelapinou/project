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
	
	const angle = Math.cos(t);
	
	
	const A = sceneThreeJs.sceneGraph.getObjectByName("A");
	A.position.set(5*Math.sin(angle),5+5*Math.cos(angle),0);
	
	const C = sceneThreeJs.sceneGraph.getObjectByName("C");
	C.position.set(-12*Math.sin(angle)/(1+Math.cos(angle)),-12,0);
	
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

    sceneThreeJs.camera = sceneInit.createCamera(-10,8,10);
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