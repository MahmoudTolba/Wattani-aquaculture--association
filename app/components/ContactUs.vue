<script setup lang="ts">
// Optional: Add form logic here later (e.g., Pinia, API call)
const form = reactive({
  firstName: "",
  phone: "",
  message: "",
});

const submitForm = () => {
  console.log("Form submitted:", form);
  alert("تم إرسال الرسالة بنجاح!");
};
</script>

<template>
  <div class="w-full mx-auto p-8">
    <!-- Header -->
    <h1 class="text-2xl md:text-3xl font-bold text-right mb-8">تواصل معنا</h1>

    <p
      class="text-right text-gray-600 text-sm md:text-base leading-relaxed mb-10"
    >
      جمعية وطني للاستنزاع المائي هي جمعية تعاونية سعودية تعمل على تطوير وتنمية
      قطاع الاستنزاع المائي في المملكة العربية السعودية، بما يواكب أهداف رؤية
      المملكة ٢٠٣٠ نحو تحقيق الأمن الغذائي والاستدامة البيئية.
    </p>

    <form @submit.prevent="submitForm" class="space-y-8" dir="rtl">
      <!-- Name & Phone Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name / Client Name -->
        <div>
          <label
            class="block text-right text-black-600 text-sm font-medium mb-2"
          >
            اسم العميل <span class="text-red-600">*</span>
          </label>
          <input
            v-model="form.firstName"
            type="text"
            placeholder="العميل"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-right transition"
          />
        </div>

        <!-- Phone Number with Saudi Flag -->
        <div>
          <label class="block text-right text-sm font-medium mb-2">
            رقم الجوال <span class="text-red-600">*</span>
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
            >
              <img
                src="https://flagcdn.com/16x12/sa.png"
                alt="السعودية"
                class="w-5 h-4 ml-2"
              />
              <span class="text-gray-500 text-sm">+966</span>
            </div>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="رقم الجوال"
              required
              class="w-full pr-5 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-right transition"
            />
          </div>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-right text-black-600 text-sm font-medium mb-2">
          نص الرسالة <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="form.message"
          rows="6"
          placeholder=" الرسالة"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none text-right transition"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <button
          type="submit"
          class="w-full bg-linear-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102"
        >
          إرسال
        </button>
      </div>
    </form>
  </div>
</template>
