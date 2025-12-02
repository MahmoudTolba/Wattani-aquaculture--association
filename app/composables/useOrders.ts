// Composable to manage order data
// TODO: When API is ready, replace mock data functions with API calls
// Example: const getOrderById = async (id: string, tab: string) => { return await $fetch(`/api/orders/${id}`) }
export const useOrders = () => {
  // Sample order numbers in Arabic
  const orderNumbers = [
    "٨٥٤٢",
    "٧٢٣١",
    "٩٦٤٨",
    "٣٥٧٩",
    "٨٢٤٦",
    "٥١٣٧",
    "٦٩٢٤",
    "٤٨٦١",
    "٧٥٣٢",
    "٩٢٨٥",
    "٣٦٤٧",
    "٨٧٥١",
    "٤٢٩٦",
    "٦١٨٣",
    "٩٥٤٢",
    "٢٧٤٨",
    "٨٣٦٥",
    "٥٩٢١",
    "٧٤٦٣",
    "٤١٥٨",
  ];

  // Sample departments
  const departments = [
    "القسم دورات وطني",
    "القسم استشارات وطني",
    "القسم خدمات وطني",
    "القسم خبراء وطني",
    "القسم منافع وطني",
  ];

  // Sample course names
  const courseNames = [
    "دورة الاستزراع المائي",
    "دورة تربية الأسماك",
    "دورة إدارة المزارع المائية",
    "دورة الصحة والبيئة المائية",
    "دورة التغذية والأعلاف",
    "دورة التسويق والبيع",
    "دورة الجودة والسلامة",
    "دورة التكنولوجيا الحديثة",
  ];

  // Sample descriptions
  const descriptions = [
    "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    "استشارة متخصصة في تربية الأسماك وإدارة المزارع المائية. تشمل نصائح حول التغذية والصحة والبيئة المثلى للأسماك.",
    "دورة تدريبية شاملة تغطي جميع جوانب الاستزراع المائي من الأساسيات إلى المستويات المتقدمة مع شهادة معتمدة.",
    "خدمة استشارية متكاملة لتطوير مشروعك في مجال الاستزراع المائي مع فريق من الخبراء المتخصصين.",
    "برنامج تدريبي متقدم يركز على تقنيات الإنتاج الحديثة وإدارة الجودة في المزارع المائية.",
  ];

  // Sample locations
  const locations = [
    "الرياض",
    "جدة",
    "الدمام",
    "المدينة المنورة",
    "الطائف",
    "أبها",
    "الخبر",
    "تبوك",
  ];

  // Sample dates
  const dates = [
    "١٣/٤/٢٠٢٥",
    "١٢/٤/٢٠٢٥",
    "١١/٤/٢٠٢٥",
    "١٠/٤/٢٠٢٥",
    "٩/٤/٢٠٢٥",
    "٨/٤/٢٠٢٥",
    "٧/٤/٢٠٢٥",
    "٦/٤/٢٠٢٥",
  ];

  // Sample contact numbers
  const contactNumbers = [
    "٠٥٠٠٠٠٠٠٠٠",
    "٠٥٠١١١١١١١",
    "٠٥٠٢٢٢٢٢٢٢",
    "٠٥٠٣٣٣٣٣٣٣",
    "٠٥٠٤٤٤٤٤٤٤",
  ];

  // Sample prices
  const prices = ["50", "75", "100", "125", "150", "200", "250", "300"];

  // Generate unique order data based on ID
  const generateOrderData = (id: string, status: string, tab: string) => {
    // Use the ID to create a consistent hash for this order
    // Extract numeric part from ID (e.g., "معلق-1" -> 1, "تم القبول-5" -> 5)
    const numericPart = parseInt(id.split("-").pop() || "0") || 0;
    // Also use status string for additional variation
    const statusHash = status.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hash = (numericPart + statusHash) % 1000;
    
    return {
      id,
      orderNumber: orderNumbers[hash % orderNumbers.length],
      status,
      department: departments[hash % departments.length],
      price: prices[hash % prices.length],
      image: "/images/card-img.jpg", // You can make this dynamic too if you have different images
      description: descriptions[hash % descriptions.length],
      location: locations[hash % locations.length],
      date: dates[hash % dates.length],
      contactNumber: contactNumbers[hash % contactNumbers.length],
      courseName: courseNames[hash % courseNames.length],
    };
  };

  // Create orders for a specific tab
  // TODO: Replace with API call: GET /api/orders?tab={tab}&page={page}&limit={limit}
  const createOrders = (status: string, tab: string, count: number = 20) => {
    // Mock data generation - will be replaced with API call
    return Array.from({ length: count }).map((_, index) => {
      const id = `${status}-${index + 1}`;
      return generateOrderData(id, status, tab);
    });
  };

  // Get order by ID (useful for detail page)
  // TODO: Replace with API call: GET /api/orders/{id}
  const getOrderById = (id: string, tab: string) => {
    // Mock data generation - will be replaced with API call
    // Example API call: return await $fetch(`/api/orders/${id}`)
    
    // Extract status from ID or tab
    const statusMap: Record<string, string> = {
      new: "معلق",
      current: "تم القبول",
      finished: "منتهي",
      canceled: "ملغي",
    };
    
    const status = statusMap[tab] || "معلق";
    return generateOrderData(id, status, tab);
  };

  return {
    createOrders,
    getOrderById,
  };
};

