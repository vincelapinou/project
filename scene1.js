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
	const cylinderGeometry1 = primitive.Cylinder(Vector3(0,0,0),Vector3(0,0,1),1);
	const cylinder1 = new THREE.Mesh( cylinderGeometry1,MaterialRGB(1,1,1) );
	cylinder1.castShadow = true;
	cylinder1.name = "cylinder1";
	sceneGraph.add( cylinder1 );
	
	const cylinderGeometry2 = primitive.Cylinder(Vector3(-10,0,0),Vector3(-10,0,1),1);
	const cylinder2 = new THREE.Mesh( cylinderGeometry2,MaterialRGB(1,1,1) );
	cylinder2.castShadow = true;
	cylinder2.name = "cylinder2";
	sceneGraph.add( cylinder2 );
	
	const barre1 = creerGrandeBarre("barre1",Vector3(-Math.sqrt(425)/2,2.5,1), +0.25+Math.PI/2);
	const barre2 = creerGrandeBarre("barre2",Vector3(-Math.sqrt(425)/2,-2.5,1), -0.25-Math.PI/2);
	const barre3 = creerGrandeBarre("barre3",Vector3(Math.sqrt(425)/2,2.5,1), -0.25-Math.PI/2);
	const barre4 = creerGrandeBarre("barre4",Vector3(Math.sqrt(425)/2,-2.5,1), 0.25+Math.PI/2);
	sceneGraph.add(barre1);
	barre1.add(barre2);
	barre2.add(barre3);
	barre3.add(barre4);
	
	// creation des axes	
	
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

function creerGrandeBarre(n,position,angle){ // permet de créer une des grandes barres du parallélogramme, de nom 'n', de milieu 'position' et pivotée d'un angle 'angle'
	const BGeometry = new THREE.BoxGeometry(1,20,0.2);
	const barre = new THREE.Mesh(BGeometry,MaterialRGB(1,1,1) );
	barre.position.set(position.x,position.y,position.z);
	barre.rotateZ(angle);
	barre.castShadow = true;
	barre.name = n;
	return barre;
}
