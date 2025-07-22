import efinance as ef
from cache.ef_cache import cache_ef_api, read_ef_cache
from dict import field_mapping_zh_en


def get_real_time_quotes():
    stock_df = read_ef_cache('get_realtime_quotes')

    if stock_df is None:
        print('GET data from efinance:')
        stock_df = ef.stock.get_realtime_quotes(None).sort_values(by='股票代码')
        cache_ef_api(stock_df, api='get_realtime_quotes')
    else:
        print('READ CACHED DATA')

    print('stock_df:')
    print(stock_df)
    data = stock_df.rename(columns=field_mapping_zh_en).iloc[0:20].to_dict(orient='records')

    return data
