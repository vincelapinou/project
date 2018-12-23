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

	const A = createCylinder("A",Vector3(-10,0,0));
	const I = createCylinder("I",Vector3(-5,0,0));
	const O = createCylinder("O",Vector3(0,0,0));
	const C = createCylinder("C",Vector3(12,0,0));
	const B = createCylinder("B",Vector3(1,Math.sqrt(37),0));
	const D = createCylinder("D",Vector3(1,-Math.sqrt(37),0));
	sceneGraph.add(A);
	sceneGraph.add(O);
	sceneGraph.add(I);
	sceneGraph.add(C);
	sceneGraph.add(B);
	sceneGraph.add(D);
	
	const AI = createBar(5, "AI");
	const DA = createBar(Math.sqrt(158), "DA");
	const AB = createBar(Math.sqrt(158), "AB");
	const BC = createBar(Math.sqrt(158), "BC");
	const CD = createBar(Math.sqrt(158), "CD");
	const OB = createBar(Math.sqrt(37), "OB");
	const OD = createBar(Math.sqrt(37), "OD");
	sceneGraph.add(AI);
	sceneGraph.add(DA);
	sceneGraph.add(AB);
	sceneGraph.add(BC);
	sceneGraph.add(CD);
	sceneGraph.add(OB);
	sceneGraph.add(OD);
	
	/*const PGeometry = new THREE.CubeGeometry(26,20,1);
	
	const textureLoader = new THREE.TextureLoader();
	const textureP= textureLoader.load( 'wood.jpg' );
    const materialP = new THREE.MeshLambertMaterial({ map: textureP });
	const planche = new THREE.Mesh(PGeometry,materialP);
	planche.position.set(1, 0,-0.8);
	sceneGraph.add(planche);*/
	
	
	//Initialisation du parallélogramme
	const coorda = coordA(5,0);
	A.position.set(coorda[0],coorda[1],coorda[2]);

	const coordc = coordC(12,0);
	C.position.set(coordc[0],coordc[1],coordc[2]);

	const coordb = coordB(5,12,Math.sqrt(158),0);
	B.position.set(coordb[0],coordb[1],coordb[2]);

	const coordd = coordD(5,12,Math.sqrt(158),0);
	D.position.set(coordd[0],coordd[1],coordd[2]);

	const coordi=[-5,0,0];
	const coordo=[0,0,0];

	barBetween(coordi,coorda,AI);
	barBetween(coorda,coordd,DA);
	barBetween(coorda,coordb,AB);
	barBetween(coordb,coordc,BC);
	barBetween(coordc,coordd,CD);
	barBetween(coordo,coordb,OB);
	barBetween(coordo,coordd,OD);
	
	
	//Visualisation des mouvements
	
	/*const lineM = new THREE.LineDashedMaterial( { color: 0xc51515,
	linewidth: 100,
	scale: 1,
	dashSize: 3,
	gapSize: 10,} );
	const lineG = new THREE.Geometry();
	lineG.vertices.push(new THREE.Vector3( 12, -7, 0));
	lineG.vertices.push(new THREE.Vector3( 12, 7, 0));
	lineG.vertices.push(new THREE.Vector3( 12, -7, 0));
	const line = new THREE.Line( lineG, lineM );
	line.name="line";
	sceneGraph.add(line); 
	console.log(line);
	
	const arrowG = new THREE.Geometry();
	arrowG.vertices.push( new THREE.Vector3(15, 2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15, -2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 14.8, -2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15.25, -2.5, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15.7, -2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15.5, -2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15.5,2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15.7, 2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15.25, 2.5, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 14.8, 2, 0 ) );
	arrowG.vertices.push( new THREE.Vector3( 15, 2, 0 ) );
	const arrowM = new THREE.LineBasicMaterial( { color: 0xc51515, linewidth: 1 } );
	const arrow = new THREE.Line( arrowG, arrowM );
	arrow.name="arrow";
	sceneGraph.add( arrow );
	
	const curve = new THREE.EllipseCurve(-5,0,5,5,3*Math.PI/4,5*Math.PI/4);
	const points = curve.getSpacedPoints(30);
	const circleG = new THREE.BufferGeometry().setFromPoints( points );
	const circleM = new THREE.PointsMaterial( { color : 0xff0000, size : 0.2 } );
	const circle = new THREE.Points( circleG, circleM );
	circle.name="circle";
	sceneGraph.add(circle);
	
	
	const arrow2 = createArrow2();
	arrow2.name="arrow2";
	sceneGraph.add( arrow2 );*/
	

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

    sceneThreeJs.camera = sceneInit.createCamera(0,0,30);
	sceneThreeJs.camera.lookAt(0,0,0);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(0,5,20));
	sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(0,-5,20));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);


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


