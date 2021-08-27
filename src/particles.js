import Shape from './shape.js';

import * as Utility from './utility.js';

/*   *   *   *   *   *   *   *   *   *   */

class Wind extends Shape {

    constructor( x, y, r, color, count, speed ) {
        super( x, y, r, color );

        this.count = count;
        this.speed = speed;

        this.particles = null;

        this.init();
    }

    init = () => {

        // fills particles array
        this.particles = new Array( this.count );

        // particles array fill
        for( let i = 0; i < this.count; i++ ) {
            this.particles[i] = {

                x: Utility.randIntRange( 0, this.x ),
                y: Utility.randIntRange( -this.y, this.y ),
                r: Utility.randIntRange( this.r / 4, this.r ),

                speed: (( Math.random() * 2 ) + 1 ) / 2,
            }
        }
    }

    update = ( x, y, speed ) => {

        // speed update
        this.speed = speed;

        // particles position update
        this.particles.forEach( particle => {

            // speed aplay
            particle.y += this.speed * particle.speed;

            // correction
            if (particle.y > particle.r + this.y ) {
                particle.y = -this.y;
            }
        });
    }

    draw = ( ctx ) => {

        // particles draw
        this.particles.forEach( particle => {

            ctx.beginPath();

            ctx.lineWidth = 0.2;
            ctx.fillStyle = this.color;

            ctx.moveTo( particle.x, particle.y );
            ctx.lineTo( particle.x, particle.y + particle.r );

            ctx.stroke();
        });
    }
}

class Trace extends Shape {

    constructor( x, y, r, color, count ) {
        super( x, y, r, color );

        this.count = count;

        this.particles;

        this.init();
    }

    init = () => {

        // fills particles array
        this.particles = new Array( this.count );

        // initial color
        this.color += Utility.randIntRange( 0, 360 );
    }

    update = ( x, y, speed ) => {

        // new particle on place
        this.particles.unshift({
            
            x: x + Utility.randIntRange( 0, 20 ) - 10,
            y: y + this.r + Utility.randIntRange( 0, 10 ) - 5,
            r: Utility.randIntRange( 0.7 * this.r, 1.2 * this.r ),
        });

        // particles position update
        this.particles.forEach( particle => {

            // size increase
            particle.r += 0.05;

            // speed aplay
            particle.y += speed;
        });

        // particles count limit
        this.particles.splice( this.count );

        // color correction
        this.color += speed / ( 10 * Math.log1p( speed ));
    }

    draw = ( ctx ) => {

        // particles draw
        this.particles.forEach( particle => {

            ctx.beginPath();
            ctx.fillStyle = `hsla( ${this.color}, 100%, 50%, 0.8 )`;

            ctx.arc( particle.x, particle.y, particle.r, 0, Math.PI * 2 );
            ctx.fill();
        });
    }
}

/*   *   *   *   *   *   *   *   *   *   */

export { Trace, Wind }