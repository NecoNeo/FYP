import { useEffect, useRef, useState } from "react";
import { get } from "~/server";

interface OverviewProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Overview: React.FC<OverviewProps> = ({ children, variant = 'primary', ...props }) => {
  const hasDataFetched = useRef(false);
  const [stockList, setStockList] = useState<Record<string, unknown>[]>([])

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
      Overview Page

      <ul>
        {stockList.map(stockRecord => (
          <li key={stockRecord.stock_code as string}>
            {Object.keys(stockRecord).map(k => (
              <div key={k}>{stockRecord[k] as string}</div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
