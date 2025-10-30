import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Product = {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  details: { en: string[]; ar: string[] };
  image: {
    url: string;
    hint: string;
  };
};

const getProductImage = (id: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === id);
    return {
        url: placeholder?.imageUrl || 'https://picsum.photos/seed/default/600/400',
        hint: placeholder?.imageHint || 'product image'
    };
};

export const products: Product[] = [
  {
    id: "prod-01",
    name: {
      en: "CyberCorp Security Keychain",
      ar: "سلسلة مفاتيح CyberCorp الأمنية"
    },
    description: {
      en: "A sleek, durable keychain designed for a leading cybersecurity firm, featuring a debossed logo and metallic accents.",
      ar: "سلسلة مفاتيح أنيقة ومتينة مصممة لشركة رائدة في مجال الأمن السيبراني، تتميز بشعار منقوش وتفاصيل معدنية."
    },
    details: {
      en: ["Material: High-density PVC", "Process: 2D Layered Molding", "Attachment: Blackened Nickel Keyring", "Use Case: Corporate Swag"],
      ar: ["المادة: PVC عالي الكثافة", "العملية: قولبة ثنائية الأبعاد متعددة الطبقات", "الملحق: حلقة مفاتيح من النيكل الأسود", "الاستخدام: هدايا الشركات"]
    },
    image: getProductImage("portfolio-1"),
  },
  {
    id: "prod-02",
    name: {
      en: "Adventure Co. Explorer Patch",
      ar: "رقعة Adventure Co. للمستكشفين"
    },
    description: {
      en: "A rugged, weather-resistant patch for an outdoor apparel brand, with intricate details and a heat-sealed backing.",
      ar: "رقعة قوية مقاومة للطقس لعلامة تجارية للملابس الخارجية، بتفاصيل دقيقة وظهر قابل للتثبيت بالحرارة."
    },
    details: {
      en: ["Material: Eco-friendly Soft Rubber", "Process: 3D Injection Molding", "Backing: Iron-on Adhesive", "Use Case: Apparel & Gear"],
      ar: ["المادة: مطاط ناعم صديق للبيئة", "العملية: قولبة بالحقن ثلاثية الأبعاد", "الظهر: لاصق بالكي", "الاستخدام: الملابس والمعدات"]
    },
    image: getProductImage("portfolio-2"),
  },
  {
    id: "prod-03",
    name: {
      en: "QuantumLeap Tech Logo",
      ar: "شعار QuantumLeap التقني"
    },
    description: {
      en: "Promotional keychain showcasing a complex logo with vibrant, precise color-filling for a tech startup.",
      ar: "سلسلة مفاتيح ترويجية تعرض شعارًا معقدًا بألوان زاهية ودقيقة لشركة تقنية ناشئة."
    },
    details: {
      en: ["Material: Non-toxic Silicone", "Process: Automated Color Dispensing", "Feature: Glow-in-the-dark elements", "Use Case: Event Giveaway"],
      ar: ["المادة: سيليكون غير سام", "العملية: توزيع ألوان آلي", "الميزة: عناصر تتوهج في الظلام", "الاستخدام: هدايا الفعاليات"]
    },
    image: getProductImage("portfolio-3"),
  },
  {
    id: "prod-04",
    name: {
      en: "Nomad Outfitter's Morale Patch",
      ar: "رقعة معنويات Nomad Outfitter"
    },
    description: {
      en: "Durable morale patch with hook-and-loop backing, designed to withstand extreme conditions for tactical gear.",
      ar: "رقعة معنويات متينة مع ظهر لاصق (فيلكرو)، مصممة لتحمل الظروف القاسية للمعدات التكتيكية."
    },
    details: {
      en: ["Material: Heavy-duty PVC Rubber", "Process: Multi-layer 3D Molding", "Backing: Hook & Loop (Velcro)", "Use Case: Tactical & Outdoor"],
      ar: ["المادة: مطاط PVC شديد التحمل", "العملية: قولبة ثلاثية الأبعاد متعددة الطبقات", "الظهر: شريط لاصق (فيلكرو)", "الاستخدام: تكتيكي وخارجي"]
    },
    image: getProductImage("portfolio-4"),
  },
  {
    id: "prod-05",
    name: {
      en: "Pixel Pals Character Set",
      ar: "مجموعة شخصيات Pixel Pals"
    },
    description: {
      en: "A collection of colorful keychains featuring detailed character designs for a gaming merchandise line.",
      ar: "مجموعة من سلاسل المفاتيح الملونة تتميز بتصميمات شخصيات مفصلة لخط إنتاج بضائع الألعاب."
    },
    details: {
      en: ["Material: Soft PVC", "Process: 2.5D Molding", "Attachment: Ball Chain", "Use Case: Collectible Merchandise"],
      ar: ["المادة: PVC ناعم", "العملية: قولبة 2.5D", "الملحق: سلسلة كروية", "الاستخدام: بضائع قابلة للجمع"]
    },
    image: getProductImage("portfolio-5"),
  },
  {
    id: "prod-06",
    name: {
      en: "CodeBrew Coffee Patch",
      ar: "رقعة CodeBrew Coffee"
    },
    description: {
      en: "A stylized patch for a coffee brand targeting developers, combining a retro-tech aesthetic with sharp, clean lines.",
      ar: "رقعة مصممة لعلامة تجارية للقهوة تستهدف المطورين، تجمع بين جمالية التقنية القديمة والخطوط الحادة والنظيفة."
    },
    details: {
      en: ["Material: Flexible PVC", "Process: 2D Molding with Recessed Details", "Feature: Scent-infused material (coffee aroma)", "Use Case: Brand Apparel"],
      ar: ["المادة: PVC مرن", "العملية: قولبة ثنائية الأبعاد مع تفاصيل غائرة", "الميزة: مادة معطرة (رائحة القهوة)", "الاستخدام: ملابس العلامة التجارية"]
    },
    image: getProductImage("portfolio-6"),
  },
];
