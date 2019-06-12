<template>
  <div>
    <HEADER></HEADER>
    <RightSlider></RightSlider>
    <router-view></router-view>
    <FOOTER></FOOTER>
  </div>
</template>
<script>
import RightSlider from "@/components/utils/slider/RightSlider.vue";
import HEADER from "../public/header/index.vue";
import FOOTER from "../public/footer/index.vue";
export default {
  components: {
    HEADER,
    FOOTER,
    RightSlider
  }
};
</script>
<style lang="less" scoped>

</style>

