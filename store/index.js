// import axios from "axios";
import _ from "lodash";
import Swal from "sweetalert2";

export const state = () => ({
  exchange: {
    value: 76,
    errors: false
  },
  entries: []
});

export const getters = {
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
};

export const mutations = {
  updateExchange(state, value) {
    state.exchange.value = value || null;
  },
  flagExchangeErrors(state) {
    state.exchange.errors = true;
  },
  updateEntries(state, value) {
    state.entries = value;
  }
};

export const actions = {
  fetchEntries({ commit }) {
    this.$fireStore
      .collection("entries")
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
        Swal.fire("Whoops!", "Error getting documents", "error");
      });
  },

  addEntry({ state, commit }, entry) {
    return this.$fireStore
      .collection("entries")
      .add(entry)
      .then(doc => {
        commit("updateEntries", [...state.entries, { _id: doc.id, ...entry }]);
        Swal.fire("Hooray!", "Entry added successfully", "success");
      })
      .catch(() => {
        Swal.fire("Whoops!", "Error adding document", "error");
      });
  },

  updateEntry({ state, commit }, entry) {
    return this.$fireStore
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
        Swal.fire("Whoops!", "Error updating documents", "error");
      });
  },

  deleteEntry({ state, commit }, entry) {
    return this.$fireStore
      .collection("entries")
      .doc(entry._id)
      .delete()
      .then(() => {
        commit("updateEntries", _.reject(state.entries, ["_id", entry._id]));
        Swal.fire("Hooray!", "Entry deleted successfully", "success");
      })
      .catch(() => {
        Swal.fire("Whoops!", "Error deleting documents", "error");
      });
  }
};
