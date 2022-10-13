<template>
  <div flex justify-between items-center my-10px>
    <h1 font-800>热门搜索</h1>
    <div
      class="i-humbleicons-refresh text-[var(--vt--color-primary)]"
      text-2xl
    ></div>
  </div>
  <ul grid grid-cols-2 gap-4>
    <li
      v-for="({ searchWord, iconUrl }, __) of props?.HotList"
      :key="__"
      @click="toSearch(searchWord)"
      truncate
    >
      <span :class="{ top3: __ <= 3 }">{{ __ + 1 }}</span>
      {{ searchWord }} <img :src="iconUrl" w-25px inline />
    </li>
  </ul>
</template>

<script lang="jsx">
export default {
  props: {
    HotList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  emits: ["EmitChangeValue"],
  setup: (props, { emit }) => {
    console.log(props);
    return {
      props,
      toSearch: (value) => {
        emit("EmitChangeValue", value);
      },
    };
  },
};
</script>
<style scoped>
.top3 {
  color: var(--vt--color-primary);
  font-weight: 800;
}
</style>
