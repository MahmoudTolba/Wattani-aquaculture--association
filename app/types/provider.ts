export enum ProviderType {
  HOSPITAL = "hospital-medical-center",
  INDIVIDUAL_EXPERT = "individual-expert",
  DISTRIBUTORS_SECTOR = "distributors-sector",
}

export interface ProviderTypeInfo {
  id: number;
  slug: string;
  label: string;
  icon: string;
  title: string;
  title_icon: string;
  special_inputs: string[];
}

export const PROVIDER_TYPES: Record<ProviderType, ProviderTypeInfo> = {
  [ProviderType.HOSPITAL]: {
    id: 1,
    slug: "hospital-medical-center",
    label: "auth.register.choose_type.type.hospital-medical-center",
    icon: "/icons/medical-center.svg",
    title: "",
    title_icon: "",
    special_inputs: [],
  },
  [ProviderType.INDIVIDUAL_EXPERT]: {
    id: 2,
    slug: "individual-expert",
    label: "auth.register.choose_type.type.individual-expert",
    icon: "/icons/user.svg",
    title: "",
    title_icon: "",
    special_inputs: ["afiliated_with_administration"],
  },
  [ProviderType.DISTRIBUTORS_SECTOR]: {
    id: 3,
    slug: "distributors-sector",
    label: "auth.register.choose_type.type.distributors-sector",
    icon: "/icons/sector.svg",
    title: "",
    title_icon: "",
    special_inputs: [],
  },
};

console.log(PROVIDER_TYPES);

export const getProviderTypeById = (
  id: number
): ProviderTypeInfo | undefined => {
  return Object.values(PROVIDER_TYPES).find((type) => type.id === id);
};

export const getProviderTypeBySlug = (
  slug: string
): ProviderTypeInfo | undefined => {
  return Object.values(PROVIDER_TYPES).find((type) => type.slug === slug);
};
