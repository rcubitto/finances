class Formatter {
  constructor(value) {
    this.value = value;

    this.handler = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  }

  yearlyIf(condition) {
    this.value *= condition ? 12 : 1;
    return this;
  }

  toARS(exchange) {
    this.value *= exchange;
    return this.get();
  }

  toUSD(exchange) {
    this.value /= exchange;
    return this.get();
  }

  get() {
    return this.handler.format(this.value);
  }
}

function format(value) {
  return new Formatter(value);
}

export default format;
