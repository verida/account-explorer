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
    <div class="content networkstats">
      <h2>Network Statistics</h2>
      <h3>Number of Verida DIDs: {{ activeDIDs }}</h3>
      <div id="growthwrapper">
        <canvas id="growthchart"></canvas>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PulseLoader, SearchInput, SearchList } from "@/components";
import { Chart, registerables } from "chart.js";
import { csv } from "d3";
import { groupBy } from "lodash";
import { defineComponent } from "vue";
import { mapState } from "vuex";

type RawDataRow = { datetime_utc: string; activedids: string };
type RawData = RawDataRow[];
type NormalizedDataRow = { x: string; y: number };
type NormalizedData = NormalizedDataRow[];

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: {
    SearchList,
    SearchInput,
    PulseLoader,
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
    makeChart(normalizedData: NormalizedData) {
      new Chart("growthchart", {
        type: "line",
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
    handleStatsData(data: RawData) {
      const normalizedData = this.normalizeData(data);
      const mostRecentRecord = normalizedData[normalizedData.length - 1];
      this.activeDIDs = mostRecentRecord.y;

      this.makeChart(normalizedData);
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

    csv(`https://assets.verida.io/metrics/stats.csv?cb=${cachebreak}`).then(
      (value) => {
        // d3 is poorly typed and doesn't allow overriding the generic type for the returned data. It is forced as 'string' while it's clearly an object, so have to cast it.
        // A better option would be to validate the data with Zod and infer the type from it.
        this.handleStatsData(value as unknown as RawData);
      }
    );
  },
});
</script>
