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
    outcomeEntries: state => {
      return state.entries.filter(entry => entry.type === "outcome");
    },
    incomeEntries: state => {
      return state.entries.filter(entry => entry.type === "income");
    },
    monthlyOutcomeEntries: (state, getters) => {
      return getters.outcomeEntries.filter(entry => entry.range === "monthly");
    },
    yearlyOutcomeEntries: (state, getters) => {
      return getters.outcomeEntries.filter(entry => entry.range === "yearly");
    },
    yearlyIncomeEntries: (state, getters) => {
      return getters.incomeEntries.filter(entry => entry.range === "yearly");
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
