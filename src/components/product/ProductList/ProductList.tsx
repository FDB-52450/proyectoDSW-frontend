import styles from './ProductList.module.css'

import { Card } from "../../product/ProductCard/ProductCard.tsx"

import type { Producto } from "../../../entities/producto.ts"

export function ProductList({products}: {products: Array<Producto>}) {   
    return (
        <div className={styles.productsContainer}>
            {products.map((product: Producto) => (
                <Card key={product.id} product={product}></Card>
            ))}
        </div>
    )
}