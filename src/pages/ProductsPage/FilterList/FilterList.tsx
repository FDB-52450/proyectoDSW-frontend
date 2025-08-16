import styles from './FilterList.module.css'

import { useState } from "react"

import type { ProductoFilters } from "../../../entities/productoFilters.ts"
import type { Marca } from '../../../entities/marca.ts'

interface ProductFilterProps {
  filters: ProductoFilters
  updateFilter: (prodFilters: ProductoFilters) => void
  marcas: Array<Marca>
}

export function ProductFilter({filters, updateFilter, marcas}: ProductFilterProps) {
    const [localFilters, setLocalFilters] = useState<ProductoFilters>(filters)
 
    function handleInputChange (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { id, value, type } = event.target

        let parsedValue: string | number | boolean | null

        if (event.target instanceof HTMLInputElement && type === 'checkbox') {
            if (id === 'stockMin') {
                parsedValue = event.target.checked ? 0 : 1
            } else {
                parsedValue = event.target.checked
            }
        } else if (type === 'number') {
            parsedValue = value === '' ? null : Number(value)
        } else {
            parsedValue = value === '' ? null : value
        }

        setLocalFilters((prev) => ({...prev, [id]: parsedValue}))
    }

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.title}>FILTROS</h2>
            <div className={styles.filters}>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <div className={styles.priceInputContainer}>
                        <input className={styles.priceInput} type="number" id="precioMin" 
                        value={localFilters.precioMin ?? ''} onChange={handleInputChange} placeholder=""/>
                        <label> - </label>
                        <input className={styles.priceInput} type="number" id="precioMax"
                        value={localFilters.precioMax ?? ''} onChange={handleInputChange} placeholder=""/>
                    </div>
                </div>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <div>
                        <input type="text" id="nombre" 
                        value={localFilters.nombre ?? ''} onChange={handleInputChange} placeholder=""/>
                    </div>
                </div>
                <div>
                    <label htmlFor="name">Destacado:</label>
                    <div>
                        <input type="checkbox" id="destacado" 
                        checked={localFilters.destacado} onChange={handleInputChange} placeholder=""/>
                    </div>
                </div>
                <div>
                    <label htmlFor="name">Marcas:</label>
                    <div>
                        <select value={localFilters.marca ?? ''} id="marca" onChange={handleInputChange}>
                            <option value="">Todas</option>
                            {marcas.map((marca) => (
                                <option key={marca.id} value={marca.nombre}>{marca.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="name">Sin Stock:</label>
                    <div>
                        <input type="checkbox" id="stockMin" 
                        checked={localFilters.stockMin === 0} onChange={handleInputChange} placeholder=""/>
                    </div>
                </div>
                <button onClick={() => updateFilter(localFilters)}>APLICAR CAMBIOS</button>
            </div>
        </div>
    )
}
