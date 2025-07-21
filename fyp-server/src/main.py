from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    from demo.stock_his import run
    run()
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/get_real_time_quotes")
def get_real_time_quotes():
    from stock.real_time import get_real_time_quotes
    stock_list = get_real_time_quotes()
    return { "stock_list": stock_list }
