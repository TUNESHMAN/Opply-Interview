<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <span class="text-h5">Suppliers</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" md="12" mt="3">
              This page renders all suppliers and details of a specific
              supplier. To view the details of a specific supplier, simply
              expand the row.
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" xs="12" md="12">
              <v-data-table
                :headers="[
                  { text: '', value: 'data-table-expand' },
                  {
                    text: 'Supplier Name',
                    sortable: true,
                    value: 'name',
                  },
                  { text: 'Supplier Description', value: 'description' },
                ]"
                :search="search"
                :loading="loading"
                :server-items-length="totalItems"
                show-expand
                single-expand
                fixed-header
                loading-text="Loading... Please wait"
                :expanded.sync="expanded"
                :items="suppliers"
                xheight="calc(100vh - 400px)"
                item-key="id"
                @item-expanded="getSpecificSupplierDetails"
                :options.sync="options"
                :footer-props="{
                  'items-per-page-text': 'Suppliers per page:',
                  'items-per-page-all-text': '',
                  'rows-per-page-text': '',
                  'disable-items-per-page': true,
                }"
              >
                <template v-slot:expanded-item="{ headers }">
                  <td :colspan="headers.length">
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in specificSupplierDetails"
                            :key="item.id"
                          >
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </td>
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
export default defineComponent({
  data() {
    return {
      search: "" as string,
      suppliers: [] as any[],
      loading: false as boolean,
      totalItems: 0 as number,
      expanded: [] as any[],
      specificSupplierDetails: [] as any[],
      options: {
        page: 1,
      },
    };
  },
  methods: {
    fetchSuppliers() {
      this.loading = true;
      axiosWithAuth()
        .get(`api/v1/suppliers/?page=${this.options.page}`)
        .then((res: any) => {
          this.loading = false;
          this.suppliers = res.data.results;
          this.totalItems = res.data.count;
        })
        .catch((err: any) => {
          this.loading = false;
          throw new Error(err);
        });
    },
    getSpecificSupplierDetails({ item: item }: { item: any }) {
      axiosWithAuth()
        .get(`api/v1/suppliers/${item.id}/`)
        .then((res: any) => {
          this.specificSupplierDetails = [];
          this.specificSupplierDetails.push(res.data);
        })
        .catch((err: any) => {
          throw new Error(err);
        });
    },
  },
  mounted() {
    this.fetchSuppliers();
  },
  watch: {
    options: {
      handler() {
        this.fetchSuppliers();
      },
      deep: true,
    },
  },
});
</script>

<style></style>
