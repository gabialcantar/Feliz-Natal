var c = document.getElementById('canvas'),
    $ = c.getContext("2d"),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;

function makeItSnow() {
  let snow,
      arr = [],
      num = 1500,
      tsc = 1,
      sp = 1,
      sc = 1.3,
      t = 0,
      mv = 20,
      min = 1;

  for (let i = 0; i < num; ++i) {
    snow = new Flake();
    arr.push(snow);
  }

  function go() {
    window.requestAnimationFrame(go);

    // Limpa o canvas para desenhar a próxima animação
    $.clearRect(0, 0, w, h);

    // Aqui não estamos mais preenchendo o fundo com uma cor preta.
    // O fundo será o verde gradiente definido no CSS.

    // Desenha os flocos de neve
    for (let i = 0; i < arr.length; ++i) {
      let f = arr[i];
      f.t += .05;
      f.t = f.t >= Math.PI * 2 ? 0 : f.t;
      f.y += f.sp;
      f.x += Math.sin(f.t * tsc) * (f.sz * .3);
      if (f.y > h + 50) f.y = -10 - Math.random() * mv;
      if (f.x > w + mv) f.x = - mv;
      if (f.x < - mv) f.x = w + mv;
      f.draw();
    }
  }

  go();

  function Flake() {
    this.x = Math.random() * w;
    this.y = Math.random() * (h + 50);
    this.t = Math.random() * (Math.PI * 2);
    this.sz = (100 / (10 + (Math.random() * 100))) * sc;
    this.sp = (Math.pow(this.sz * 0.8, 2) * 0.15) * sp;
    this.sp = this.sp < min ? min : this.sp;

    this.draw = function() {
      this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
      this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
      this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
      $.moveTo(this.x, this.y);
      $.fillStyle = this.g;
      $.beginPath();
      $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
      $.fill();
    }
  }
}

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
  makeItSnow(); // Reinicia animação após redimensionamento
}, false);

makeItSnow();
