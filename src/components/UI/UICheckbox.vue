<template>
  <p-check
    class="p-icon p-smooth"
    :class="{ 'p-round': round }"
    color="primary"
    :checked="model"
    @change="changeInput"
  >
    <i slot="extra" class="icon fa fa-check"></i>
    <template v-if="label">
      {{ label }}
    </template>
  </p-check>
</template>

<script>
export default {
  name: "UICheckbox",
  props: {
    model: {
      type: Boolean,
      required: true
    },
    round: {
      type: Boolean,
      default: false
    },
    label: String
  },
  methods: {
    changeInput(data) {
      this.$emit("change", data);
    }
  }
};
</script>

<style lang="scss">
.p-icon {
  font-size: 30px;
}
</style>
