import store from "@/store";

class Money {
  constructor(cents, currency) {
    this.cents = cents;
    this.currency = currency;
  }

  exchangeToPesos() {
    if (this.currency === "USD") {
      this.cents = this.cents * store.state.exchange.value;
    }

    return this;
  }

  exchangeToDollars() {
    if (this.currency === "ARS") {
      this.cents = this.cents / store.state.exchange.value;
    }

    return this;
  }

  getCents() {
    return this.cents;
  }

  format() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    return formatter.format(this.cents / 100);
  }
}

function money({ amount, currency = "USD" }) {
  return new Money(amount, currency);
}

export default money;
