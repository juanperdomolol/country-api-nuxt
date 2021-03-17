<template>
  <div v-if="info.length" class="container">
    <h1>{{ info[0].name }}</h1>

    <b-card :img-src="info[0].flag" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        <b> Population:</b>{{ info[0].population  | formatNumber }} <br />
        <b>Region: </b>{{ info[0].region }} <br />
        <b> Capital: </b>{{ info[0].capital }} <br />
        <b> top Level Domain: </b>{{ info[0].topLevelDomain[0] }} <br />
        <p>
          <b> Languages: </b>
          <small
            class="text-sm mx-auto"
            v-for="(lang, i) in info[0].languages"
            :key="i"
          >
            {{ lang.name }}
          </small>
        </p>
        <br />
        <b> Native Name: </b>{{ info[0].nativeName }} <br />
        <b> Borders: </b>
        <b-row>
          <div v-for="(lim, i) in info[0].borders" :key="i">
            <b-button class="boton" @click="changePais(lim)">{{ lim }}</b-button>
          </div>
        </b-row>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  mounted() {
    // this.$store.dispatch('cargarPais')
    this.cargarPais();
  },
  data() {
    return {
      info: [],
    };
  },
  //   computed: {
  //   ...mapState(["info"]),
  // },
  filters:{
    formatNumber(value){
      let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  methods: {
    async cargarPais() {
      try {
        const dataResponse = await this.$store.dispatch("cargarPais");
        this.info = dataResponse;
        // console.log(dataResponse)
      } catch (error) {
        console.log(error);
      }
    },

    // async cargarPais() {
    //   this.info = [];
    //   // this.countres.find(item => (item.code ))
    //   const obtener = await axios.get(
    //     `https://restcountries.eu/rest/v2/name/${this.$route.params.country}`
    //   );

    //   this.info = obtener.data;
    // },
    async changePais(lim) {
      //this.$router.push(`/countrys/${lim}`)
      // console.log('limite', lim);
      const country = await this.$store.dispatch("getcountryLimit", lim);

      this.info = country;
    },
  },
};
</script>

<style>
.boton{
 border-radius: 28px;
 text-shadow: 3px 2px 1px #9daef5;
  -webkit-box-shadow: 6px 5px 24px #666666;
  -moz-box-shadow: 6px 5px 24px #666666;
  box-shadow: 6px 5px 24px #666666;
  font-family: Arial;
  color: #fafafa;
  font-size: 10px;
  padding: 10px;
  text-decoration: none;

  background-image: -webkit-linear-gradient(top, #eb94d0, #2079b0);
  background-image: -moz-linear-gradient(top, #eb94d0, #2079b0);
  background-image: -ms-linear-gradient(top, #eb94d0, #2079b0);
  background-image: -o-linear-gradient(top, #eb94d0, #2079b0);
  background-image: linear-gradient(to bottom, #eb94d0, #2079b0);
}

.boton:hover{
      background-color: #008CBA;
      color: white;
 }

</style>