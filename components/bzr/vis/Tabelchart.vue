<template>

  <table v-if='tableData && sortOrders'>
    <thead>
      <tr>
        <th v-for="col in columns"
          @click="sortBy(col)"
          :key="`header-${col}`" 
          :class="{ active: sortKey == col }">
          {{ col }}
          <span class="arrow" :class="sortOrders[col] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" :key="entry.name" >
        <td v-for="col in columns" :key="`body-${col}`">
          {{entry[col]}}
        </td>
      </tr>
    </tbody>
  </table>

</template>


<script>


export default {

  // https://vuejs.org/v2/examples/grid-component.html
  computed: {
    filteredData: function () {
          var sortKey = this.sortKey
          var filterKey = this.filterKey && this.filterKey.toLowerCase()
          var order = this.sortOrders[sortKey] || 1
          var data = this.tableData
          if (sortKey) {
            data = data.slice().sort(function (a, b) {
              a = a[sortKey]
              b = b[sortKey]
              return (a === b ? 0 : a > b ? 1 : -1) * order
            })
          }
          return data
    }
  },
  props: ["visData"],
  data: function () {
    return {
      sortKey: '',
      sortOrders: null,
      tableData: null,
      columns:null
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  },
  created() {

    this.tableData = this.visData;

    const cols = [];
    for(const x in this.visData[0]){
      cols.push(x)
    }
    this.columns = cols;

    let sortOrders = {};
      cols.forEach(function (key) {
      sortOrders[key] = 1
    })
    this.sortOrders = sortOrders;

  }
}



</script>



<style lang="scss" scoped>

  @import "~@/assets/style/variables";


  table {
    border: 1px solid $tsb-darkblue;
    border-radius:2px;
    background-color: #fff;
    // opacity:.7;
    margin: $vis-margin;
  }

  th {
    background-color: $tsb-lightblue;
    color: rgb(255,255,255);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    background-color: #f9f9f9;
  }

  td,th {
    border-right: 1px solid $tsb-darkblue;
    border-bottom: 1px solid $tsb-darkblue;
  }

  td:last-child{
    border-right: none;
  }

  th:last-child{
    border-right: none;
  }

  tr:last-child td{
    border-bottom: none;
  }

  // th, td {
  //     border-bottom: 1px solid #ddd;
  // }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }

  th.active {
    color: #fff;
  }

  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }


</style>