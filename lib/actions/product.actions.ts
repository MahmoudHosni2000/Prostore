// Purpose: Contains all the actions related to products.
"use server";

import { prisma } from "@/db/prisma";
import { prismaToJSON } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// get all products
export async function getLatestProducts() {
  // get the latest 4 products
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT, // get only 4 products
    orderBy: { createdAt: "desc" }, // sort by createdAt in descending order
  });

  return prismaToJSON(data);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
