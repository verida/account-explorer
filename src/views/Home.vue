<template>
  <div class="home mt-5">
    <div class="content">
      <h1>Network Explorer</h1>
      <p class="mt-1">
        Use this to search through your account. Search what account you have
        access to, and find the DIDs that you need.
      </p>
      <div class="content-search my-3">
        <search-input />
      </div>
      <pulse-loader v-if="loader" />
      <search-list
        v-else-if="profile.name"
        :profile="profile"
        :path="path"
        :url="[`/did/${profile.did}`]"
      />
    </div>
    <div class="landing-image">
      <img src="@/assets/images/Illustration_desktop.svg" alt="desktop" />
    </div>
  </div>

  <div id="networkstats" class="mt-5">
    <h2>Network Statistics</h2>
    <h3>Total Verida DIDs: {{ activeDIDs }}</h3>
    <div class="content networkstats flex-grid-thirds">
      <div class="col">
        <div class="chartwrapper">
          <canvas id="growthchart"></canvas>
        </div>
      </div>
      <div class="col">
        <div class="chartwrapper">
          <canvas id="weekgrowthchart"></canvas>
        </div>
      </div>
      <div class="col">
        <div class="chartwrapper">
          <canvas id="monthgrowthchart"></canvas>
        </div>
      </div>
    </div>
  </div>

  <div id="nodestats" class="mt-5">
    <h2>Node Statisitics</h2>
    <vue-table-lite
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :page-size="50"
      @do-search="nodeSearch"
      @is-finished="tableLoadingFinish"
    />
  </div>
</template>
<script lang="ts">
import { PulseLoader, SearchInput, SearchList } from "@/components";
import { Chart, registerables } from "chart.js";
import { csv, json } from "d3";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { groupBy } from "lodash";
import { defineComponent, reactive } from "vue";
import VueTableLite from "vue3-table-lite/ts";
import { mapState } from "vuex";

