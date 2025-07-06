
from tortoise.contrib.fastapi import register_tortoise # type: ignore
from models import (supplier_pydantic, supplier_pydanticIn, Supplier, product_pydantic, product_pydanticIn, Product)
from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore


app = FastAPI()




# Adding Cors
origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]

# Add Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ['*'],
    allow_headers =['*']
)



# Endpoints for supplier
@app.get('/')
async def index():
    return {"Msg": "Api working, go to API Docs: {http://localhost:8000/docs}"}


@app.post('/api/supplier')
async def add_supplier(supplier_info: supplier_pydanticIn): # type: ignore
    supplier_obj = await Supplier.create(**supplier_info.dict(exclude_unset=True))
    response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {"status" : "ok", "data" : response}

@app.get('/api/supplier')
async def get_suppliers():
    response = await supplier_pydantic.from_queryset(Supplier.all())
    return {"status": "ok", "data": response}

@app.get('/supplier/{supplier_id}')
async def get_one_supplier(supplier_id: int):
    response = await supplier_pydantic.from_queryset_single(Supplier.get(id=supplier_id))
    return {"status": "ok", "data": response}

@app.put('/supplier/{supplier_id}')
async def update_supplier(supplier_id: int, update_info: supplier_pydanticIn): # type: ignore
    supplier = await Supplier.get(id=supplier_id)
    update_info = update_info.dict(exclude_unset=True)
    supplier.name = update_info['name']
    supplier.company = update_info['company']
    supplier.email = update_info['email']
    supplier.phone = update_info['phone']
    await supplier.save()
    response = await supplier_pydantic.from_tortoise_orm(supplier)
    return {"status": "ok", "data": response}


@app.delete('/supplier/{supplier_id}')
async def delete_supplier(supplier_id: int):
    await Supplier.get(id=supplier_id).delete()
    return {"status": "supplier deleted"}


# Endpoints For Products
@app.post('/api/product/{supplier_id}')
async def add_product(supplier_id: int, products_details: product_pydanticIn): # type: ignore
    supplier = await Supplier.get(id = supplier_id)
    products_details = products_details.dict(exclude_unset = True)
    products_details['revenue'] += (products_details['sold_quantity'] * products_details['price']) + products_details['revenue']
    product_obj = await Product.create(**products_details, supplied_by =supplier)
    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status": "product added", "data": response}


@app.get('/api/product')
async def get_products():
    response = await product_pydantic.from_queryset(Product.all())
    return {"status": "ok", "data": response}


@app.get('/product/{product_id}')
async def get_one_product(id:int):
    response = await product_pydantic.from_queryset_single(Product.get(id= id))
    return {"status": "ok", "data": response}


@app.put('/product/{product_id}')
async def update_product(id:int, update_info: product_pydanticIn): # type: ignore
    product = await Product.get(id =id)
    update_info = update_info.dict(exclude_unset=True)
    product.name = update_info['name']
    product.stock_quantity = update_info['stock_quantity']
    product.sold_quantity += update_info['sold_quantity']
    product.price = update_info['price']
    product.revenue += update_info['sold_quantity'] * update_info['price']
    await product.save()
    response = await product_pydantic.from_tortoise_orm(product)
    return{"status": "Product updated", "data": response}


@app.delete('/product/{product_id}')
async def delete_product(id:int):
    await Product.filter(id=id).delete()
    return {"status": f"Product with id: {id} has been deleted"}






register_tortoise(
    app,
    db_url='sqlite://database.sqlite3',
    modules={'models': ['models']},
    generate_schemas=True,
    add_exception_handlers=True
)