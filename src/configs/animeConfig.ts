interface animeConfig {
  huastream: {
    siteName: string;
    description: string;
    logo: string;
    favicon: string;
    image: string;
  };

  huastreamApi: {
    apiUrl: string;
    baseUrlPath: string;
  };
}

const animeConfig: animeConfig = {
  huastream: {
    siteName: "HuaStream",
    description: "Nonton streaming dan download donghua sub Indo gratis di HuaStream.",
    logo: "/images/logo.png",
    favicon: "/favicon.png",
    image: "/images/huastream.jpg",
  },

  huastreamApi: {
    apiUrl: "https://www.sankavollerei.com",
    baseUrlPath: "/anime/donghua",
  },
};

export default animeConfig;
