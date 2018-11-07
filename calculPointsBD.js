"use strict";


function trinome(a,b,c){// a,b,c sont les coefficients du trinome a resoudre, renvoie les 2 racines réelles si elles existent 
  const delta = b*b-4*a*c;
  if (delta>0) {
    const x1 = (-b+MATH.sqrt(delta))/2*a;
    const x2 = (-b-MATH.sqrt(delta))/2*a;
    return const [x1,x2];
  }
}
function yDroiteBD(x, theta, a, d ) { // renvoie l'ordonnée de la droite BD quand on lui donne l abscisse
//theta a d parametres du parallelogramme etudie
return -(MATH.sin(theta)/(1+MATH.cos(theta))*x+1/2(-d+a(1+MATH.cos(theta));
}
function getCoord(theta, a, d) { // dans le cas du point d'intersection du cercle avec la droite QB du parallelogramme de peaucelier
// x, theta a et d sont les parametres du parallelogramme
const x1x2 = trinome(1+Math.pow(Math.sin(theta),2)/Math.pow(1+Math.cos(theta,2)),
-(2*a*Math.sin(theta)+Math.sin(theta)/(1+Math.cos(theta))*a*(1+Math.cos(theta)+d)),
Math.pow(a*Math.sin(theta),2)+Math.pow(a/2*(1+Math.cos(theta))+d/2,2)
);
const pointB = [x1x2[0],yDroiteBD(x1x2[0])]; // Attention : B et Q peuvent etre inverses
const pointQ = [x1x2[1],yDroiteBD(x1x2[1])];
}
