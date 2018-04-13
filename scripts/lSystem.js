
function lSystem(rules, angle, axiom){
  this.rules = rules;
  this.angle = angle;
  this.axiom = axiom;
  this.length = -20;
}

lSystem.prototype.addRule =function(rules, a, b){
    var newrule = [a,b]
    return rules.push(newrule);
}

lSystem.prototype.generation = function(axiom, rules){
  var newstring ="";
  for (i=0; i < axiom.length; i++){
    var found = false;
    for (j=0; j < rules.length; j++){
      if (axiom[i] === rules[j][0]){
        newstring += rules[j][1]
        found = true;
      }
    }
    if (found === false){
      newstring += axiom[i];
    }
  }
  return newstring;
}

lSystem.prototype.render = function(turtle){
  ctx.translate(canvassize/2, canvassize)
  for (i=0; i < turtle.length; i++){
    if (turtle[i] === "F"){
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(0, this.length);
      ctx.stroke();
      ctx.closePath();
      ctx.translate(0, this.length);
    }
 }
}
