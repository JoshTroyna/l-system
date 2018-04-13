let myCanvas = document.getElementById("canvas")
let ctx = myCanvas.getContext("2d")

let rules8 = [["X","X+YF+"],["Y", "−FX−YF"]]
let rules7 = [["X","F-[[X]+X]+F[+FX]-X"],["F", "FF"]]
let currentSystem = new lSystem(rules7, 25, "X");

function lSystem(rules, angle, axiom){
  this.rules = rules
  this.angle = (Math.PI / 180) * angle
  this.axiom = axiom
  this.length = -350
}

lSystem.prototype.addRule = function(rules, a, b){
    let newrule = [a,b]
    return rules.push(newrule)
}

lSystem.prototype.generation = function(){
  let newstring = ""
  for (let i = 0; i < this.axiom.length; i++){
    let found = false
    for (let j = 0; j < this.rules.length; j++){
      if (this.axiom[i] === this.rules[j][0]){
        newstring += this.rules[j][1]
        found = true
      }
    }
    if (found === false){
      newstring += this.axiom[i]
    }
  }
  this.axiom = newstring;
  this.length = this.length/2
}

lSystem.prototype.render = function(){
  ctx.save()
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = .5
  ctx.translate(window.innerWidth/2, window.innerHeight)
  for (let i = 0; i < this.axiom.length; i++){
    if (this.axiom[i] === "F"){
      ctx.beginPath()
      ctx.moveTo(0,0)
      ctx.lineTo(0, this.length)
      ctx.stroke()
      ctx.closePath()
      ctx.translate(0, this.length)
    }
    else if (this.axiom[i] === "+"){
      ctx.rotate(this.angle)
    }
    else if (this.axiom[i] === "-"){
      ctx.rotate(this.angle * -1)
    }
    else if (this.axiom[i] === "["){
      ctx.save()
    }
    else if (this.axiom[i] === "]"){
      ctx.restore()
    }
  }
  ctx.restore()
}

function setup(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = 1
  ctx.fillStyle = "#292F36"
  ctx.strokeStyle = "#D4AFB9"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  temp1 = () => {currentSystem.generation()}
  temp2 = () => {currentSystem.render()}
  document.getElementById("generateBtn").addEventListener("click", temp1)
  document.getElementById("generateBtn").addEventListener("click", temp2)
}

setup();
