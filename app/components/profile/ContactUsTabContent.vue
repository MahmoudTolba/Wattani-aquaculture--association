<template>
  <div class="space-y-6">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Message Title Field -->
      <div class="space-y-2">
        <label
          for="messageTitle"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          عنوان الرسالة
        </label>
        <input
          id="messageTitle"
          v-model="form.messageTitle"
          type="text"
          placeholder="عنوان"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
        />
      </div>

      <!-- Message Text Field -->
      <div class="space-y-2">
        <label
          for="messageText"
          class="block text-sm sm:text-base font-bold text-gray-800 text-right"
        >
          نص الرسالة
        </label>
        <textarea
          id="messageText"
          v-model="form.messageText"
          placeholder="نص الرسالة"
          rows="6"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#15c472] focus:border-transparent placeholder:text-gray-400"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSending"
        class="w-full bg-linear-to-r from-teal-600 to-green-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:from-teal-700 hover:to-green-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="isSending">جاري الإرسال...</span>
        <span v-else>ارسال</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/user";
import { useAuth } from "~/composables/useAuth";

interface ApiResponse {
  key?: string;
  msg?: string;
  message?: string;
  data?: any;
}

const toast = useToast();
const userStore = useUserStore();
const { user } = useAuth();

const form = reactive({
  messageTitle: "",
  messageText: "",
});

const isSending = ref(false);

const handleSubmit = async () => {
  // Validate form
  if (!form.messageTitle.trim() || !form.messageText.trim()) {
    toast.add({
      severity: "warn",
      summary: "تحذير",
      detail: "يرجى ملء جميع الحقول",
      life: 3000,
    });
    return;
  }

  isSending.value = true;

  try {
    // Get user data from stores
    const firstName = userStore.user?.name || user.value?.name || user.value?.clientName || "مستخدم";
    const phone = userStore.user?.phone || user.value?.phone || user.value?.mobileNumber || "";
    const formattedPhone = phone ? (phone.startsWith("+") ? phone : `+966${phone}`) : "";

    const response = await $fetch<ApiResponse>(
      "https://backend.wattani-sa.com/api/v1/contact-us-send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstName: firstName,
          phone: formattedPhone,
          subject: form.messageTitle,
          message: form.messageText,
        },
      }
    );

    if (response && response.key === "success") {
      toast.add({
        severity: "success",
        summary: "نجح",
        detail: response.msg || "تم إرسال الرسالة بنجاح",
        life: 3000,
      });
      
      // Reset form after successful submission
      form.messageTitle = "";
      form.messageText = "";
    } else {
      throw new Error(response?.msg || "فشل في إرسال الرسالة");
    }
  } catch (error: any) {
    console.error("Error sending contact message:", error);
    toast.add({
      severity: "error",
      summary: "خطأ",
      detail:
        error?.data?.msg ||
        error?.message ||
        "حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.",
      life: 3000,
    });
  } finally {
    isSending.value = false;
  }
};
</script>

