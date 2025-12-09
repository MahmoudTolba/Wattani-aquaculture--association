<template>
  <section class="container mx-auto py-16 px-6">
    <div class="grid md:grid-cols-2 gap-15">
      <!-- Text -->
      <div class="text-right">
        <h3 class="text-gray-500 text-lg mb-2 leading-7">
          {{ aboutData?.title || 'من نحن' }}
        </h3>
        <h1 class="text-3xl font-bold mb-6 leading-tight">
          جمعية وطني للاستزراع المائي
        </h1>
        <p v-if="isLoading" class="leading-[52px] text-xl text-gray-400">
          جاري التحميل...
        </p>
        <p v-else-if="error" class="leading-[52px] text-xl text-red-500">
          {{ error }}
        </p>
        <p v-else-if="aboutData?.content" class="leading-[52px] text-xl">
          {{ aboutData.content }}
        </p>
        <p v-else class="leading-[52px] text-xl">
          هي جمعية تعاونية سعودية تعمل على تطوير وتنمية قطاع الاستزراع المائي في
          المملكة العربية السعودية، بما يواكب أهداف رؤية المملكة 2030 نحو تحقيق
          الأمن الغذائي والاستدامة البيئية. تسعى الجمعية إلى تمكين المزارعين
          والمنتجين في مجال الاستزراع المائي من خلال تقديم الدعم الفني
          والإرشادي، وتعزيز الابتكار في تقنيات الإنتاج، وتوفير بيئة عمل تعاونية
          تسهم في رفع كفاءة وجودة المنتجات المحلية. كما تعمل "وطني" على تشجيع
          المشاريع المستدامة في المياه الداخلية وتوسيع قاعدة الاستثمارات في هذا
          القطاع الحيوي، لتكون ركيزة أساسية في تحقيق التنمية الاقتصادية وتوفير
          فرص العمل للمجتمع المحلي.
        </p>
      </div>
      <!-- Image -->
      <div class="relative w-full h-[80%] hidden 2xl:block xl:block lg:block">
        <div
          class="absolute -top-4 -left-4 w-full h-[80%] bg-[linear-gradient(270deg,#15C472_0.05%,#0A717E_99.95%)] rounded-xl -z-10"
        ></div>
        <img
          src="/images/aboutus-img.png"
          alt="Fish Image"
          class="rounded-xl shadow-lg w-full h-[80%] object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';

// Landing page data
const { landingPageData, isLoading, error, fetchLandingPageData } = useLandingPage();

const aboutData = computed(() => landingPageData.value?.about);

// Fetch content on component mount
onMounted(async () => {
  try {
    await fetchLandingPageData();
  } catch (err) {
    console.error('Failed to load landing page data:', err);
  }
});
</script>

<style scoped></style>
