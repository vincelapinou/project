"use strict";


function trinome(a,b,c){// a,b,c sont les coefficients du trinome a resoudre, renvoie les 2 racines réelles si elles existent 
  const delta = b*b-4*a*c;
  if (delta>0) {
    var x1 = (-b+Math.sqrt(delta))/2*a;
    var x2 = (-b-Math.sqrt(delta))/2*a;
    return [x1,x2];
  }
    return;
}


function yDroiteBD(x, theta, a, d ) { // renvoie l'ordonnée de la droite BD quand on lui donne l abscisse
  //theta a d parametres du parallelogramme etudie
  return -Math.sin(theta)/(1+Math.cos(theta))*x+0.5*(-d+a*(1+Math.cos(theta)));
}
                                                    
function getCoord(theta, a, d) { // dans le cas du point d'intersection du cercle avec la droite QB du parallelogramme de peaucelier
  // x, theta a et d sont les parametres du parallelogramme
  var x1x2 = trinome(1+Math.pow(Math.sin(theta),2)/Math.pow(1+Math.cos(theta),2),
    -(2*a*Math.sin(theta)+Math.sin(theta)/(1+Math.cos(theta))*a*(1+Math.cos(theta)+d)),
    Math.pow(a*Math.sin(theta),2)+Math.pow(a/2*(1+Math.cos(theta))+d/2,2)
    );
    console.log(x1x2);
  var pointB = [x1x2[0],yDroiteBD(x1x2[0],theta,a,d)]; // Attention : B et Q peuvent etre inverses
  var pointQ = [x1x2[1],yDroiteBD(x1x2[1],theta,a,d)];
  return [pointB, pointQ];
}
main();

function main() {//test
  console.log(getCoord(1,4,3));
  
 }
