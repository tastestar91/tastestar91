import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# CCTV_Seoul = pd.read_csv('./seoul_cctv.csv', encoding="cp949")
# print(CCTV_Seoul.head()) # 첫 5행만 보여주세요
#print(CCTV_Seoul.columns)

#pop_seoul = pd.read_csv('people.csv', encoding="cp949")
#print(pop_seoul.head())

#s = pd.Series([1, 3, 5, np.nan, 6, 8])
#print(s)

#dates = pd.date_range('20130101', periods=6)
#print(dates)

#df = pd.DataFrame(np.random.randn(6, 4), index = dates, columns=['A','B','C','D'])
#print(df)
#print(df.describe())
#print(df.sort_values(by='B', ascending=False))

#df.loc[:,['A', 'B']] 앞에꺼 행, 뒤에꺼 열
# df[df.A > 0] 필터도 가능

# df2 = df.copy() 복사

# df.apply(np.cumsum) 누적합

# df.apply(lambda x: x.max() - x.mIn()) 최대 최소 차이


#plt.figure
#plt.plot([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3 ,2, 1])
#plt.show()


t = np.arange(0, 12, 0.01)
y = np.sin(t)

plt.figure
plt.plot(t, y)
plt.show()