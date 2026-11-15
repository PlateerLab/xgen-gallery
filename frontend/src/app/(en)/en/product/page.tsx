import { ProductsIndex } from "@/components/products/products-index";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Products — Plateer AI Labs",
    description: "Products from Plateer AI Labs — XGEN and Ontlas, built to run on enterprise data and infrastructure.",
    path: "/product",
    locale: "en",
});

export default function ProductsPageEn() {
    return <ProductsIndex locale="en" />;
}
