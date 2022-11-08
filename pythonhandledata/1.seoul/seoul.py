import pandas as pd
import numpy as np
# CCTV_Seoul = pd.read_csv('./seoul_cctv.csv', encoding="cp949")
# print(CCTV_Seoul.head()) # 첫 5행만 보여주세요
#print(CCTV_Seoul.columns)

#pop_seoul = pd.read_csv('people.csv', encoding="cp949")
#print(pop_seoul.head())

#s = pd.Series([1, 3, 5, np.nan, 6, 8])
#print(s)

dates = pd.date_range('20130101', periods=6)
print(dates)

df = pd.DataFrame(np.random.randn(6, 4), index = dates, columns=['A','B','C','D'])
#print(df)
print(df.describe())