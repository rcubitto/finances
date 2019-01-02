import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    income: {
      value: null,
      range: "monthly",
      margin: "gross"
    },
    exchange: {
      value: null,
      errors: false
  },
  getters: {
    // outcome
    entries: state => type => {
      return state.entries.filter(entry => entry.type === type);
    },
    entriesByRange: (state, getters) => (type, range) => {
      return getters.entries(type).filter(entry => entry.range === range);
    },
    entriesByRangeToUSD: (state, getters) => (type, range) => {
      return getters
        .entriesByRange(type, range)
        .map(
          entry =>
            entry.currency === "USD"
              ? entry.price
              : entry.price / state.exchange.value
        );
    },
    entriesByRangeToARS: (state, getters) => (type, range) => {
      return getters
        .entriesByRange(type, range)
        .map(
          entry =>
            entry.currency === "ARS"
              ? entry.price
              : entry.price * state.exchange.value
        );
    },
    entriesByRangeAndCurrencySum: (state, getters) => (
      type,
      range,
      currency
    ) => {
      return (currency === "ARS"
        ? getters.entriesByRangeToARS(type, range)
        : getters.entriesByRangeToUSD(type, range)
      ).reduce((carry, price) => carry + price, 0);
    }
  },
  mutations: {
    updateExchange(state, value) {
      state.exchange.value = value || null;
    },
    flagExchangeErrors(state) {
      state.exchange.errors = true;
    },
    updateIncomeValue(state, value) {
      state.income.value = value || null;
    },
    updateIncomeRange(state, value) {
      state.income.range = value;
    },
    updateIncomeMargin(state, value) {
      state.income.margin = value;
    }
  },
  actions: {
    // Make an API call to get the current exchange value from U$S to AR$
    fetchExchange({ commit }) {
      axios
        .get("http://ws.geeklab.com.ar/dolar/get-dolar-json.php")
        .then(({ data: { libre } }) => commit("updateExchange", Number(libre)))
        .catch(() => commit("flagExchangeErrors"));
    }
  },
  strict: process.env.NODE_ENV !== "production"
});
