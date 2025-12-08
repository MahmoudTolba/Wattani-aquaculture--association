<template>
  <div>
    <div class="mt-8">
      <div>
        <div class="privacy-policy">
          <div class="container">
            <div class="policy-content bg-white p-6 rounded-md shadow-md">
              <h1 class="text-center mb-6 text-3xl font-bold text-gray-800">
                سياسة الاستخدام
              </h1>
              <p class="mb-4 text-right leading-[44px] text-gray-700">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
                العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
                التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص
                العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي
                أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه
                الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة
                حقيقية لتصميم الموقع.ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة
                على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن
                يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى
                يتحدث عنه التصميم فيظهر بشكل لا يليق.هذا النص يمكن أن يتم تركيبه
                على أي تصميم دون مشكلة فلن يقتاً ومن هنا وجب على المصمم أن يضع
                نصوصا مؤقتة على التصميم
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.privacy-policy {
  direction: rtl;
  min-height: calc(100vh - 150px);
  padding: 2rem 0;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.policy-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

h1 {
  color: #1a365d;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 1rem;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .policy-content {
    padding: 1.5rem;
  }
}
</style>
