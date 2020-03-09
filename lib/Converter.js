class Converter {
  constructor(cents, currency) {
    this.cents = cents;
    this.currency = currency;
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  }

  withoutFormat() {
    this.formatter = null;
    return this;
  }

  toYear(condition) {
    if (condition) {
      this.cents *= 12;
    }
    return this;
  }

  toUSD() {
    this.cents =
      this.currency === "USD"
        ? this.cents
        : this.cents / this.$store.state.exchange.value;

    return this.get();
  }

  toARS() {
    this.cents =
      this.currency === "ARS"
        ? this.cents
        : this.cents * this.$store.state.exchange.value;

    return this.get();
  }

  toCurrency(currency) {
    return currency === "USD" ? this.toUSD() : this.toARS();
  }

  get() {
    return this.formatter
      ? this.formatter.format(this.cents / 100)
      : this.cents / 100;
  }
}

function convert(value, currency = "USD") {
  return new Converter(value, currency);
}

export default convert;
