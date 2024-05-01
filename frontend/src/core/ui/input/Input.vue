<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';
import type { ErrorObject } from '@vuelidate/core';

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  placeholder?: string;
  class?: HTMLAttributes['class'];
  isError?: boolean;
  fieldErrors: ErrorObject[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
});
</script>

<template>
  <div>
    <input
      v-bind="$attrs"
      v-model="modelValue"
      :placeholder="placeholder"
      :class="
        cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />

    <div class="h-3">
      <span class="text-xs text-red-500" v-if="isError && fieldErrors.length">{{
        fieldErrors[0].$message
      }}</span>
    </div>
  </div>
</template>
