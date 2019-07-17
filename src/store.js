import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import _ from "lodash";
import Swal from "sweetalert2";

import db from "@/lib/Database";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    exchange: {
      value: null,
      errors: false
    },
    entries: []
  },
  getters: {
    entries: state => (filters, tagsToFilter = []) => {
      return _(state.entries)
        .filter(filters)
        .filter(
          entry =>
            tagsToFilter.length === 0 || // if no tags selected, skip
            _.intersection(entry.tags, tagsToFilter).length ===
              tagsToFilter.length
        )
        .sortBy([entry => entry.amount < 0]) // 'income' first
        .value();
    },
    tags: state => {
      return _(state.entries)
        .map(entry => entry.tags)
        .flatten()
        .uniq()
        .filter()
        .value();
    }
  },
  mutations: {
    updateExchange(state, value) {
      state.exchange.value = value || null;
    },
    flagExchangeErrors(state) {
      state.exchange.errors = true;
    },
    updateEntries(state, value) {
      state.entries = value;
    }
  },
  actions: {
    // Make an API call to get the current exchange value from U$S to AR$ (Argentinean peso)
    fetchExchange({ commit }) {
      // axios.get("...")
      // .then(({ data: { rates: { USDARS: { rate } } } }) =>
      commit("updateExchange", Number(42.55));
      // )
      // .catch(() => commit("flagExchangeErrors"));
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
        .catch(() => {
          Swal.fire({
            title: "Whoops!",
            text: "Error getting documents",
            type: "Error "
          });
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
        .catch(() => {
          Swal.fire({
            title: "Whoops!",
            text: "Error adding document",
            type: "Error "
          });
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
        .catch(() => {
          Swal.fire({
            title: "Whoops!",
            text: "Error updating documents",
            type: "Error "
          });
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
        .catch(() => {
          Swal.fire({
            title: "Whoops!",
            text: "Error deleting documents",
            type: "Error "
          });
        });
    }
  },
  strict: process.env.NODE_ENV !== "production"
});
