<template>
  <ul px-10px>
    <li
      flex
      items-center
      flex-basis-10px
      v-for="{ keyword, alg } of SuggestList"
      :key="alg"
      leading-38px
      @click="toSearch(keyword)"
    >
      <div
        class="i-bi-search text-[var(--vt--color-primary)]"
        text-sm
        mx-10px
      />
      <div
        truncate
        border-b
        style="border-color: var(--c-search-background)"
        flex-1
      >
        {{ keyword }}
      </div>
    </li>
  </ul>
</template>

<script lang="jsx">
import { watch, ref } from "vue";
import { $SearchSuggest } from "@/service/search";
export default {
  setup: (props, { emit, attrs }) => {
    const SuggestList = ref([]);
    console.log(emit);
    watch(
      () => attrs?.value,
      async (keywords) => {
        const { data } = await $SearchSuggest({
          keywords,
          type: "mobile",
        });
        SuggestList.value = data.result.allMatch;
        console.log(SuggestList.value);
      },
      {
        immediate: true,
      }
    );
    return {
      SuggestList,
      toSearch: (value) => {
        emit("EmitChangeValue", value);
      },
    };
  },
};
</script>
<style scoped></style>
