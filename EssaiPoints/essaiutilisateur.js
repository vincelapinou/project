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
	interaction(sceneThreeJs);

}

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph) {

	const A = createCylinder("A",Vector3(0,10,0));
	const I = createCylinder("I",Vector3(0,5,0));
	const O = createCylinder("O",Vector3(0,0,0));
	const C = createCylinder("C",Vector3(0,-12,0));
	const B = createCylinder("B",Vector3(Math.sqrt(37),-1,0));
	const D = createCylinder("D",Vector3(-Math.sqrt(37),-1,0));
	sceneGraph.add(A);
	sceneGraph.add(O);
	sceneGraph.add(I);
	sceneGraph.add(C);
	sceneGraph.add(B);
	sceneGraph.add(D);
	
	const AI = createBar(5, "AI",Vector3(0,10,0),0);
	const DA = createBar(Math.sqrt(158), "DA",Vector3(0,10,0),0);
	const AB = createBar(Math.sqrt(158), "AB",Vector3(0,10,0),0);
	const BC = createBar(Math.sqrt(158), "BC",Vector3(0,10,0),0);
	const CD = createBar(Math.sqrt(158), "CD",Vector3(0,10,0),0);
	const OB = createBar(Math.sqrt(37), "OB",Vector3(0,10,0),0);
	const OD = createBar(Math.sqrt(37), "OD",Vector3(0,10,0),0);
	sceneGraph.add(AI);
	sceneGraph.add(DA);
	sceneGraph.add(AB);
	sceneGraph.add(BC);
	sceneGraph.add(CD);
	sceneGraph.add(OB);
	sceneGraph.add(OD);
	
	const PGeometry = new THREE.CubeGeometry(20,26,1);
	const planche = new THREE.Mesh(PGeometry,MaterialRGB(1,0,0) );
	planche.position.set(0, 0,-0.8);
	sceneGraph.add(planche);
	
	
	//Initialisation du parallélogramme
	const coorda = coordA(5,0);
	A.position.set(coorda[0],coorda[1],coorda[2]);

	const coordc = coordC(12,0);
	C.position.set(coordc[0],coordc[1],coordc[2]);

	const coordb = coordB(5,12,Math.sqrt(158),0);
	B.position.set(coordb[0],coordb[1],coordb[2]);

	const coordd = coordD(5,12,Math.sqrt(158),0);
	D.position.set(coordd[0],coordd[1],coordd[2]);

	const coordi=[0,5,0];
	const coordo=[0,0,0];

	barBetween(coordi,coorda,AI);
	barBetween(coorda,coordd,DA);
	barBetween(coorda,coordb,AB);
	barBetween(coordb,coordc,BC);
	barBetween(coordc,coordd,CD);
	barBetween(coordo,coordb,OB);
	barBetween(coordo,coordd,OD);
	
	
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
	
    render(sceneThreeJs);
}






// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene( );

    sceneThreeJs.camera = sceneInit.createCamera(0,8,30);
	sceneThreeJs.camera.lookAt(0,0,0);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(0,0,20));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

   // sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

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


