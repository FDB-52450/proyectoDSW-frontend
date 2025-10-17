import type { FormConfig, ProductoFormValues, CategoriaFormValues, MarcaFormValues, PedidoFormValues, ClienteFormValues, AdminFormValues } from "./formTypes.ts";

const provincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
    "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "Ciudad Autonoma de Buenos Aires"
]

const roles = ['admin', 'superadmin']

export const formConfigMap: {
    productos: FormConfig<ProductoFormValues>
    categorias: FormConfig<CategoriaFormValues>
    marcas: FormConfig<MarcaFormValues>
    pedidos: FormConfig<PedidoFormValues>
    clientes: FormConfig<ClienteFormValues>
    administradores: FormConfig<AdminFormValues>
} = {
    productos: {
        initialValues: {
            nombre: '',
            desc: '',
            precio: '',
            descuento: '',
            stock: '',
            stockReservado: null,
            destacado: false,
            ocultado: false,
            marca: {id: -1},
            categoria: {id: -1},
            imagenes: [],
            imagesToRemove: undefined,
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? (value.trim().length <= 100 ? null : 'El nombre es muy largo') : 'Ingrese un nombre',
            desc: (value) => {
                if (!value) return null
                if (value.trim().length <= 0) return 'Ingrese una descripcion'
                if (value.trim().length > 1000) return 'La descripcion es muy larga'

                return null
            },
            precio: (value) => Number(value) > 0  ? null : 'Ingrese un precio',
            descuento: (value) => {
                if (!value) return null
                if (Number(value) < 0 || Number(value) > 100) return 'Ingrese un descuento válido'

                return null
            },
            stock: (value) => Number(value) >= 0 ? null : 'Ingrese stock',
            destacado: (value) => value === true || value === false  ? null : 'Ingrese valor de destacado valido',
            ocultado: (value) => value === true || value === false  ? null : 'Ingrese valor de ocultado valido',
            marca: (value) => Number(value.id) > 0  ? null : 'Ingrese una marca válida',
            categoria: (value) => Number(value.id) > 0  ? null : 'Ingrese una categoria válida',
        },
    },
    categorias: {
        initialValues: {
            nombre: '',
            duracionGarantia: 0,
            stockLimit: 0,
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? null : 'Ingrese un nombre',
            duracionGarantia: (value) => value > 0 ? null : 'Ingrese duración de garantía',
            stockLimit: (value) => value > 0 ? null : 'Ingrese límite de stock',
        },
    },
    marcas: {
        initialValues: {
            nombre: '',
            keepImage: false,
            imagen: null,
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? null : 'Ingrese un nombre',
        },
    },
    pedidos: {
        initialValues: {
            tipoEntrega: '',
            tipoPago: '',
            estado: '',
            fechaEntrega: new Date(Date.now()),
            detalle: []
        },
        validate: {
            tipoEntrega: (value) => ['retiro', 'envio'].includes(value) ? null : 'Ingrese un tipo de entrega valida',
            tipoPago: (value) => ['efectivo', 'credito'].includes(value) ? null : 'Ingrese un tipo de pago valido',
            estado: (value) => ['pendiente', 'confirmado', 'cancelado'].includes(value) ? null : 'Ingrese un estado valido',
            fechaEntrega: (value) => new Date(value) >= new Date(Date.now())  ? null : 'Ingrese un estado valido'
        },
    },
    clientes: {
        initialValues: {
            dni: '',
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            provincia: '',
            ciudad: '',
            direccion: '',
            codigoPostal: '',
            banStart: null,
            banEnd: null,
            banRazon: ''
        },
        validate: {
            dni: (value) => /^\d{7,8}$/.test(value) ? null : 'Ingrese un dni valido',
            nombre: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un nombre',
            apellido: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un apellido',
            email: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Ingrese un email valido',
            telefono: (value) => /^(?:\+54\s?9\s?)(\d{2,4})[\s-]*(\d{2,4})[\s-]*(\d{4})$/.test(value) ? null : 'Ingrese un telefono valido',
            provincia: (value) => provincias.includes(value) ? null : 'Ingrese una provincia valida',
            ciudad: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese una ciudad valida',
            direccion: (value) => value.trim().length > 0 ? (value.trim().length <= 100 ? null : 'El nombre es muy largo') : 'Ingrese una direccion valida',
            codigoPostal: (value) => /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/.test(value) ? null : 'Ingrese un codigo postal valido',
        },
    },
    administradores: {
        initialValues: {
            nombre: '',
            password: '',
            role: 'admin'
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un nombre',
            password: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'La contraseña es muy largo') : 'Ingrese una contraseña',
            // password: (value) => value.trim() === '' ? null : (value.trim().length <= 50 ? null : 'La contraseña es muy larga'),
            role: (value) => roles.includes(value) ? null : 'Ingrese un rol valido',
        }
    }
}


