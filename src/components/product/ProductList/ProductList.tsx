import styles from './ProductList.module.css'

import { ProductCard } from "../ProductCard/ProductCard.tsx"

import type { Producto } from "../../../entities/producto.ts"

export function ProductList({products}: {products: Array<Producto>}) {   
    return (
        <div className={styles.productsContainer}>
            {products.map((product: Producto) => (
                <ProductCard key={product.id} product={product}></ProductCard>
            ))}
        </div>
    )
}