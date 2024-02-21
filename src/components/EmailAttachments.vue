<script setup lang="ts">
import { ref, watch } from "vue";
import Attachment from "../types/Attachment";
const props = defineProps<{
  modelValue: Array<Attachment>;
}>();

const emit = defineEmits(["update:modelValue"]);

const attachments = ref<Array<Attachment>>(props.modelValue ?? []);
watch(
  props,
  (value) => {
    attachments.value = value.modelValue;
  },
  { deep: true },
);

const uploadFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    attachments.value.push({
      name: file.name,
      blobData: e?.target?.result ?? "",
    });
    emit("update:modelValue", attachments.value);
  };
  reader.readAsDataURL(file);
};
const removeAttachment = (index: number) => {
  attachments.value.splice(index, 1);
  emit("update:modelValue", attachments.value);
};
</script>

<template>
  <div class="grid sm:grid-cols-2 sm:grid-auto-columns-1/2 gap-2">
    <div
      v-for="(attachment, aindex) in attachments"
      :key="aindex"
      class="border rounded-md p-6 text-center relative"
    >
      <img :src="attachment.blobData ?? ''" />
      <span>{{ attachment.name }}</span>
      <strong
        class="text-2xl align-center cursor-pointer absolute top-1 right-1"
        @click.prevent="removeAttachment(aindex)"
        >&times;</strong
      >
    </div>
  </div>
  <label
    for="uploadFile"
    class="bg-white text-black text-base rounded w-80 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-8 mb-2 fill-black"
      viewBox="0 0 32 32"
    >
      <path
        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
        data-original="#000000"
      />
      <path
        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
        data-original="#000000"
      />
    </svg>
    Upload file
    <input
      type="file"
      id="uploadFile"
      accept="image/*"
      @change="
        (event) => {
          let files = (<HTMLInputElement>event.target).files ?? [];
          for (var i = 0; i < files.length; i++) {
            uploadFile(files[i]);
          }
        }
      "
      class="hidden"
    />
    <p class="text-xs text-gray-400 mt-2">
      PNG, JPG SVG, WEBP, and GIF are Allowed.
    </p>
  </label>
</template>