/*export const formConfigMap: Record<EntityTipo, { initialValues: Record<string, any>; validate: Record<string, (value: any) => string | null>}> = {
    productos: {
        initialValues: {
            nombre: '',
            desc: '',
            precio: '',
            descuento: '',
            stock: '',
            stockReservado: null,
            destacado: false,
            marca: '',
            categoria: '',
            imagenes: null,
            imagesToRemove: undefined,
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? (value.trim().length <= 100 ? null : 'El nombre es muy largo') : 'Ingrese un nombre',
            desc: (value) => {
                if (!value) return null
                if (value.trim().length <= 0) return 'Ingrese una descripcion'
                if (value.trim().length > 1000) return 'La descripcion es muy larga'

                return null
            },
            precio: (value) => Number(value) > 0  ? null : 'Ingrese un precio',
            descuento: (value) => {
                if (!value) return null
                if (Number(value) < 0 || Number(value) > 100) return 'Ingrese un descuento válido'

                return null
            },
            stock: (value) => Number(value) >= 0 ? null : 'Ingrese stock',
            destacado: (value) => value === true || value === false  ? null : 'Ingrese valor de destacado valido',
            marca: (value) => Number(value.id) > 0  ? null : 'Ingrese una marca válida',
            categoria: (value) => Number(value.id) > 0  ? null : 'Ingrese una categoria válida',
        },
    },
    categorias: {
        initialValues: {
            nombre: '',
            duracionGarantia: 0,
            stockLimit: 0,
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? null : 'Ingrese un nombre',
            duracionGarantia: (value) => value > 0 ? null : 'Ingrese duración de garantía',
            stockLimit: (value) => value > 0 ? null : 'Ingrese límite de stock',
        },
    },
    marcas: {
        initialValues: {
            nombre: '',
            keepImage: true,
            imagen: null,
        },
        validate: {
            nombre: (value) => value.trim().length > 0 ? null : 'Ingrese un nombre',
        },
    },
    pedidos: {
        initialValues: {
            tipoEntrega: '',
            tipoPago: '',
            estado: '',
            fechaEntrega: null,
        },
        validate: {
            tipoEntrega: (value) => ['retiro', 'envio'].includes(value) ? null : 'Ingrese un tipo de entrega valida',
            tipoPago: (value) => ['efectivo', 'credito'].includes(value) ? null : 'Ingrese un tipo de pago valido',
            estado: (value) => ['confirmado', 'cancelado'].includes(value) ? null : 'Ingrese un estado valido',
            fechaEntrega: (value) => new Date(value) >= new Date(Date.now())  ? null : 'Ingrese un estado valido'
        },
    },
    clientes: {
        initialValues: {
            dni: '',
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            provincia: '',
            ciudad: '',
            direccion: '',
            codigoPostal: '',
            banStart: null,
            banEnd: null,
        },
        validate: {
            dni: (value) => /^\d{7,8}$/.test(value) ? null : 'Ingrese un dni valido',
            nombre: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un nombre',
            apellido: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un apellido',
            email: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Ingrese un email valido',
            telefono: (value) => /^(?:\+54\s?9\s?)(\d{2,4})[\s-]*(\d{2,4})[\s-]*(\d{4})$/.test(value) ? null : 'Ingrese un telefono valido',
            provincia: (value) => provincias.includes(value) ? null : 'Ingrese una provincia valida',
            ciudad: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese una ciudad valida',
            direccion: (value) => value.trim().length > 0 ? (value.trim().length <= 100 ? null : 'El nombre es muy largo') : 'Ingrese una direccion valida',
            codigoPostal: (value) => /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/.test(value) ? null : 'Ingrese un codigo postal valido',
        },
    },
};*/

/*
    body('marcaId')
      .if((value, { req }) => {return !isUpdate || req.body.marcaId !== undefined})
      .notEmpty().withMessage('El ID de la marca es obligatorio').bail()
      .toInt()
      .isInt({ min: 1 }).withMessage('El ID de la marca debe ser un número entero válido'),

    body('categoriaId')
      .if((value, { req }) => {return !isUpdate || req.body.categoriaId !== undefined})
      .notEmpty().withMessage('El ID de la categoría es obligatorio').bail()
      .toInt()
      .isInt({ min: 1 }).withMessage('El ID de la categoría debe ser un número entero válido'),

*/