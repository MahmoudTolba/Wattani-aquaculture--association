<template>
  <div class="min-h-screen bg-white flex justify-center p-4 md:p-10">
    <div class="w-full max-w-[95%] xl:max-w-[1600px] h-full flex gap-8">
      <!-- Sidebar - Contacts List -->
      <div class="w-1/3 hidden md:flex flex-col">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">الرسائل</h1>
        <div class="flex-1 overflow-y-auto space-y-4 pl-2 custom-scrollbar">
          <div
            v-for="contact in contactsData"
            :key="contact.id"
            @click="switchChat(contact.id)"
            :class="[
              'rounded-xl p-4 flex items-center cursor-pointer transition-all duration-200',
              contact.id === activeContactId
                ? 'bg-[#148E84] text-white shadow-md transform scale-[1.02]'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-transparent hover:border-gray-200',
            ]"
          >
            <div class="relative">
              <img
                :src="contact.avatar"
                :class="[
                  'w-12 h-12 rounded-full border-2 object-cover',
                  contact.id === activeContactId
                    ? 'border-white'
                    : 'border-gray-200',
                ]"
                :alt="contact.name"
              />
            </div>
            <div class="mr-3 flex-1 overflow-hidden">
              <div class="flex justify-between items-center mb-1">
                <h3 class="font-bold text-sm truncate">{{ contact.name }}</h3>
                <span
                  :class="[
                    'text-[10px]',
                    contact.id === activeContactId
                      ? 'text-gray-200'
                      : 'text-gray-400',
                  ]"
                >
                  {{ contact.time }}
                </span>
              </div>
              <p
                :class="[
                  'text-xs truncate w-full opacity-90',
                  contact.id === activeContactId
                    ? 'text-gray-100'
                    : 'text-gray-500',
                ]"
              >
                {{ contact.lastMessage }}
              </p>
            </div>
            <div
              v-if="contact.unread > 0 && contact.id !== activeContactId"
              class="w-5 h-5 bg-[#FF5A5F] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
            >
              {{ contact.unread }}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Chat Window -->
      <div
        class="flex-1 bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden relative"
      >
        <!-- Header -->
        <div
          class="p-6 border-b border-gray-50 flex justify-between items-center bg-white z-10"
        >
          <div class="flex items-center">
            <img
              :src="activeContact?.avatar"
              :alt="activeContact?.name"
              class="w-10 h-10 rounded-full border border-gray-200 object-cover"
            />
            <div class="mr-3">
              <h2 class="font-bold text-gray-800 text-lg leading-none">
                {{ activeContact?.name || "..." }}
              </h2>
              <span class="text-xs text-green-500 flex items-center gap-1 mt-1">
                <span
                  class="w-2 h-2 bg-green-500 rounded-full inline-block"
                ></span>
                متصل الآن
              </span>
            </div>
          </div>
          <div
            class="h-12 w-1.5 bg-gray-200 rounded-full opacity-50 absolute left-4 top-20 hidden md:block"
          ></div>
        </div>

        <!-- Messages Container -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white"
        >
          <div
            v-for="(msg, index) in activeContact?.messages"
            :key="index"
            :class="[
              'flex items-start',
              msg.type === 'outgoing' ? 'justify-end' : '',
            ]"
          >
            <!-- Incoming Message -->
            <template v-if="msg.type === 'incoming'">
              <div class="flex items-start">
                <img
                  :src="activeContact?.avatar"
                  class="w-8 h-8 rounded-full ml-3 mt-1 object-cover"
                  :alt="activeContact?.name"
                />
                <div class="flex flex-col items-start max-w-[75%]">
                  <div
                    class="bg-[#EEEEEE] text-gray-800 px-4 py-3 rounded-2xl rounded-tr-none text-sm leading-relaxed shadow-sm"
                  >
                    {{ msg.text }}
                  </div>
                </div>
              </div>
            </template>

            <!-- Outgoing Message -->
            <template v-else>
              <div class="flex items-end justify-end">
                <div class="flex flex-col items-end max-w-[75%]">
                  <div
                    class="bg-[#F7F7F7] text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed text-right border border-gray-100 shadow-sm"
                  >
                    {{ msg.text }}
                  </div>
                  <span class="text-[10px] text-gray-300 mt-1 mr-1">الآن</span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-6 bg-white">
          <div
            class="relative border-t border-gray-100 pt-4 flex items-center gap-4"
          >
            <input
              v-model="messageInput"
              type="text"
              @keypress.enter="sendMessage"
              class="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full focus:ring-[#148E84] focus:border-[#148E84] block p-4 pr-5 outline-none transition"
              placeholder="اكتب رسالتك هنا..."
              autocomplete="off"
            />
            <button
              @click="sendMessage"
              class="bg-[#009688] hover:bg-[#00796b] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition transform active:scale-95 shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform -rotate-45 translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";

// Mock Data
const contactsData = ref([
  {
    id: 1,
    name: "محمد عبد الله",
    avatar: "https://i.pravatar.cc/150?img=11",
    time: "منذ 3 دقائق",
    unread: 0,
    lastMessage: "هل يمكنك إرسال الملفات؟",
    messages: [
      { type: "incoming", text: "مرحباً، هل الملفات جاهزة؟" },
      { type: "outgoing", text: "أهلاً محمد، نعم سأرسلها حالاً." },
      { type: "incoming", text: "ممتاز، في انتظارك." },
    ],
  },
  {
    id: 2,
    name: "محمد رشاد",
    avatar: "https://i.pravatar.cc/150?img=13",
    time: "منذ 10 دقائق",
    unread: 2,
    lastMessage: "شكراً جزيلاً لك",
    messages: [
      { type: "incoming", text: "السلام عليكم" },
      { type: "incoming", text: "هل تم تأكيد الموعد؟" },
    ],
  },
  {
    id: 3,
    name: "ياسر البنهوري",
    avatar: "https://i.pravatar.cc/150?img=60",
    time: "منذ ساعة",
    unread: 5,
    lastMessage: "تم استلام الطلب",
    messages: [
      { type: "incoming", text: "مساء الخير يا بشمهندس" },
      { type: "outgoing", text: "مساء النور، تفضل" },
      { type: "incoming", text: "بخصوص المشروع الجديد.." },
    ],
  },
]);

const activeContactId = ref(1);
const messageInput = ref("");
const messagesContainer = ref(null);

// Computed
const activeContact = computed(() => {
  return contactsData.value.find((c) => c.id === activeContactId.value);
});

// Methods
function switchChat(id) {
  activeContactId.value = id;
  const contact = contactsData.value.find((c) => c.id === id);
  if (contact) {
    contact.unread = 0;
  }
  scrollToBottom();
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "" || !activeContact.value) return;

  // Add user message
  activeContact.value.messages.push({ type: "outgoing", text: text });
  activeContact.value.lastMessage = "أنت: " + text;
  messageInput.value = "";

  scrollToBottom();

  // Simulate auto reply
  setTimeout(() => {
    const replies = [
      "تمام، فهمت عليك",
      "سأقوم بمراجعة الأمر",
      "شكراً لك!",
      "هل يمكننا التحدث لاحقاً؟",
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    if (activeContact.value) {
      activeContact.value.messages.push({
        type: "incoming",
        text: randomReply,
      });
      activeContact.value.lastMessage = randomReply;
      scrollToBottom();
    }
  }, 1000);
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

// Watch for message changes to auto-scroll
watch(
  () => activeContact.value?.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

/* Animation for new messages */
.fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
