<template>
  <div class="d-flex justify-content-center" ref="p5Canvas"></div>
</template>

<script>
import P5 from 'p5';

export default {
  data() {
    return {
      p5canvas: '',
      eye1: {},
      eye2: {},
    };
  },
  mounted() {
    const script = (_p5) => {
      // These are your typical setup() and draw() methods
      const p5 = _p5;
      p5.setup = () => {
        p5.createCanvas(400, 400);
        this.eye1 = {
          x: p5.width / 2,
          y: p5.height / 2,
          rad: 140,
        };
      };
      p5.draw = () => {
        p5.background('#121220');

        const ang = p5.atan2(p5.mouseY - this.eye1.y, p5.mouseX - this.eye1.x);

        p5.fill('#121220');
        p5.stroke('#888792');
        p5.strokeWeight(2);
        p5.ellipse(this.eye1.x, this.eye1.y, this.eye1.rad);
        p5.fill('#888792');
        p5.ellipse(
          this.eye1.x + (this.eye1.rad / 2.5) * p5.cos(ang),
          this.eye1.y + (this.eye1.rad / 2.5) * p5.sin(ang),
          this.eye1.rad / 10,
        );
      };
    };
    // Attach the canvas to the div
    this.p5canvas = new P5(script, this.$refs.p5Canvas);
  },
};
</script>
