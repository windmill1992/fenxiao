<template>
    <div id="pageContainer">
        <div></div>
        <mu-alert color="success">111</mu-alert>
    </div>
</template>

<script>
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import { Alert, Snackbar, Button, Icon } from 'muse-ui';

export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        Toast.message({ message: '111', time: 0});
    },
    components: {
        
    }
}
Vue.use(Toast);
Vue.use(Alert);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped>

</style>
