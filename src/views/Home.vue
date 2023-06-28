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
      <h3>Number of Active DIDs: {{ activeDIDs }}</h3>
      <div id="growthwrapper">
        <canvas id="growthchart"></canvas>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PulseLoader, SearchInput, SearchList } from "@/components";
import { Chart, registerables } from "chart.js";
import * as d3 from "d3";
import * as _ from "lodash";
import { defineComponent } from "vue";
import { mapState } from "vuex";

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
    normalizeData(
      input: Array<{ datetime_utc: string; activedids: string }>
    ): Array<{ x: string; y: number }> {
      // input is an array of objects like this:
      // {
      // "datetime_utc": "2023-06-07 00:00:00",
      // " activedids": " 3163"
      // },

      // sort the data by date
      const sortedData = input.sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) =>
          new Date(a.datetime_utc).getTime() -
          new Date(b.datetime_utc).getTime()
      );

      const milliSecondsInDay = 1000 * 3600 * 24;
      const minDate = new Date(sortedData[0].datetime_utc).getTime();
      const maxDate = new Date(
        sortedData[sortedData.length - 1].datetime_utc
      ).getTime();

      // group the data by the day not including the time
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataGroupedByDay = _.groupBy(sortedData, (x: any) => {
        return x.datetime_utc.substring(0, 10);
      });

      let currentDidCount = parseInt(
        sortedData[0].activedids.replace(/ /g, "")
      );
      let results = [];

      // loop over the days, and set the count for each day
      for (
        let ts = minDate;
        ts <= maxDate + milliSecondsInDay;
        ts = ts + milliSecondsInDay
      ) {
        //console.log(i);
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
    makeChart(normalizedData: Array<{ x: string; y: number }>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var chart = new Chart("growthchart", {
        type: "line",
        data: {
          datasets: [
            {
              label: "Active Verida DIDs",
              data: normalizedData,
              borderColor: "rgb(67, 229, 216)",
              fill: { target: "origin", above: "rgb(227, 227, 227)" },
              tension: 0.1,
            },
          ],
        },
      });
    },
    handleStatsData(data: any) {
      const normalizeData = this.normalizeData(
        data as unknown as Array<{ datetime_utc: string; activedids: string }>
      );
      const mostRecentRecord = normalizeData[normalizeData.length - 1];
      this.activeDIDs = mostRecentRecord.y;

      this.makeChart(normalizeData);
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

    d3.csv(`https://assets.verida.io/metrics/stats.csv?cb=${cachebreak}`).then(
      this.handleStatsData
    );
  },
});
</script>
