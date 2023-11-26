<template>
    <Navbar />
    <TableKebiao v-if="currentcomponent==='kebiao'" :data="timetableData" />
    <Calendar v-if="currentcomponent==='calendar'" />
</template>

<script>
import { mapState } from 'vuex';
import Navbar from './Navbar.vue';
import TableKebiao from './TableKebiao.vue';
import Calendar from './Calendar.vue';

export default{
    components:{
    Navbar,
    TableKebiao,
    Calendar
},
    mounted (){
        console.log('is fine');
        console.log('timetabledata',this.timetableData);
    },
    computed:{
        ...mapState(['currentcomponent'])
    }
};
</script>

<style>
</style>