<template lang="pug">
label.checkbox(:class="isChecked ? 'checked' : ''")
  input(
    v-model="computedModel"
    @change="checkboxChange"
    type="checkbox"
    :checked="isChecked"
      )
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['checkbox-change']);

const computedModel = computed({
  get: () => props.isChecked,
  set: () => {
    emit('checkbox-change', !props.isChecked);
  },
});

</script>

<style lang="scss">
.checkbox {
  position: relative;
  display: inline-block;
  padding: 4px;
  min-width: 24px;
  width: 24px;
  height: 24px;


  color: #fff;

  border-radius: 4px;
  border: 1px solid var(--text);

  cursor: pointer;

  & input[type="checkbox"] {
    display: none;
  }

  &::before {
      content: '\2713';
      font-size: 24px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: transparent;
    }
  &.checked::before {
    color: var(--primary);
  }
}
</style>
