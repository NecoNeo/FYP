import efinance as ef


def get_real_time_quotes():
    stock_df = ef.stock.get_realtime_quotes(None).sort_values(by='股票代码')
    print('stock_df:')
    print(stock_df)
    stock_list = stock_df.iloc[0:20].to_json()
    return stock_list
