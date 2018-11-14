"use strict";


function trinome(a,b,c){// a,b,c sont les coefficients du trinome a resoudre, renvoie les 2 racines réelles si elles existent 
  	const delta = b*b-4*a*c;
  	if (delta>0) {
    	var x1 = (-b+Math.sqrt(delta))/2*a;
    	var x2 = (-b-Math.sqrt(delta))/2*a;
    	return [x2,x1];
  	}
    return;
}


function yDroiteBD(x, theta, a, d ) { // renvoie l'ordonnée de la droite BD quand on lui donne l abscisse
  	//theta a d parametres du parallelogramme etudie
  	return -Math.sin(theta)/(1+Math.cos(theta))*x+0.5*(-d+a*(1+Math.cos(theta)));
}
                                                    
function getCoord(theta, a, d, L) { // dans le cas du point d'intersection du cercle avec la droite QB du parallelogramme de peaucelier
  	// x, theta a et d sont les parametres du parallelogramme
    // definition des cstes
    const A = a*Math.sin(theta);
    const B = Math.sin(theta)/(1+Math.cos(theta));
    const C = a+a*Math.cos(theta)-(a+a*Math.cos(theta)-d)/2;
    var x1x2 = trinome(1+B*B,
    -2*B*C-2*A,
    C*C+A*A-L*L
    );
    console.log(x1x2);
  
  	return x1x2;
}
main();

function main() {//test
  	console.log(getCoord(1,4,3,13));
  
 }
