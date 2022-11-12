import pandas as pd
import numpy as np
import googlemaps
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import preprocessing
from matplotlib import font_manager, rc
import platform
# crime_anal_police = pd.read_csv('02. crime_in_Seoul_include_gu_name.csv', thousands=',', encoding='utf-8')

# gmaps_key = 'AIzaSyCHWo8bs4NOZba8gQyZUwxtdIVACr4biPU'
# gmaps = googlemaps.Client(key = gmaps_key)

# station_name = []

# for name in crime_anal_police['관서명']:
#     station_name.append('서울' + str(name[:-1]) + '경찰서')

# station_address = []
# station_lat = []
# station_lon = []

# for name in station_name:
#     tmp = gmaps.geocode(name, language = 'ko')
#     station_address.append(tmp[0].get('formatted_address'))
#     tmp_loc = tmp[0].get('geometry')

#     station_lat.append(tmp_loc['location']['lat'])
#     station_lat.append(tmp_loc['location']['lng'])

# gu_name = []

# for name in station_address:
#     tmp = name.split()
#     tmp_gu = [gu for gu in tmp if gu[-1] == '구'][0]
#     gu_name.append(tmp_gu)

# crime_anal_police['구별'] = gu_name'

# crime_anal_police = pd.read_csv('02. crime_in_Seoul_include_gu_name.csv', thousands=',', encoding='utf-8')

# print(crime_anal_police.head())

## pivot 테이블 학습
#df = pd.read_excel('02. sales-funnel.xlsx')
#print(df.head())
#print(pd.pivot_table(df, index=["Name"])) ## 숫자형 컬럼만이 남게됨

#print(pd.pivot_table(df, index=['Manager', 'Rep'], values=['Price'])) # value 합친 경우 평균치가 기본
# 합계 사용 aggfunc= np.sum 사용

# #print(pd.pivot_table(df, index = ["Manager", "Rep", "Product"], values=["Price", "Quantity"], aggfunc=[np.sum, np.mean], fill_value=0, margins=True))
# crime_anal_raw = pd.read_csv('02. crime_in_Seoul_include_gu_name.csv', encoding='utf-8')
# crime_anal = pd.pivot_table(crime_anal_raw, index='구별', aggfunc = np.sum)

# crime_anal['강간검거율'] = crime_anal['강간 검거']/crime_anal['강간 발생'] * 100
# crime_anal['강도검거율'] = crime_anal['강도 검거']/crime_anal['강도 발생'] * 100
# crime_anal['살인검거율'] = crime_anal['살인 검거']/crime_anal['살인 발생'] * 100
# crime_anal['절도검거율'] = crime_anal['절도 검거']/crime_anal['절도 발생'] * 100
# crime_anal['폭력검거율'] = crime_anal['폭력 검거']/crime_anal['폭력 발생'] * 100

# del crime_anal['강간 검거']
# del crime_anal['강도 검거']
# del crime_anal['살인 검거']
# del crime_anal['절도 검거']
# del crime_anal['폭력 검거']

# con_list = ['강간검거율', '강도검거율', '살인검거율', '절도검거율', '폭력검거율']
# for column in con_list:
#     crime_anal.loc[crime_anal[column] > 100, column] = 100

# crime_anal.rename(columns = {
#     '강간 발생': '강간',
#     '강도 발생': '강도',
#     '살인 발생': '살인',
#     '절도 발생': '절도',
#     '폭력 발생': '폭력',
# }, inplace=True)


# col = ['강간', '강도', '살인', '절도', '폭력']
# x = crime_anal[col].values
# min_max_scaler = preprocessing.MinMaxScaler()

# x_scaled = min_max_scaler.fit_transform(x.astype(float))
# crime_anal_norm = pd.DataFrame(x_scaled, columns=col, index = crime_anal.index)

# col2 = ['강간검거율', '강도검거율', '살인검거율', '절도검거율', '폭력검거율']
# crime_anal_norm[col2] = crime_anal[col2]

# result_CCTV = pd.read_csv('01. CCTV_result.csv', encoding='utf-8', index_col ='구별')
# crime_anal_norm[['인구수', 'CCTV']] = result_CCTV[['인구수', '소계']]

# crime_anal_norm['범죄'] = np.sum(crime_anal_norm[col], axis=1)

# crime_anal_norm['검거'] = np.sum(crime_anal_norm[col], axis=1)

# print(crime_anal_norm)



# x = np.linspace(0, 14, 100)
# y1 = np.sin(x)
# y2 = 2 * np.sin(x + 0.5)
# y3 = 3 * np.sin(x + 1.0)
# y4 = 4 * np.sin(x + 1.5)

# sns.set_style('whitegrid')
# plt.figure(figsize=(10, 6))
# plt.plot(x,y1, x,y2, x,y3, x,y4)
# plt.show()

# # sns.set_style('whitegrid')
# tips = sns.load_dataset('tips')

# # plt.figure(figsize=(8,6))
# # sns.boxplot(x='day', y='total_bill', data=tlps)
# # plt.show()

# sns.set_style('darkgrid')
# sns.lmplot(x='total_bill', y='tip', hue='smoker', data=tips, palette='Set1')
# plt.show()

# flights = sns.load_dataset('flights')
# flights = flights.pivot("month", "year", "passengers")
# print(flights.head(5))

# plt.figure(figsize=(10, 8))
# sns.heatmap(flights, annot=True, fmt='d') #경향 설명하기 좋음
# plt.show()

# sns.set(style='ticks')
# iris = sns.load_dataset('iris')
# sns.pairplot(iris, hue="species")
# plt.show()


## 범죄 데이터 시각화하기
# path = "c:/Windows/Fonts/malgun.ttf"
# if platform.system() == 'Darwin':
#     rc('font', family='AppleGothic')
# elif platform.system() == 'Windows':
#     font_name = font_manager.FontProperties(fname=path).get_name()
#     rc('font', family=font_name)
# else:
#     print('Unknown stste,/...')

#     sns.pairplot(crime_anal_norm, vars=['강도', '살인', '폭력', kind='reg', size=3]) #상관관계 그래프

# folium 지도 시각화 도구
import folium

# map_osm = folium.Map(location=[45.5236, -122.6750])

# stamen = folium.Map(location=[45.5236, -122.6750], tiles='Stamen Toner', zoom_start=13)
# stamen'

state_unemployment = '02. folium_US_Unemployment_Oct2012.csv'
state_data = pd.read_csv(state_unemployment)

state_geo = '02. folium_us-states.json'
map = folium.map(location=[40, -98], zoom_start=4)
map.choropleth(geo_data = state_geo, data=state_data,
    columns = ['State, Unemployment'],
    key_on  ='feature_id',
    file_color = 'YlGn',
    legend_name = 'Unemployment Rate (%)'
)
map