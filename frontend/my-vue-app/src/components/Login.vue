<template>
    <!--在一个表单的提交事件上使用 submit.prevent 时，
        它会阻止表单触发页面重载（这是表单提交的默认行为）。
        这允许你使用 JavaScript（在这种情况下是 Vue 方法）来处理表单数据，
        而不是通过标准的 HTTP 请求发送数据。-->
    <form @submit.prevent="sendClassNumberAndsendgradeNumber">
        <el-input v-model="input1" id="gradeNumber" :placeholder="$t('message.1')" />
        <el-input v-model="input2" id="classNumber" :placeholder="$t('message.2')" />
    </form>
    <button @click="sendClassNumberAndsendgradeNumber()" >
        {{ $t('message.8') }}
            </button>
</template>

<script lang="ts">
import { ref, defineComponent} from 'vue';
import store from '../store';
import { useStore } from 'vuex';

export default defineComponent({
    setup(_, { emit }) {
        const store = useStore();
        const input1 = ref('');
        const input2 = ref('');

        const sendClassNumberAndsendgradeNumber = () => {
            const gradeNumberValue = parseInt(input1.value);
            const classNumberValue = parseInt(input2.value);

            // 检查登录条件
            if (gradeNumberValue >= 1 && gradeNumberValue <= 3 && classNumberValue >= 1 && classNumberValue <= 14) {
                // 符合条件
                store.dispatch('login',{
                    gradeNumber: gradeNumberValue,
                    classNumber: classNumberValue
                });
                console.log('login ok');
            store.dispatch('fetchTimetableData',{
                gradeNumber: gradeNumberValue,
                classNumber: classNumberValue
            });
            } else {
                // 不符合条件
                console.error('登录条件不满足');
                return; // 由于条件不满足，不继续执行后续代码
            }
        };

        return { input1, input2, sendClassNumberAndsendgradeNumber };
    },
    emits: ['loginok'] // 声明自定义事件
});
</script>
