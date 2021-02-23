<template>
    <div class="grsb-index">
        <!-- <app-headview :title="title" back="true" :mytitle="this.title" @cutPage="cutPage"></app-headview> -->
        <div class="app-comm-content">
            <grsbinfo @showTitle="getTitle"   ref="grsbinfo" />
        </div>
    </div>
</template>

<script>

    import Grsbinfo from "../../../components/grsblist/grsb-info/grsb-info.vue";
    // import AppHeadview from "../../../components/view/app-headview";

    export default {
        name: "grsb-index",
        components: {Grsbinfo},
        data() {
            return {
                title: "信息填写",
                cutpageid:''
            }
        },
    }
</script>

<style lang="scss">
/*    .grsb-index {
        height: 100%;
        .v-toolbar__content{
            border-bottom: 1px solid #EEEEEE;
        }
    }*/
</style>
