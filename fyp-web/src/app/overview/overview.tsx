import { useEffect, useRef, useState } from "react";
import { Table } from '@mantine/core';
import { get } from "~/server";

interface OverviewProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Overview: React.FC<OverviewProps> = ({ children, variant = 'primary', ...props }) => {
  const hasDataFetched = useRef(false);
  const [stockList, setStockList] = useState<Record<string, unknown>[]>([])

  const cols = [
    { key: "stock_code", label: "股票代码" },
    { key: "stock_name", label: "股票名称" },
    { key: "change_percent", label: "涨跌幅" },
    { key: "latest_price", label: "最新价" },
    // { key: "highest_price", label: "最高" },
    // { key: "lowest_price", label: "最低" },
    // { key: "open_price", label: "今开" },
    { key: "change_amount", label: "涨跌额" },
    // { key: "turnover_rate", label: "换手率" },
    // { key: "volume_ratio", label: "量比" },
    { key: "pe_dynamic", label: "动态市盈率" },
    { key: "volume", label: "成交量" },
    { key: "turnover", label: "成交额" },
    { key: "previous_close", label: "昨日收盘" },
    // { key: "total_market_value", label: "总市值" },
    // { key: "circulating_market_value", label: "流通市值" },
    // { key: "quote_id", label: "行情ID" },
    // { key: "market_type", label: "市场类型" },
    // { key: "update_time", label: "更新时间" },
    // { key: "latest_trade_date", label: "最新交易日" }
  ]

  useEffect(() => {
    if (hasDataFetched.current) return;
    const p = get('/get_real_time_quotes')
    hasDataFetched.current = true;
    p.then((res: any) => {
      console.log(res)
      setStockList(res.stock_list)
    })
  }, [])

  return (
    <div>
      <div>Overview Page</div>

      <div>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              {cols.map(col => (
                <Table.Th>{col.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {stockList.map(stockRecord => (
              <Table.Tr key={stockRecord.stock_code as string}>
                {cols.map(col => (
                  <Table.Td key={col.key}>{stockRecord[col.key] as string}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

    </div>
  );
};

export default Overview;
