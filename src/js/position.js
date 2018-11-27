class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  };

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set length(value) {
    const total = value / this.length;
    this.x *= total;
    this.y *= total;
  }
};
