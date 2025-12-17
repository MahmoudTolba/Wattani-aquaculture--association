interface WalletResponse {
  key: string;
  msg: string;
  data: {
    balance?: number;
    wallet_balance?: number;
    amount?: number;
    [key: string]: any;
  };
}

interface ChargeWalletResponse {
  key: string;
  msg: string;
  data?: any;
}

const buildAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  let token: string | null = null;

  if (typeof window !== "undefined") {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser?.token || parsedUser?.access_token;
      }
    } catch (e) {
      console.error("Error getting token from localStorage:", e);
    }
  }

  if (!token) {
    const unauthError: any = new Error("unauthenticated");
    unauthError.data = {
      key: "unauthenticated",
      msg: "يرجى اعادة تسجيل الدخول",
    };
    throw unauthError;
  }

  headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const useWallet = () => {
  const showWallet = async () => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<WalletResponse>(
        'https://backend.wattani-sa.com/api/v1/show-wallet',
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (response && response.key === 'success' && response.data) {
        return response.data;
      } else {
        throw new Error(response?.msg || 'فشل في جلب رصيد المحفظة');
      }
    } catch (err: any) {
      console.error('Error fetching wallet:', err);
      throw err;
    }
  };

  const chargeWallet = async (amount: number | string) => {
    try {
      const headers = buildAuthHeaders();
      const response = await $fetch<ChargeWalletResponse>(
        'https://backend.wattani-sa.com/api/v1/charge-wallet',
        {
          method: 'POST',
          headers: headers,
          body: {
            amount: parseFloat(amount.toString()),
          },
        }
      );

      if (response && response.key === 'success') {
        return response;
      } else {
        throw new Error(response?.msg || 'فشل في شحن المحفظة');
      }
    } catch (err: any) {
      console.error('Error charging wallet:', err);
      throw err;
    }
  };

  return {
    showWallet,
    chargeWallet,
  };
};

