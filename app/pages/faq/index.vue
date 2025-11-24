<template>
  <div>
    <navHeader />
    <div class="mt-8">
      <div>
        <div class="privacy-policy">
          <div class="container">
            <div class="policy-content bg-white p-6 rounded-md shadow-md">
              <h1 class="text-center mb-6 text-3xl font-bold text-gray-800">
                سياسة الاستخدام
              </h1>
              <div class="card">
                <Accordion value="0">
                  <AccordionPanel value="0">
                    <AccordionHeader>
                      ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره
                      ؟</AccordionHeader
                    >
                    <AccordionContent>
                      <p class="m-0">
                        الثروة السمكيةوكيفيةانشاء مزرعة سمكيةكبيرة الثروة
                        السمكية وكيفية انشاء
                      </p>
                    </AccordionContent>
                  </AccordionPanel>
                  <AccordionPanel value="1">
                    <AccordionHeader
                      >ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره
                      ؟</AccordionHeader
                    >
                    <AccordionContent>
                      <p class="m-0">
                        الثروة السمكيةوكيفيةانشاء مزرعة سمكيةكبيرة الثروة
                        السمكية وكيفية انشاء
                      </p>
                    </AccordionContent>
                  </AccordionPanel>
                  <AccordionPanel value="2">
                    <AccordionHeader
                      >ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره
                      ؟</AccordionHeader
                    >
                    <AccordionContent>
                      <p class="m-0">
                        الثروة السمكيةوكيفيةانشاء مزرعة سمكيةكبيرة الثروة
                        السمكية وكيفية انشاء
                      </p>
                    </AccordionContent>
                  </AccordionPanel>
                  <AccordionPanel value="3">
                    <AccordionHeader
                      >ما هي الثروة السمكية وكيفية انشاء مزرعة سمكية كبيره
                      ؟</AccordionHeader
                    >
                    <AccordionContent>
                      <p class="m-0">
                        الثروة السمكيةوكيفيةانشاء مزرعة سمكيةكبيرة الثروة
                        السمكية وكيفية انشاء
                      </p>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerSection />
  </div>
</template>

<script setup>
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
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
