"use strict";

function createCylinder(n,position){ // créer un cylindre rouge dont les coordonnées seront le vecteur "position"
	const CGeometry = new THREE.CylinderGeometry(0.6,0.6,0.8,32);
	const cylinder = new THREE.Mesh(CGeometry,MaterialRGB(1,0,0) );
	cylinder.rotateX(Math.PI/2);
	cylinder.position.set(position.x, position.y,position.z);
	cylinder.castShadow = true;
	cylinder.name = n;
	return cylinder;
}

function createBar(l, n ,position,angle){
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


function yDroiteBD(x, angle, a, d ) { // renvoie l'ordonnée de la droite BD quand on lui donne l abscisse
  	//angle a d parametres du parallelogramme etudie
	
	const A = -Math.sin(angle)/(1+Math.cos(angle));
	const B = (a+a*Math.cos(angle)-d)/2 - A/2*(a*Math.sin(angle)- d*Math.sin(angle)/(1+Math.cos(angle)));
	
  	return A*x + B;
}
                                                    
function getCoord(angle, a, d, L) { // dans le cas du point d'intersection du cercle avec la droite QB du parallelogramme de peaucelier
  	// x, angle a et d sont les parametres du parallelogramme
    // definition des cstes
    const A = -Math.sin(angle)/(1+Math.cos(angle));
    const B = (a+a*Math.cos(angle)-d)/2 - A/2*(a*Math.sin(angle)- d*Math.sin(angle)/(1+Math.cos(angle)));
    const C = a*Math.sin(angle);
	const D = a+a*Math.cos(angle) - B;
    var x1x2 = trinome(1+A*A,
    -2*C-2*A*D,
    C*C+D*D-L*L
    );
  	return x1x2;
}


function coordA(a,angle){
	return [a*Math.sin(angle),a+a*Math.cos(angle),0]
}

function coordC(d,angle){
	return [-d*Math.sin(angle)/(1+Math.cos(angle)),-d,0]
}

function coordB(a,d,L,angle){
	const x = getCoord(angle, a, d, L)[1];
	const y = yDroiteBD(x, angle, a, d);
	return [x,y,0]
}

function coordD(a,d,L,angle){
	const x = getCoord(angle, a, d, L)[0];
	const y = yDroiteBD(x, angle, a, d);
	return [x,y,0]
}

function barBetween(p1,p2,barre){
	barre.position.set((p1[0]+p2[0])/2,(p1[1]+p2[1])/2,(p1[2]+p2[2])/2);
	const angle = Math.atan(-(p1[0]-p2[0])/(p1[1]-p2[1]));
	barre.rotation.z = angle;
}
