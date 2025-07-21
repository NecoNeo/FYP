import efinance as ef

def run():
    # stock_code = '600519'
    # his = ef.stock.get_quote_history(stock_code)

    # print('his:')
    # print(his)

    realtime_quotes = ef.stock.get_realtime_quotes(None)
    print('realtime_quotes:')
    print(realtime_quotes)

    members = ef.stock.get_members('HSI')
    print('members:')
    print(members)

    stock_code = '00300'
    his = ef.stock.get_quote_history(stock_code)
    print('his:')
    print(his)


if __name__ == '__main__':
    run()
