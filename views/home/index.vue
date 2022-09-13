<template>
   <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
         <el-card shadow="hover">
            <div class="user">
                <img :src="userImg" />
                <div class="userinfo">
                    <p class="name">Jay</p>
                    <p class="access">超级管理员</p>
                </div>
            </div>
            <div class="login-info">
                <p>上次登陆时间: <span>2022-3-3</span></p>
                <p>上次登陆地点: <span>深圳</span></p>
            </div>
         </el-card>
        <el-card style="margin-top: 20px; height: 460px;">
          <el-table :data="tableData">
               <el-table-column 
               v-for="(val,key) in tableLabel"
               :key="key"
               :prop="key"
               :label="val"
               >
               </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
       <div class="num">
          <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">  
             <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background:item.color }"></i>  
             <div class="detail">
                <p class="num">￥{{ item.value}}</p>
                <p class="txt">{{ item.name}}</p>
             </div>
             </el-card>
             </div>
          <el-card  style="height: 280px">
               <!-- <div style="height: 280px" ref="echarts"0></div> -->
                <echart :chartData="echartData.order" style="height: 280px" />
          </el-card>
          <div class="graph">
            <el-card style="height: 260px">
                <echart :chartData="echartData.user" style="height: 240px" />
            </el-card>
            <el-card style="height: 260px">
                <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" />
            </el-card>
          </div>
      </el-col>
   </el-row>
</template>
<script>
import {getData} from '../../api/data.js'
import * as echarts from 'echarts'
import Echart from '../../src/components/ECharts.vue'

export default {
    name: 'home',
    components: {
        Echart
    },
    data () {
        return {
            userImg: require('../../src/assets/images/user.png'),
            tableData: [
                {
                    name: '奥迪',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 200
                },
                 {
                    name: '布加迪',
                    todayBuy: 100,
                    monthBuy: 260,
                    totalBuy: 600
                },
                 {
                    name: '帕加尼',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 100
                },
                 {
                    name: '宝马',
                    todayBuy: 100,
                    monthBuy: 20,
                    totalBuy: 8200
                },
                 {
                    name: '奔驰',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                }
            ],
            tableLabel: {
                name: '名称',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: '支付订单',
                    value: 124,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '收藏订单',
                    value: 134,
                    icon: 's-goods',
                    color: '#F08080'
                },
                {
                    name: '未支付订单',
                    value: 14,
                    icon: 'star-on',
                    color: '#6495ED'
                },
                {
                    name: '本月未支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '本月收藏订单',
                    value: 124,
                    icon: 'success',
                    color: '#F08080'
                },
                {
                    name: '本月支付订单',
                    value: 1234,
                    icon: 'star-on',
                    color: '#6495ED'
                },
            ],
            echartData: {
                order: {
                    xData:  [],    
                    series: []
                },
                user: {
                    xData:  [],    
                    series: []
                },
                video: {
                    series: []

                }
            }
        }
    },
    
    mounted() {
        
         getData().then(res => {
            const { code,data } = res.data
            if ( code === 20000) {
                this.tableData = data.tableData
                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })
              
                this.echartData.order.xData = xData
                this.echartData.order.series = series
                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series  = [
                            {
                                name: '新增用户',
                                data: data.userData.map(item => item.new),
                                type: 'bar'
                            },
                            {
                                name: '活跃用户',
                                data: data.userData.map(item => item.active),
                                type: 'bar'
                            }
                        ]
        
           
            this.echartData.video.series = [
                    {
                        data: data.videoData,
                        type: 'pie'
                    }
               ]    
            }   
            console.log (res)
         })
    }
} 
</script>
<style>
.home{
    height: 100%;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>
