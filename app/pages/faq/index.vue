<template>
  <div>
    <div class="mt-8">
      <div>
        <div class="privacy-policy">
          <div class="container">
            <!-- Loading State -->
            <div v-if="isLoading" class="policy-content bg-white p-6 rounded-md shadow-md">
              <div class="flex items-center justify-center min-h-[400px]">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a9687] mb-4"></div>
                  <p class="text-gray-600">جاري التحميل...</p>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="policy-content bg-white p-6 rounded-md shadow-md">
              <div class="text-center py-8">
                <p class="text-red-600 mb-4">{{ error }}</p>
                <button
                  @click="fetchFAQContent"
                  class="px-6 py-2 bg-[#0a9687] text-white rounded-md hover:bg-[#088a7b] transition"
                >
                  إعادة المحاولة
                </button>
              </div>
            </div>

            <!-- Content -->
            <div v-else-if="faqItems && faqItems.length > 0" class="policy-content bg-white p-6 rounded-md shadow-md">
              <h1 class="text-center mb-6 text-3xl font-bold text-gray-800">
                الأسئلة المتكررة
              </h1>
              <div class="card">
                <Accordion>
                  <AccordionPanel 
                    v-for="(item, index) in faqItems" 
                    :key="index" 
                    :value="String(index)"
                  >
                    <AccordionHeader>
                      {{ item.question }}
                    </AccordionHeader>
                    <AccordionContent>
                      <div class="m-0" v-html="item.answer"></div>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

// Reactive state
const isLoading = ref(false);
const error = ref(null);
const faqItems = ref([]);

// Parse HTML content to extract Q&A pairs
const parseFAQHTML = (htmlString) => {
  if (!htmlString) return [];
  
  // Check if we're in browser environment
  if (typeof document === 'undefined') {
    // Fallback: use regex parsing for SSR
    const items = [];
    const h3Regex = /<h3>(.*?)<\/h3>/g;
    const pRegex = /<p>(.*?)<\/p>/g;
    
    // Split by h3 tags
    const parts = htmlString.split(/<h3>/);
    
    parts.forEach((part, index) => {
      if (index === 0) return; // Skip first empty part
      
      const h3Match = part.match(/^(.*?)<\/h3>/);
      if (h3Match) {
        const question = h3Match[1].trim();
        const rest = part.substring(h3Match[0].length);
        
        // Extract all paragraphs
        const pMatches = rest.match(/<p>[\s\S]*?<\/p>/g);
        let answer = '';
        if (pMatches) {
          answer = pMatches.join('');
        }
        
        if (question && answer) {
          items.push({ question, answer });
        }
      }
    });
    
    return items;
  }
  
  const items = [];
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  // Find all h3 elements (questions)
  const questions = tempDiv.querySelectorAll('h3');
  
  questions.forEach((questionEl, index) => {
    const question = questionEl.textContent.trim();
    
    // Find the next sibling paragraph (answer)
    let answerEl = questionEl.nextElementSibling;
    let answer = '';
    
    // Collect all paragraphs until the next h3 or end
    while (answerEl && answerEl.tagName !== 'H3') {
      if (answerEl.tagName === 'P') {
        answer += answerEl.outerHTML;
      }
      answerEl = answerEl.nextElementSibling;
    }
    
    if (question && answer) {
      items.push({
        question,
        answer
      });
    }
  });
  
  return items;
};

// Fetch FAQ content from API
const fetchFAQContent = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await $fetch('https://backend.wattani-sa.com/api/v1/frequently_asked_questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // API response structure: { key: "success", msg: "...", data: "..." }
    if (response && response.key === 'success' && response.data) {
      faqItems.value = parseFAQHTML(response.data);
    } else {
      throw new Error(response?.msg || 'فشل في تحميل المحتوى');
    }
  } catch (err) {
    console.error('Error fetching FAQ content:', err);
    error.value = err?.data?.message || err?.message || err?.data?.msg || 'حدث خطأ أثناء تحميل المحتوى. الرجاء المحاولة مرة أخرى.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch content on component mount
onMounted(() => {
  fetchFAQContent();
});
</script>

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
