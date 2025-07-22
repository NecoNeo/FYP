import os
import pandas as pd

def cache_ef_api(data: pd.DataFrame, api: str = ''):
    project_path = os.getcwd()
    temp_path = os.path.join(project_path, 'temp')

    if not os.path.exists(temp_path):
        os.makedirs(temp_path)

    data.to_excel(os.path.join(temp_path, f'{api}.xlsx'), index=False)

def read_ef_cache(api: str):
    project_path = os.getcwd()
    temp_path = os.path.join(project_path, 'temp')
    try:
        df = pd.read_excel(os.path.join(temp_path, f'{api}.xlsx'), dtype={'股票代码': str})
        return df
    except:
        return None
