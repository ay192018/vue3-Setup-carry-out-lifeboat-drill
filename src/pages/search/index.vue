<template>
  <div
    mb-60px
    w="100%"
    top="100px"
    fixed
    bottom="0"
    overflow="scroll"
    v-Ayy="!loading"
  >
    <Scroll h="100%" overflow="hidden" ref="ScrollRef">
      <div>
        <div mb-20px mx-10px>
          <div
            flex
            items-center
            box-border
            w-full
            py-6px
            h-32px
            class="bg-[var(--c-search-background)]"
            rd-6px
          >
            <div
              class="i-bi-search text-[var(--vt--color-primary)]"
              text-lg
              mx-10px
            />
            <input
              type="text"
              :placeholder="placeholder.showKeyword"
              v-model="searchKey"
              @keydown.enter="enterKey"
              flex-1
              my-5px
              leading-18px
              class="bg-[var(--c-search-background)] text-[var(--text-color)]"
              text-sm
              outline-0
              ref="inputRef"
              @focus="isResultShow = false"
            />
            <transition name="close" appear>
              <div
                class="i-ion-ios-close-circle text-[var(--vt--color-primary)]"
                text-2xl
                mx-10px
                v-if="searchKey.trim() !== ''"
                @click="(searchKey = ''), inputRef.focus()"
              />
            </transition>
          </div>
        </div>
        <transition name="slide" appear>
          <div px-10px v-if="searchKey.trim() === ''">
            <HistorySearch @EmitChangeValue="EmitChangeValue" />
            <HotSearch :HotList="HotList" @EmitChangeValue="EmitChangeValue" />
          </div>
          <SearchSuggest
            v-else-if="searchKey.trim() !== '' && !isResultShow"
            @EmitChangeValue="EmitChangeValue"
            :value="searchKey"
          />
          <SearchResult
            v-else
            ref="resultRef"
            :isPullUpLoad="isPullUpLoad"
            :page="page"
            :value="searchKey"
          />
        </transition>
      </div>
    </Scroll>
  </div>
</template>

<script lang="jsx">
import { $Searchdefault, $HotDefault } from "@/service/search";
import { onMounted, ref, nextTick, watch, computed } from "vue";
import { useSearch } from "@/stores/useSearch";
import { storeToRefs } from "pinia";
import HistorySearch from "./components/historySearch.vue";
import HotSearch from "./components/HotSearch.vue";
import SearchResult from "./components/searchResult.vue";
import SearchSuggest from "./components/searchSuggest.vue";
import Scroll from "@/components/scorll/index.vue";
export default {
  components: {
    HistorySearch,
    HotSearch,
    Scroll,
    SearchSuggest,
    SearchResult,
  },
  setup: () => {
    const placeholder = ref("搜索");
    const searchKey = ref("");
    const HotList = ref([]);
    const inputRef = ref();
    const ScrollRef = ref();
    const isResultShow = ref(false);
    const isPullUpLoad = ref(false);
    const page = ref(1);
    const { historyList } = storeToRefs(useSearch());
    const resultRef = ref();

    // data
    onMounted(async () => {
      const { data } = await $Searchdefault();
      const { data: Hot } = await $HotDefault();
      HotList.value = Hot.data;
      placeholder.value = data.data;
    });
    watch(
      () => searchKey.value.trim() !== "" && isResultShow.value,
      (val) => {
        if (val) {
          console.log(11);
          ScrollRef.value?.scroll.on("pullingUp", () => {
            isPullUpLoad.value = true;
            page.value++;

            ScrollRef.value?.scroll.finishPullUp();
            ScrollRef.value?.scroll.bscroll?.refresh();
            isPullUpLoad.value = false;
          });
        }
      }
    );
    //  function

    const enterKey = () => {
      if (searchKey.value.trim() === "") {
        if (placeholder.value === "搜索") {
          return;
        } else {
          searchKey.value = placeholder.value.realkeyword;
        }
      }
      const index = historyList.value.indexOf(searchKey.value);
      if (index > -1) {
        historyList.value.splice(index, 1);
        historyList.value.unshift(searchKey.value);
      } else {
        if (historyList.value.length === 10) {
          //判断长度为10 就去切尾 ，因为代码走到这里是一定要增加长度的 不需要再上面切
          historyList.value.pop();
        }
        historyList.value.unshift(searchKey.value);
      }
      isResultShow.value = true;
      inputRef.value?.blur();
    };
    return {
      page,
      isPullUpLoad,
      ScrollRef,
      resultRef,
      isResultShow,
      inputRef,
      HotList,
      searchKey,
      placeholder,
      historyList,
      enterKey,
      EmitChangeValue: (value) => {
        console.log(value);
        searchKey.value = value;
        enterKey();
      },
      loading: computed(() => {
        return HotList.value.length;
      }),
    };
  },
};
</script>
