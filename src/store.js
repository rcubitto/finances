import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import _ from "lodash";

import db from "@/lib/Database";

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
    entries: [],
    category: {
      label: null,
      income: 0,
      total: 0
    }
  },
  getters: {
    entries: state => type => {
      return state.entries.filter(entry => entry.type === type);
    },
    entriesByRange: (state, getters) => (type, range) => {
      return getters.entries(type).filter(entry => entry.range === range);
    },
    entriesByRangeToUSD: (state, getters) => (type, range) => {
      return getters
        .entriesByRange(type, range)
        .map(entry =>
          entry.currency === "USD"
            ? entry.price
            : entry.price / state.exchange.value
        );
    },
    entriesByRangeToARS: (state, getters) => (type, range) => {
      return getters
        .entriesByRange(type, range)
        .map(entry =>
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
    },
    updateEntries(state, value) {
      state.entries = value;
    },
    updateCategory(state, value) {
      state.category = value;
    }
  },
  actions: {
    // Make an API call to get the current exchange value from U$S to AR$
    fetchExchange({ commit }) {
      axios
        .get("http://ws.geeklab.com.ar/dolar/get-dolar-json.php")
        .then(({ data: { libre } }) => commit("updateExchange", Number(libre)))
        .catch(() => commit("flagExchangeErrors"));
    },
    // Fetch all entries from firestore DB
    fetchEntries({ commit }) {
      db.collection("entries")
        .get()
        .then(snapshot => {
          commit(
            "updateEntries",
            snapshot.docs.map(doc => ({
              _id: doc.id,
              ...doc.data()
            }))
          );
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },

    addEntry({ state, commit }, entry) {
      return db
        .collection("entries")
        .add(entry)
        .then(doc => {
          commit("updateEntries", [
            ...state.entries,
            { _id: doc.id, ...entry }
          ]);
        })
        .catch(err => {
          console.log("Error adding document: ", err);
        });
    },

    updateEntry({ state, commit }, entry) {
      return db
        .collection("entries")
        .doc(entry._id)
        .update(_.omit(entry, "_id"))
        .then(() => {
          const index = _.findIndex(state.entries, ["_id", entry._id]);
          const updatedEntries = _.clone(state.entries);
          updatedEntries[index] = entry;
          commit("updateEntries", updatedEntries);
        })
        .catch(err => {
          console.log("Error updating document: ", err);
        });
    },

    deleteEntry({ state, commit }, entry) {
      return db
        .collection("entries")
        .doc(entry._id)
        .delete()
        .then(() => {
          commit("updateEntries", _.reject(state.entries, ["_id", entry._id]));
        })
        .catch(err => {
          console.log("Error deleting document: ", err);
        });
    },
    updateCategory({ commit }, category) {
      return commit("updateCategory", category);
    }
  },
  strict: process.env.NODE_ENV !== "production"
});
