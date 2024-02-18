<script setup lang="ts">
import { ref } from "vue";
import Mail from "../types/Mail";
import { sendEmail } from "../services/emailService";

const props = defineProps<{ mail?: Mail }>();

const emptyEmailModel = {
  sendTo: { email: "", name: "" },
  from: { email: "", name: "" },
  subject: "",
  body: "",
  isHtml: false,
};
const mail = ref<Mail>(
  props.mail ? props.mail : JSON.parse(JSON.stringify(emptyEmailModel)),
);
const mailSent = ref(false);
const sendingEmail = ref(false);
const sendEmailButtonAction = (): void => {
  sendingEmail.value = true;
  sendEmail(mail.value)
    .then((status) => {
      if (status.status == "ok") {
        mailSent.value = true;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      sendingEmail.value = false;
    });
};
const createNewEmail = (): void => {
  mailSent.value = false;
  mail.value = JSON.parse(JSON.stringify(emptyEmailModel));
};
const editLastEmail = (): void => {
  mailSent.value = false;
};
</script>

<template>
  <div class="card w-full md:w-1/2 m-auto">
    <div class="p-2 text-center" v-show="mailSent">
      <div class="bg-green-100 text-green-700 border rounded p-2 my-2">
        Mail sent successfully
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
        @click.prevent="createNewEmail"
      >
        New Email
      </button>
      <button
        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mx-1"
        @click.prevent="editLastEmail"
      >
        Edit Last
      </button>
    </div>
    <div class="p-2" v-show="!mailSent">
      <h2 class="text-2xl font-bold">Send Email</h2>
      <div class="mt-8">
        <div class="grid grid-cols-1 gap-6">
          <label class="block">
            <span class="text-gray-700">To name</span>
            <input
              type="text"
              v-model="mail.sendTo.name"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
            />
          </label>
          <label class="block">
            <span class="text-gray-700">To Email address</span>
            <input
              type="email"
              v-model="mail.sendTo.email"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="john@example.com"
            />
          </label>
          <label class="block">
            <span class="text-gray-700">From name</span>
            <input
              type="text"
              v-model="mail.from.name"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
            />
          </label>
          <label class="block">
            <span class="text-gray-700">From Email address</span>
            <input
              type="email"
              v-model="mail.from.email"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="john@example.com"
            />
          </label>
          <label class="block">
            <span class="text-gray-700">Subject</span>
            <input
              type="text"
              v-model="mail.subject"
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
            />
          </label>
          <label class="block">
            <span class="text-gray-700">Email message</span>
            <textarea
              class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              rows="6"
              v-model="mail.body"
            ></textarea>
          </label>
          <label class="block">
            <span class="text-gray-700">Email type</span>
            <select
              class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              v-model="mail.isHtml"
            >
              <option value="true">Html</option>
              <option value="false">Text</option>
            </select>
          </label>
          <div class="block">
            <div class="mt-2">
              <div class="text-center">
                <button
                  class="bg-gray-800 text-white hover:bg-gray-500 p-2 rounded w-64 m-auto inline-flex items-center justify-center"
                  @click.prevent="sendEmailButtonAction"
                  :disabled="sendingEmail"
                >
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    v-show="sendingEmail"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
