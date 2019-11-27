import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    codecs: []
  },
  mutations: {
    setCodecs(state, codecs) {
      state.codecs = codecs;
    },
    updateOneProp(state, payload) {
      var index = state.codecs.findIndex(codec => codec._id === payload.id);
      state.codecs[index][payload.propName] = payload.value;
    },
    deleteCodec(state, codecId) {
      var index = state.codecs.findIndex(codec => codec._id === codecId);
      state.codecs.splice(index, 1);
    },
    addCodec(state, codec) {
      state.codecs.push(codec);
    }
  },
  actions: {
    fetchCodecs({ commit }) {
      axios
        .get("/codecs")
        .then(res => {
          commit("setCodecs", res.data.codecs);
        })
        .catch(error => {
          alert(error);
        });
    },
    updateOneProp({ commit }, payload) {
      axios
        .patch("/codecs/" + payload.id, [
          {
            propName: payload.propName,
            value: payload.value
          }
        ])
        .then(res => {
          if (res.status === 200) {
            commit("updateOneProp", payload);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    updateProps({ commit }, payload) {
      axios
        .patch("/codecs/" + payload.id, payload.props)
        .then(res => {
          if (res.status === 200) {
            for (var prop in payload.props) {
              commit("updateOneProp", {
                id: payload.id,
                propName: payload.props[prop].propName,
                value: payload.props[prop].value
              });
            }
          }
        })
        .catch(error => {
          alert("L'adresse MAC est déjà utilisée.");
        });
    },
    deleteCodec({ commit }, codec) {
      axios
        .delete("/codecs/" + codec._id)
        .then(res => {
          if (res.status === 200) {
            commit("deleteCodec", codec._id);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    shutdownCodec({ commit }, codec) {
      axios
        .get("/codecs/shutdown/" + codec._id)
        .then(res => {
          if (res.status === 200) {
            commit("shutdownCodec", codec._id);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    proximityCodec({ commit }, payload) {
      axios
        .post("/codecs/proximity/" + payload.codec._id, payload.proximityValue)
        .then(res => {
          if (res.status === 200) {
            commit("proximityCodec", {
              codec: payload.codec._id,
              proximityValue: payload.proximityValue
            });
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    addCodec({ commit }, payload) {
      axios
        .post("/codecs/", payload)
        .then(res => {
          if (res.status === 201) {
            commit("addCodec", res.data.codec);
          }
        })
        .catch(error => {
          alert("L'adresse MAC est déjà utilisée.");
        });
    },
    uploadZip({ commit }, data) {
      return axios.post("/codecs/uploadTo", data);
    },
    restoreConfig({ commit }, data) {
      return axios.get("/codecs/restoreConfig/" + data._id);
    }
  },
  getters: {
    codecs: state => {
      return state.codecs;
    }
  }
});
