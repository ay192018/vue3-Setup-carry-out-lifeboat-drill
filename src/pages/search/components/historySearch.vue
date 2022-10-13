Confirm
<template>
  <div v-show="historyList.length">
    <div flex justify-between items-center my-10px>
      <h1 font-800>历史搜索</h1>
      <button
        @click="add"
        class="i-material-symbols-delete-outline text-[var(--vt--color-primary)] text-2xl"
      ></button>
    </div>

    <transition-group name="list" appear tag="ul">
      <li
        v-for="(_, __) of historyList"
        :key="__"
        inline-block
        px-10px
        py-5px
        ml-5px
        mr-10px
        rd-6px
        mb-10px
        class="bg-[var(--c-search-background)]"
        @click="toSearch(_)"
      >
        {{ _ }}
      </li>
    </transition-group>
  </div>
</template>

<script lang="jsx">
import { useSearch } from "@/stores/useSearch";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { Dialog } from "vant";

export default {
  components: { Dialog },
  setup: (props, { emit }) => {
    const { historyList } = storeToRefs(useSearch());
    const Search = useSearch();

    return {
      emit,
      historyList,
      add: () => {
        Dialog.confirm({
          title: "清除",
          message: "是否清除历史搜索记录？",
        })
          .then(() => {
            Search.$reset();
          })
          .catch(() => {
            // on cancel
          });
      },
      clearSearch: () => {
        console.log(11);
      },
      toSearch: (value) => {
        emit("EmitChangeValue", value);
      },
    };
  },
};
</script>
<style scoped></style>
