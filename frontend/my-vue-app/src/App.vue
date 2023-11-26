<script>
import Navbar from './components/Navbar.vue';
import TableKebiao from './components/TableKebiao.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import {mapState,useStore} from 'vuex';
import Calendar from './components/Calendar.vue';

export default{
  components:{
    Navbar,
    TableKebiao,
    Login,
    Home,
    Calendar,
},
computed:{
  ...mapState(['isLoggedIn'])
},
created(){
  const store = useStore();
  store.dispatch('checkLoggedIn');
},
methods:{
  shuRuSuccess(gradeNumber,classNumber){
    const store = useStore();
    store.dispatch('login',{gradeNumber,classNumber});
    this.$router.push('/home');
  }},}
</script>
<template>
  <div>
    <!--if not-->
    <Login v-if="!isLoggedIn"></Login>
    <Home v-else :timetableData="timetableData"></Home>
  </div>
</template>
<style>
</style>