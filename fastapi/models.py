from tortoise.models import Model # type: ignore
from tortoise import fields, models # type: ignore
from tortoise.contrib.pydantic import pydantic_model_creator # type: ignore

class Product(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=30, nullable=False)
    stock_quantity= fields.IntField(default=0)
    sold_quantity = fields.IntField(default=0)
    price = fields.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    revenue= fields.DecimalField(max_digits=20, decimal_places=2, default=0.00)


    supplied_by= fields.ForeignKeyField('models.Supplier', related_name='goods_supplied')

class Supplier(Model):
    id=fields.IntField(pk=True)
    name= fields.CharField(max_length=20)
    company=fields.CharField(max_length=20)
    email=fields.CharField(max_length=100)
    phone=fields.CharField(max_length=15)  


# create pydantic models
product_pydantic = pydantic_model_creator(Product, name='Product')
product_pydanticIn = pydantic_model_creator(Product, name='ProductIn', exclude_readonly=True)

supplier_pydantic = pydantic_model_creator(Supplier, name='Supplier')
supplier_pydanticIn = pydantic_model_creator(Supplier, name='SupplierIn', exclude_readonly=True)