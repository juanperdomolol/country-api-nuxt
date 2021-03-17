const URL = "https://restcountries.eu/rest/v2";
export const state = () => ({
  countries: [],
  select : '',
  info: []
});

export const mutations = {
  getInfoCountry(state,payload){
    state.info = payload
  },
  getCountries(state, payload) {
    state.countries = payload;
  },
  getForCountries(state,payload){
    state.countries = payload;
  },
  setSelect(state,payload){
    state.select = payload
  }
};

export const actions = {
  async searchByName({commit},payload){
    commit('setSelect',payload)
  },
  async cargarPais({state,commit}) {
    const info = await state.countries.filter(item =>item.name.includes(state.select)).map(data =>{
      return{
        name: data.name,
        nativeName: data.nativeName,
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital,
        topLevelDomain: data.topLevelDomain,
        currencies: data.currencies,
        languages: data.languages,
        borders: data.borders,
        flag: data.flag,
        alpha3Code: data.alpha3Code
      }
    })
    console.log(info)

    commit('getInfoCountry',info)

    return info
  },


  async mostrarPaises({ commit }) {
    const countries = await this.$axios.$get(
      "https://restcountries.eu/rest/v2/all"
    );
    const data = countries.map(item => {
      return {
        name: item.name,
        nativeName: item.nativeName,
        population: item.population,
        region: item.region,
        subregion: item.subregion,
        capital: item.capital,
        topLevelDomain: item.topLevelDomain,
        currencies: item.currencies,
        languages: item.languages,
        borders: item.borders,
        flag: item.flag,
        alpha3Code: item.alpha3Code
      };
    });
    commit("getCountries", data);
    return data;
  },
  async mostrarPorContinentes({commit},payload) {
    

    const countries = await this.$axios.get(
      `https://restcountries.eu/rest/v2/region/${payload}`
    );

    const data = countries.data.map(item => {
      return {
        name: item.name,
        nativeName: item.nativeName,
        population: item.population,
        region: item.region,
        subregion: item.subregion,
        capital: item.capital,
        topLevelDomain: item.topLevelDomain,
        currencies: item.currencies,
        languages: item.languages,
        borders: item.borders,
        flag: item.flag,
        alpha3Code: item.alpha3Code

      };
    });
    commit('getForCountries',data)
    return countries
  },
  async getcountryLimit({state},payload) {
    const info = await state.countries.filter(item =>item.alpha3Code.includes(payload)).map(data =>{
      return{
        name: data.name,
        nativeName: data.nativeName,
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital,
        topLevelDomain: data.topLevelDomain,
        currencies: data.currencies,
        languages: data.languages,
        borders: data.borders,
        flag: data.flag,
        alpha3Code: data.alpha3Code
      }
    })
    return info
  }
};