type RawDataRow = { datetime_utc: string; activedids: string };
type RawData = RawDataRow[];
type NormalizedDataRow = { x: string; y: number };
type NormalizedData = NormalizedDataRow[];
type SortPeriod = "week" | "month";
type NodeSummaryData = {
  id: string;
  name: string;
  description: string;
  datacenter: string;
  serviceEndpoint: string;
  country: string;
  region: string;
  subregion: string;
  currentUserContexts: number;
  maxUserContexts: number;
};
type NodeSummaryAsFields = {
  [x: string]: string;
};

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: {
    SearchList,
    SearchInput,
    PulseLoader,
    VueTableLite,
  },
  setup() {
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          sortable: true,
          isKey: false,
        },
        {
          label: "Description",
          field: "description",
          sortable: true,
          isKey: false,
        },
        {
          label: "Country",
          field: "country",
          sortable: true,
          isKey: false,
        },
        {
          label: "Region",
          field: "region",
          sortable: true,
          isKey: false,
        },
        {
          label: "Sub Region",
          field: "subregion",
          sortable: true,
          isKey: false,
        },
        {
          label: "Usage",
          field: "usage",
          sortable: true,
          isKey: false,
        },
      ],
      rows: [{}],
      totalRecordCount: 0,
      sortable: {
        order: "subregion",
        sort: "asc",
      },
    });

    const nodeSearch = (
      offset: number,
      limit: number,
      order: string,
      sort: string
    ) => {
      table.isLoading = true;
      const url = `https://assets.verida.io/metrics/nodes/testnet-nodes-summary.json`;

      json(url).then((data) => {
        const nodeSummary: NodeSummaryData[] = data as NodeSummaryData[];

        const rows: NodeSummaryAsFields[] = [];
        for (let n of nodeSummary) {
          rows.push({
            id: n.id,
            name: n.name,
            description: n.description,
            country: n.country,
            region: n.region,
            subregion: n.subregion,
            usage: `${n.currentUserContexts} of ${n.maxUserContexts}`,
          });
        }

        // sort by whatever field is selected as "order"
        rows.sort((a, b) =>
          sort === "asc"
            ? a[order] < b[order]
              ? -1
              : 1
            : a[order] < b[order]
            ? 1
            : -1
        );

        table.rows = rows;
        table.totalRecordCount = nodeSummary.length;
        table.sortable.order = order;
        table.sortable.sort = sort;
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const tableLoadingFinish = (_elements: any) => {
      table.isLoading = false;
    };

    nodeSearch(0, 25, "region", "asc");

    return { table, nodeSearch, tableLoadingFinish };
  },
  data: () => ({
    path: "",
    activeDIDs: 9000,
  }),
  methods: {
    normalizeData(input: RawData): NormalizedData {
      // input is an array of objects like this:
      // {
      // "datetime_utc": "2023-06-07 00:00:00",
      // " activedids": " 3163"
      // },

      // sort the data by date
      const sortedData = input.sort(
        (a, b) =>
          new Date(a.datetime_utc).getTime() -
          new Date(b.datetime_utc).getTime()
      );

      const milliSecondsInDay = 1000 * 3600 * 24;
      const minDate = new Date(sortedData[0].datetime_utc).getTime();
      const maxDate = new Date(
        sortedData[sortedData.length - 1].datetime_utc
      ).getTime();

      // group the data by the day not including the time
      const dataGroupedByDay = groupBy(sortedData, (x) => {
        return x.datetime_utc.substring(0, 10);
      });

      let currentDidCount = parseInt(
        sortedData[0].activedids.replace(/ /g, "")
      );
      const results: NormalizedDataRow[] = [];

      // loop over the days, and set the count for each day
      for (
        let ts = minDate;
        ts <= maxDate + milliSecondsInDay;
        ts = ts + milliSecondsInDay
      ) {
        const dt = new Date(ts);

        // This abomination is due to stupid date handling
        // Need to make sure this will return the format 'yyyy-MM-dd' no matter what locale the user has set.
        // Note that months are zero indexed
        const dtStr = `${dt.getFullYear()}-${(dt.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}-${dt.getUTCDate().toString().padStart(2, "0")}`;

        const dayRecords = dataGroupedByDay[dtStr];
        if (dayRecords) {
          // we have records for this day

          // records are sorted, so find the last one
          currentDidCount = parseInt(
            dayRecords[dayRecords.length - 1].activedids.replace(/ /g, "")
          );
        }
        // if we don't have any records for today, use the last count we have

        results.push({ x: dtStr, y: currentDidCount });
      }

      return results;
    },
    getNormalizeDataOverPeriod(
      normalizedDailyData: NormalizedData,
      period: SortPeriod
    ): NormalizedData {
      const dataGroupedByPeriod = groupBy(normalizedDailyData, (row) => {
        let day = dayjs(row.x, "YYYY-MM-DD");

        // Careful that this string sorts correctly over year boundries
        if (period == "week") {
          return day.format("YYYY WW"); // 2 digit week of year
        } else {
          return day.format("YYYY MM"); // 2 digit month of year
        }
      });

      const normalizedPeriodicData: NormalizedData = [];
      for (const groupKey of Object.keys(dataGroupedByPeriod).sort()) {
        const periodData = dataGroupedByPeriod[groupKey];

        // periodData has a row for each day, sorted by date.
        // Get the last row
        const lastDayData = periodData[periodData.length - 1];
        const firstDayData = periodData[0];
        const day = dayjs(firstDayData.x, "YYYY-MM-DD");

        let displayStr: string;
        if (period == "week") {
          displayStr = day.format("DD MMM YYYY");
        } else {
          displayStr = day.format("MMM YYYY");
        }
        normalizedPeriodicData.push({ x: displayStr, y: lastDayData.y });
      }

      return normalizedPeriodicData;
    },
    makeDIDByDateChart(
      normalizedData: NormalizedData,
      targetCSSID: string,
      title: string
    ) {
      new Chart(targetCSSID, {
        type: "line",
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: title,
              position: "top",
              font: {
                size: 18,
                weight: "bold",
              },
            },
            legend: {
              display: false,
            },
          },
        },
        data: {
          datasets: [
            {
              label: "Verida DIDs",
              data: normalizedData,
              borderColor: "rgb(67, 229, 216)",
              fill: { target: "origin", above: "rgb(227, 227, 227)" },
              tension: 0.1,
            },
          ],
        },
      });
    },
    makeDIDBarChart(
      normalizedData: NormalizedData,
      targetCSSID: string,
      title: string
    ) {
      new Chart(targetCSSID, {
        type: "bar",
        options: {
          responsive: true,
          maintainAspectRatio: false,
          backgroundColor: "rgb(67, 229, 216)",
          plugins: {
            title: {
              display: true,
              text: title,
              position: "top",
              font: {
                size: 18,
                weight: "bold",
              },
            },
            legend: {
              display: false,
            },
          },
        },
        data: {
          datasets: [
            {
              label: "Verida DIDs",
              data: normalizedData,
              borderColor: "rgb(67, 229, 216)",
            },
          ],
        },
      });
    },
    handleStatsData(data: RawData) {
      const normalizedDailyData = this.normalizeData(data);
      const mostRecentRecord =
        normalizedDailyData[normalizedDailyData.length - 1];
      this.activeDIDs = mostRecentRecord.y;

      // Daily data
      this.makeDIDBarChart(
        normalizedDailyData,
        "growthchart",
        "Total Verida DIDs, Daily"
      );

      // Weekly data
      this.makeDIDBarChart(
        this.getNormalizeDataOverPeriod(normalizedDailyData, "week"),
        "weekgrowthchart",
        "Total Verida DIDs, Weekly"
      );

      // Monthly data
      this.makeDIDBarChart(
        this.getNormalizeDataOverPeriod(normalizedDailyData, "month"),
        "monthgrowthchart",
        "Total Verida DIDs, Monthly"
      );
    },
  },
  computed: {
    ...mapState(["profile", "loader"]),
  },
  beforeMount() {
    this.path = this.$route.path;
  },
  mounted() {
    // Request data using D3
    const cachebreak = new Date().getTime();

    csv(
      `https://assets.verida.io/metrics/network/testnet/stats.csv?cb=${cachebreak}`
    ).then((value) => {
      // d3 is poorly typed and doesn't allow overriding the generic type for the returned data. It is forced as 'string' while it's clearly an object, so have to cast it.
      // A better option would be to validate the data with Zod and infer the type from it.
      this.handleStatsData(value as unknown as RawData);
    });
  },
});
</script>
