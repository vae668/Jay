<template>
    <div ref="echart"></div>
</template>
<script>
import * as echart from 'echarts'
export default {
    props: {
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default() {
                return {
                    xData: [],
                    series: []
                }
             }
         }
    },
        watch: {
                chartData: {
                    handler: function () {
                        this.initChart()
                    },
                    deep: true
            }
        },
        methods: {
            initChart() {
               this.initChartData()
               if(this.echart){
                this.echart.setOption(this.options)
               } else {
                   this.echart = echart.init(this.$refs.echart)
                   this.echart.setOption(this.options)
               }
            },
            initChartData() {
                if(this.isAxisChart) {
                    this.axisOption.xAxis.data = this.chartData.xData
                    this.axisOption.series = this.chartData.series
                } else {
                    this.normalOption.series = this.chartData.series
                           
          }
        }
    },
    data() {
        return {
            axisOption: {
                legend: {
                  // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
            },
                grid: {
                left: "20%",
                },
                // 提示框
                tooltip: {
                trigger: "axis",
                },
                xAxis: {
                type: "category", // 类目轴
                data: [],
                axisLine: {
                    lineStyle: {
                    color: "#17b3a3",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
                },
                yAxis: [
                {
                    type: "value",
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
            },  
            normalOption: {
                tooltip: {
                    trigger: "item",
                },
                color: ["#2ec7c9", 
                        "#b645de",
                        "#2e17c9", 
                        "#b6a2de",
                        "#2ec5c9", 
                        "#b642de",
                        "#2e37c9", 
                     ],
                     series: [],  
                     },
                    echart: null   
      }
   },
    computed: {
        options () {
            return this.isAxisChart ? this.axisOption : this.normalOption
        }
    }
}
</script>