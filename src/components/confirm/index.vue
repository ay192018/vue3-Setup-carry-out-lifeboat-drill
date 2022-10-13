<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div fixed left-0 right-0 top-0 bottom-0 z-998>
        <div absolute top="50%" left="50%" translate="-50%" z-999>
          <div class="confirm-content" w-270px rd-13px>
            <p py-19px px-15px leading-22px text-center>
              {{ text }}
            </p>
            <div flex items-center text-center>
              <div
                @click="confirm"
                flex-1
                leading-22px
                py-10px
                border-t
                b="#ff6700"
                border-r
              >
                {{ confirmBtnText }}
              </div>
              <div @click="cancel">{{ cancelBtnText }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="jsx">
export default {
  name: "confirm",
  props: {
    text: {
      type: String,
      default: "",
    },
    confirmBtnText: {
      type: String,
      default: "确定",
    },
    cancelBtnText: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  emits: ["confirm", "cancel"],
  methods: {
    confirm() {
      this.hide();
      this.$emit("confirm");
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    hide() {
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
  },
};
</script>
<style scoped>
.confirm-fade-enter-active {
  animation: confirm-fadein 0.3s;
}
.confirm-fade-enter-active .confirm-content {
  animation: confirm-zoom-in 0.3s;
}
.confirm-fade-leave-active {
  animation: confirm-fadeout 0.3s;
}
.confirm-fade-leave-active .confirm-content {
  animation: confirm-zoom-out 0.3s;
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
