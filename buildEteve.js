"use strict";

function buildEteve(sceneGraph,pickingData){
	const a = 0.1;
	const b = 0.5;
	const L = 2;
	const r = 2;
	const e = 0.4;
	const lt = 0.4; //longueur triangle
	const largT = 0.1; // largeur des tiges
	const epT = 0.06; // largeur des tiges
	const hTigeV = 2;
	const lPlaque = 0.7;

        // Corps
   let pts1=[];

    pts1.push(new THREE.Vector2(0,0));
    pts1.push(new THREE.Vector2(a,0));
    pts1.push(new THREE.Vector2(a, -b));
    pts1.push(new THREE.Vector2(0, -b));
    const shape1 = new THREE.Shape( pts1 );
	
    let Points1 = [];
	Points1.push( new THREE.Vector3(L,-r,0));
	Points1.push( new THREE.Vector3(0,-(r-e)/2-e,0));
	Points1.push( new THREE.Vector3(-L,-e,0));
	const iter2 = 5;
	const angle2 = Math.PI/iter2
	for(let k=1;k<=iter2;k++){
		Points1.push( new THREE.Vector3(-L-e*Math.sin(k*angle2),-e*Math.cos(k*angle2),0));
	}
	Points1.push( new THREE.Vector3(0,(r-e)/2+e,0));
	Points1.push( new THREE.Vector3(L,r,0));
    const Spline1 =  new THREE.CatmullRomCurve3( Points1 );

    const extrudeSettings1 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline1
};

    const extrudeGeometry1 = new THREE.ExtrudeBufferGeometry( shape1, extrudeSettings1 );
    const extrudeObject1 = new THREE.Mesh( extrudeGeometry1, MaterialRGB(0.9,0.9,0.9) ) ;
    extrudeObject1.material.side = THREE.DoubleSide; 
	extrudeObject1.name = "fourche"; 
    sceneGraph.add( extrudeObject1 );
	
	// Triangle
    let pts2=[];
    pts2.push(new THREE.Vector2(0,-L));
    pts2.push(new THREE.Vector2(lt*(r-e)/2/L+e,-lt));
    pts2.push(new THREE.Vector2(-lt*(r-e)/2/L-e,-lt));
    const shape2 = new THREE.Shape( pts2 );
	
    let Points2 = [];
	Points2.push( new THREE.Vector3(0,0,-a));
	Points2.push( new THREE.Vector3(0,0,0));
    const Spline2 =  new THREE.CatmullRomCurve3( Points2 );

    const extrudeSettings2 = {
	steps: 50,
	bevelEnabled: false,
	extrudePath: Spline2
};

    const extrudeGeometry2 = new THREE.ExtrudeBufferGeometry( shape2, extrudeSettings2 );
    const extrudeObject2 = new THREE.Mesh( extrudeGeometry2, MaterialRGB(0.9,0.9,0.9) ) ;
    extrudeObject2.material.side = THREE.DoubleSide; 
    sceneGraph.add( extrudeObject2 );
	extrudeObject2.name = "triangle"; 
	
	
	
	 // Arc cercle
    let pts3=[];

    pts3.push(new THREE.Vector2(0,0));
    pts3.push(new THREE.Vector2(-2*a,0));
    pts3.push(new THREE.Vector2(-a, -b));
    pts3.push(new THREE.Vector2(0, -b));
    const shape3 = new THREE.Shape( pts3 );
	
    let Points3 = [];
	const iter3 = 5;
	const R = Math.sqrt(r*r+4*L*L);
	const angleDeb = Math.asin(r/R);
	const angle3 = 2*angleDeb/iter3;
	for(let k=0;k<=iter3;k++){
		Points3.push( new THREE.Vector3(-L+R*Math.cos(-k*angle3+angleDeb),R*Math.sin(-k*angle3+angleDeb),0));
	}
    const Spline3 =  new THREE.CatmullRomCurve3( Points3 );

    const extrudeSettings3 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline3
};

    const extrudeGeometry3 = new THREE.ExtrudeBufferGeometry( shape3, extrudeSettings3);
    const extrudeObject3 = new THREE.Mesh( extrudeGeometry3, MaterialRGB(0.9,0.9,0.9) ) ;
    extrudeObject3.material.side = THREE.DoubleSide; 
	extrudeObject3.position.set(0,0,-a);
	extrudeObject3.name = "arc"; 
    sceneGraph.add( extrudeObject3 );
	
	// tige verticale
	const tigeVgeometry = new THREE.BoxGeometry( largT,hTigeV,epT );
	const tigeV = new THREE.Mesh( tigeVgeometry, MaterialRGB(0,0,0) ) ;
	tigeV.position.set(-L,0,epT/2);
	tigeV.name = "tigeV"; 
	sceneGraph.add( tigeV );
	
	// plaque
	const plaqueGeometry = new THREE.BoxGeometry( epT,lPlaque,lPlaque );
	const plaque = new THREE.Mesh( plaqueGeometry, MaterialRGB(1,0,0) ) ;
	plaque.position.set(-largT+epT/2,hTigeV/2,0);
	plaque.name = "plaque"; 
	pickingData.selectableObjects.push(plaque);
	tigeV.add( plaque );
	
	// tige horizontale
	const tigeHgeometry = new THREE.BoxGeometry(2*L+e,largT,epT );
	const tigeH = new THREE.Mesh( tigeHgeometry, MaterialRGB(0,0,0) ) ;
	tigeH.position.set(-e/2+L,0,0);
	tigeH.name = "tigeH"; 
	tigeV.add( tigeH );
	
}