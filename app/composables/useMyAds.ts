// Composable to manage user's ads across pages
import { useState } from '#app';

export interface Ad {
  id: number;
  title: string;
  image: string;
  rating: number;
  price: string;
  location: string;
  timeAgo: string;
  seller: {
    name: string;
    avatar: string;
  };
}

export const useMyAds = () => {
  // Shared state across all pages
  const myAds = useState<Ad[]>('myAds', () => []);

  // Add a new ad to the list
  const addAd = (ad: Ad) => {
    myAds.value.unshift(ad);
  };

  // Remove an ad by ID
  const removeAd = (adId: number) => {
    const index = myAds.value.findIndex((ad) => ad.id === adId);
    if (index > -1) {
      myAds.value.splice(index, 1);
    }
  };

  // Update an ad
  const updateAd = (adId: number, updatedAd: Partial<Ad>) => {
    const index = myAds.value.findIndex((ad) => ad.id === adId);
    if (index > -1) {
      myAds.value[index] = { ...myAds.value[index], ...updatedAd };
    }
  };

  // Get ad by ID
  const getAdById = (adId: number): Ad | undefined => {
    return myAds.value.find((ad) => ad.id === adId);
  };

  // Set all ads (useful for fetching from API)
  const setAds = (ads: Ad[]) => {
    myAds.value = ads;
  };

  return {
    myAds,
    addAd,
    removeAd,
    updateAd,
    getAdById,
    setAds,
  };
};

