<template>
    <div class="content">
        <table id="classDataTable">
            <thead>
                <tr>
                    <th></th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <!-- 根据需要添加更多列 -->
                </tr>
            </thead>
            <tbody>
                <!-- 数据将被填充在这里 -->
            </tbody>
        </table>
        
        </div>
</template>

<script>
import { mapState } from 'vuex';
export default{
    computed:{
        ...mapState(['timetableData'])
    },
    methods:{
    fillTimetableWithData(){
        console.log('filling with data',this.timetableData);
            const data = this.timetableData;
            const tableBody = document.getElementById('classDataTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // 清空旧数据
        
            const maxPeriods = 7; // 假设每天最多有7节课
            for (let period = 1; period <= maxPeriods; period++) {
                const tr = document.createElement('tr');
                let rowData = `<td>${period}</td>`;
        
                for (let day = 1; day <= 5; day++) { // 假设一周5天
                    const classData = data.find(d => d.weekday === day && d.period === period);
                    rowData += `<td>${classData ? classData.content : ''}</td>`;
                }
        
                tr.innerHTML = rowData;
                tableBody.appendChild(tr);
            }
            }
            },
    watch:{
            timetableData(newData){
                if (newData){
                    this.fillTimetableWithData();
                }
            }
    }
            };
</script>

<style>
  .content {
    margin-left: 260px; /* 导航栏宽度加上一些额外空间 */
    padding: 20px; /* 内边距 */
    transition: margin-left 0.3s ease; /* 平滑过渡效果 */
    /* 其他样式根据您的页面设计需要添加 */
  }
</style>