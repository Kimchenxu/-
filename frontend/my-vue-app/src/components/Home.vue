<template>
    <Navbar />
    <TableKebiao :data="timetableData" />

</template>

<script>
import Navbar from './Navbar.vue';
import TableKebiao from './TableKebiao.vue';

export default{
    components:{
    Navbar,
    TableKebiao,
},
    mounted (){
        console.log('is fine');
        console.log('timetabledata',this.timetableData);
    },
};
</script>

<style>
</style>