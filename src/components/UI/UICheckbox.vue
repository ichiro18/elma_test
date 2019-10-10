<template>
  <p-check
    class="p-icon p-smooth"
    :class="{ 'p-round': round }"
    color="primary"
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
      type: Boolean || Object,
      required: true
    },
    round: {
      type: Boolean,
      default: false
    },
    label: String
  }
};
</script>

<style lang="scss">
.p-icon {
  font-size: 30px;
}
</style>
