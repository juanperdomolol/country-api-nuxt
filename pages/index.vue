<template>
  <div class="container">
    <h1>Countries </h1>
    <b-row>
      <b-col>
        <b-nav-form class="mr-5">
          <b-input-group-prepend>
            <b-button
              variant="secondary"
              class="material-icons"
              @click="countrieSearch"
            >
              search
            </b-button>
          </b-input-group-prepend>
          <b-form-input
            v-model="pais"
            class="mr-sm-2"
            placeholder="Buscar"
            @keyup="countrieSearch()"
          ></b-form-input>
        </b-nav-form>
      </b-col>
      <b-col>
        <b-form-select
          v-model="selected"
          :options="options"
          class="sm"
          @change="mostrarContinentes(selected)"
        ></b-form-select>
      </b-col>
    </b-row>

    <div v-if="this.pais">
      <card v-for="(country, i) in countrySearch" :key="i" :country="country" />
    </div>

    <div v-else>
      <card v-for="(country, i) in countries" :key="i" :country="country" />
    </div>
  </div>
</template>

<script>
import card from "../components/card.vue";
import { mapState, mapActions } from "vuex";
export default {
  created() {
    // this.mostrarPaises();
    this.$store.dispatch("mostrarPaises");
  },
  components: {
    card,
  },

  data() {
    return {
      pais: "",
      countrySearch: [],
      selected: null,
      options: [
        { value: null, text: "all", disabled: true },
        { value: "africa", text: "África" },
        { value: "americas", text: "América" },
        { value: "asia", text: "Asia" },
        { value: "europe", text: "Europa" },
        { value: "oceania", text: "Oceanía" },
      ],
    };
  },
  computed: {
    ...mapState(["countries"]),
  },
  methods: {
    async mostrarContinentes(selected) {
      this.countrySearch = await this.$store.dispatch(
        "mostrarPorContinentes",
        selected
      );
    },
    countrieSearch() {
      if (this.pais) {
        this.countrySearch = this.countries.filter((item) => {
          return item.name.toLowerCase().includes(this.pais.toLowerCase());
        });
      }
    },
  },
};
</script>

<style>
</style>