import store from "@/store";

class Converter {
  constructor(value, currency) {
    this.value = value;
    this.currency = currency;
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  }

  toYear(condition) {
    if (condition) {
      this.value *= 12;
    }
    return this;
  }

  toUSD() {
    this.value =
      this.currency === "USD"
        ? this.value
        : this.value / store.state.exchange.value;

    return this.get();
  }

  toARS() {
    this.value =
      this.currency === "ARS"
        ? this.value
        : this.value * store.state.exchange.value;

    return this.get();
  }

  get() {
    return this.formatter.format(this.value);
  }
}

function convert(value, currency = "USD") {
  return new Converter(value, currency);
}

export default convert;
