<script setup lang="ts">
import { ref } from "vue";
import Mail from "../types/Mail";
import { sendEmail } from "../services/emailService";

const props = defineProps<{ mail?: Mail }>();

const mail = ref<Mail>(
  props.mail
    ? props.mail
    : {
        sendTo: { email: "", name: "" },
        from: { email: "", name: "" },
        replyTo: { email: "", name: "" },
        subject: "",
        body: "",
        isHtml: false,
      },
);
const mailSent = ref(false);
const sendEmailButtonAction = (): void => {
  sendEmail(mail.value)
    .then((status) => {
      mailSent.value = true;
    })
    .catch((error) => {});
};
</script>

<template>
  <div class="card w-full md:w-1/2 m-auto">
    <div class="p-2" v-show="mailSent">
      <div class="bg-green-400 text-green-100 border rounded">
        Mail sent successfully
      </div>
      <button>New Email</button>
      <button>Edit Last</button>
    </div>
    <div class="p-2" v-show="!mailSent">
      {{ mail }}
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
                  class="bg-gray-800 text-white hover:bg-gray-500 p-2 rounded w-64 m-auto"
                  @click.prevent="sendEmailButtonAction"
                >
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
