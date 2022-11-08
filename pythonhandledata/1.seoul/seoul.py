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
#plt.plot([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3 ,2, 
#plt.show()


#t = np.arange(0, 12, 0.01)
#y = np.sin(t)

# plt.figure
# plt.plot(t, y)
# plt.show()

# plt.figure(figsize = (10, 6))
# plt.plot(t, y)
# plt.grid() # 격자무늬
# plt.xlabel('time')
# plt.ylabel('Amplitude')
# plt.title('Example of sinewave') # 제목
# plt.show()

# t = [0, 1, 2, 3, 4, 5, 6]
# y = [1, 4, 5, 8, 9, 5, 3]
# plt.figure(figsize=(10, 6))
# plt.plot(t, y, color = 'green', linestyle='dashed', marker ='o') # 데이터가 존재하는 곳 에 마킹
# plt.show()

# t = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
# y = np.array([9, 8, 7, 9, 8, 3, 2, 4, 3, 4])

# # plt.figure(figsize = (10, 6))
# # plt.scatter(t, y)
# # plt.show()

# colormap = t
# plt.figure(figsize = (10, 6))
# plt.scatter(t, y, s = 50, c = colormap, marker='>')
# plt.colorbar()
# plt.show()

s1 = np.random.normal(loc = 0, scale=1, size= 1000)
s2 = np.random.normal(loc = 5, scale=5, size= 1000)
s3 = np.random.normal(loc = 10, scale=2, size= 1000)

plt.figure(figsize=(10, 6))
plt.plot(s1, label='s1')
plt.plot(s2, label='s2')
plt.plot(s3, label='s3')

plt.legend()
plt.show()
