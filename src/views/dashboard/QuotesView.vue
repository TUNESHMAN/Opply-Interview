<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <span class="text-h5">Quotes</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" md="12" mt="3">
              This page renders all supplier quotes. Quotes whose suppliers
              aren't available are highlighted in red.
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" xs="12" md="12">
              <v-data-table
                :headers="[
                  {
                    text: 'Supplier Id',

                    value: 'supplier_id',
                  },
                  { text: 'Quote Title', value: 'title' },
                  { text: 'Amount', value: 'amount' },
                  { text: 'Created', value: 'created' },
                ]"
                :loading="loading"
                :server-items-length="totalItems"
                fixed-header
                loading-text="Loading... Please wait"
                :items="computedQuotes"
                xheight="calc(100vh - 400px)"
                item-key="id"
                :options.sync="options"
                item-class="rowClass"
                :footer-props="{
                  'items-per-page-text': 'Quotes per page:',
                  'items-per-page-all-text': '',
                  'rows-per-page-text': '',
                  'disable-items-per-page': true,
                }"
              >
                <template v-slot:[`item.amount`]="{ item }">
                  <v-chip color="primary" dark>
                    {{ item.amount }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import moment from "moment";
export default defineComponent({
  data() {
    return {
      quotes: [] as any,
      loading: false as boolean,
      disablePageItems: true as boolean,
      totalItems: 0 as number,
      options: {
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  methods: {
    fetchQuotes() {
      this.loading = true;
      axiosWithAuth()
        .get(`api/v1/quotes/?page=${this.options.page}`)
        .then((res: any) => {
          this.loading = false;
          this.quotes = res.data.results;
          this.totalItems = res.data.count;
        })
        .catch((err: any) => {
          this.loading = false;
          this.$toast.error(`Error fetching quotes, kindly try again!`);
          throw new Error(err);
        });
    },
  },
  mounted() {
    this.fetchQuotes();
  },
  computed: {
    computedQuotes() {
      let returnValue: any = [];
      returnValue = this.quotes;
      returnValue = returnValue.map((item: any) => {
        item.created = moment(item.created).format("YYYY-MM-DD HH:mm:ss");
        item.rowClass =
          item.title === "Supplier no longer available" ? "red lighten-4" : "";
        return item;
      });
      return returnValue;
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchQuotes();
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
.v-select__slot {
  display: none !important;
}
</style>
