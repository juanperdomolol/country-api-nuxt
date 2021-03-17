<template>
  <div>
    <b-card
        @click="verPais(country)"
      :title="country.name"
      :img-src="country.flag"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2 mt-4 mr-4"
    >
      <b-card-text>
        <b> Population: </b>{{ country.population | formatNumber }} <br />
        <b>Region: </b>{{ country.region }} <br />
        <b> Capital: </b>{{ country.capital }} <br />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
    },
  },
  filters:{
    formatNumber(value){
      let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  methods:{
      verPais(country){
       this.$store.dispatch('searchByName',country.name)
        this.$router.push(`/countrys/${country.name}`)
      }
  }
};
</script>

<style>
.card {
  float: left;
  width: 250px;
  height: 350px;
}
.card-img, .card-img-top, .card-img-bottom {
    flex-shrink: 0;
    height: 150px;
    width: 100%;
}
</style>