import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "AssetHub",
  version: packageJson.version,
  copyright: `© ${currentYear}, AssetHub. All rights reserved.`,
  meta: {
    title: "AssetHub - Asset Management System",
    description:
      "AssetHub is a comprehensive asset management platform for tracking, organizing, and maintaining company assets. Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.",
  },
};
