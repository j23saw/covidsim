import p5 from "p5"

export default (p) => {
    p.props = {}
    let w = [];
    let population
    let infPercent
    let size = p.displayWidth/190
    let minInfDist
    let speed
    let testRange = 1.5*size
    let mobWidth = window.screen.availWidth - 10;
    let mobHeight = mobWidth;
    let simCanvasSize = ( window.screen.availWidth > 350 ) ?
       { width: 600, height: 600 } : { width: mobWidth, height: mobHeight };
    p.setup = () => {
      p.createCanvas(simCanvasSize.width, simCanvasSize.height);
    }

    p.reset = () => {
      population = p.props.pop
      infPercent = p.props.inf
      speed = p.props.speed
      minInfDist = p.props.mid
      w = []
      let infPop = p.ceil((infPercent/100)*population)
      for(let i = 0; i < population; i++){
        if(i < infPop){
          w[i] = new Person(true)
        }
        else{
          w[i] = new Person(false);
        }
      } 
    }

    p.draw = () => {
      p.background(30, 41, 46);
      let city = new Rectangle(p.width/2, p.height/2, p.width, p.height)
      let hotspots = new QuadTree(city, 4)
      for(let wanderer of w){
        let point = new Point(wanderer.pos.x, wanderer.pos.y, wanderer)
        hotspots.insert(point)
        wanderer.show()
        wanderer.move() 
      }

      for(let wanderer of w){
        let range = new Circle(wanderer.pos.x, wanderer.pos.y, testRange)
        let points = hotspots.query(range)
        for(let point of points){
          let other = point.userData
          if(wanderer !== other){
            wanderer.checkContact(other)
          }
        }
      }

      if( p.props.pop !== population ||
          p.props.inf !== infPercent ||
          p.props.speed !== speed  ||
          p.props.mid !== minInfDist  )
        {
        p.reset()
      }
    }

    // p.mousePressed = () => {
    //   console.log(p.frameRate(), w, population)
    //   // p.reset()
    // }

    class Person{
      constructor(infected){
          this.pos = new p5.Vector(p.random(p.width), p.random(p.height))
          this.vel = new p5.Vector(0,0)
          this.acc = p5.Vector.random2D()
          this.infected = infected
      }
        
      show(){
          this.infected? p.fill(255, 125, 0):p.fill(6, 224, 17)
          p.noStroke()
          p.ellipse(this.pos.x, this.pos.y, size)
      }
        
      move(){
          let newV = 0||p5.Vector.random2D();
          if(this.acc === newV)
              newV = null;
          this.acc.lerp(newV, 0.1);
          this.vel.add(this.acc)
          this.vel.limit(speed)
          this.pos.add(this.vel)
          if(p.mouseIsPressed){
              p.push()
              p.translate(this.pos.x, this.pos.y)
              p.line(0,0, this.vel.x*10, this.vel.y*10)
              p.pop()
          }
          
          if(this.pos.x < 2){
              
              let desired = new p5.Vector(2, this.vel.y)
              let sforce = desired.sub(this.vel)
              this.vel.add(sforce) 
          }
          if(this.pos.x > p.width - 2){
              
              let desired = new p5.Vector(-2, this.vel.y)
              let sforce = desired.sub(this.vel)
              this.vel.add(sforce) 
          }
          if(this.pos.y < 2){
              
              let desired = new p5.Vector(this.vel.x, 2)
              let sforce = desired.sub(this.vel)
              this.vel.add(sforce) 
          }
          if(this.pos.y > p.height - 2){
              
              let desired = new p5.Vector(this.vel.x, -2)
              let sforce = desired.sub(this.vel)
              this.vel.add(sforce) 
          }     
      }

      checkContact(other){
        if(!this.infected && other.infected){
            let diff = p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
          if(diff < minInfDist){
            this.infected = true   
          }
        }
      }
    }
    
    class Point {
        constructor(x, y, userData) {
          this.x = x;
          this.y = y;
          this.userData = userData;
        }
    }
      
    class Rectangle {
        constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
        }
      
        contains(point) {
          return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h
          );
        }
      
        intersects(range) {
          return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
          );
        }
    }
    
    class Circle {
        constructor(x, y, r) {
          this.x = x;
          this.y = y;
          this.r = r;
          this.rSquared = this.r * this.r;
        }
      
        contains(point) {
          // check if the point is in the circle by checking if the euclidean distance of
          // the point and the center of the circle if smaller or equal to the radius of
          // the circle
          let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
          return d <= this.rSquared;
        }
      
        intersects(range) {
          var xDist = Math.abs(range.x - this.x);
          var yDist = Math.abs(range.y - this.y);
      
          // radius of the circle
          var r = this.r;
      
          var w = range.w;
          var h = range.h;
      
          var edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
      
          // no intersection
          if (xDist > r + w || yDist > r + h) return false;
      
          // intersection within the circle
          if (xDist <= w || yDist <= h) return true;
      
          // intersection on the edge of the circle
          return edges <= this.rSquared;
        }
    }
      
    class QuadTree {
        constructor(boundary, capacity) {
          if (!boundary) {
            throw TypeError('boundary is null or undefined');
          }
          if (!(boundary instanceof Rectangle)) {
            throw TypeError('boundary should be a Rectangle');
          }
          if (typeof capacity !== 'number') {
            throw TypeError(
              `capacity should be a number but is a ${typeof capacity}`
            );
          }
          if (capacity < 1) {
            throw RangeError('capacity must be greater than 0');
          }
          this.boundary = boundary;
          this.capacity = capacity;
          this.points = [];
          this.divided = false;
        }
      
        subdivide() {
          let x = this.boundary.x;
          let y = this.boundary.y;
          let w = this.boundary.w / 2;
          let h = this.boundary.h / 2;
      
          let ne = new Rectangle(x + w, y - h, w, h);
          this.northeast = new QuadTree(ne, this.capacity);
          let nw = new Rectangle(x - w, y - h, w, h);
          this.northwest = new QuadTree(nw, this.capacity);
          let se = new Rectangle(x + w, y + h, w, h);
          this.southeast = new QuadTree(se, this.capacity);
          let sw = new Rectangle(x - w, y + h, w, h);
          this.southwest = new QuadTree(sw, this.capacity);
      
          this.divided = true;
        }
      
        insert(point) {
          if (!this.boundary.contains(point)) {
            return false;
          }
      
          if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
          }
      
          if (!this.divided) {
            this.subdivide();
          }
      
          if (
            this.northeast.insert(point) ||
            this.northwest.insert(point) ||
            this.southeast.insert(point) ||
            this.southwest.insert(point)
          ) {
            return true;
          }
        }
      
        query(range, found) {
          if (!found) {
            found = [];
          }
      
          if (!range.intersects(this.boundary)) {
            return found;
          }
      
          for (let p of this.points) {
            if (range.contains(p)) {
              found.push(p);
            }
          }
          if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
          }
      
          return found;
        }
    }
  }