import os, glob
import win32com.client as win32

current_loc = os.getcwd()
hwp_file = glob.glob('*.hwp')[0]
subfolders = [f.path for f in os.scandir(current_loc) if f.is_dir()]
countSell = len(subfolders) * 2 + 1

hwp = win32.gencache.EnsureDispatch("HWPFrame.HwpObject")  # 한/글 오브젝트 생성
hwp.RegisterModule("FilePathCheckDLL", "FilePathCheckerModule")  # 실행하는 컴퓨터에서 레지스트리 등록해야 함
hwp.Open(f'{current_loc}\주간 업무보고(케이웨더).hwp', 'HWP', 'HWP')

# 표만들기
hwp.HAction.GetDefault("TableCreate", hwp.HParameterSet.HTableCreation.HSet)
hwp.HParameterSet.HTableCreation.Rows = countSell
hwp.HParameterSet.HTableCreation.Cols = 2

hwp.HParameterSet.HTableCreation.WidthType = 2
hwp.HParameterSet.HTableCreation.HeightType = 1
hwp.HParameterSet.HTableCreation.WidthValue = hwp.MiliToHwpUnit(250)  # 표만들기 포스팅 참고 
hwp.HParameterSet.HTableCreation.HeightValue = hwp.MiliToHwpUnit(205)

hwp.HParameterSet.HTableCreation.CreateItemArray("ColWidth", 5)
hwp.HParameterSet.HTableCreation.ColWidth.SetItem(0, hwp.MiliToHwpUnit(80))
hwp.HParameterSet.HTableCreation.ColWidth.SetItem(1, hwp.MiliToHwpUnit(80))
hwp.HParameterSet.HTableCreation.CreateItemArray("RowHeight", 5)

for i in range(1, countSell + 1):
    if i % 2 == 1:  # 홀수 행
        hwp.HParameterSet.HTableCreation.RowHeight.SetItem(i, hwp.MiliToHwpUnit(50))
    else:  # 짝수 행
        hwp.HParameterSet.HTableCreation.RowHeight.SetItem(i, hwp.MiliToHwpUnit(10))
        
hwp.HParameterSet.HTableCreation.TableProperties.Width = hwp.MiliToHwpUnit(250)
hwp.HAction.Execute("TableCreate", hwp.HParameterSet.HTableCreation.HSet)

# 표 색깔
hwp.HAction.Run("TableCellBlock")
hwp.HAction.Run("TableColBegin")
hwp.HAction.Run("TableColPageUp")

hwp.HAction.GetDefault("CellFill", hwp.HParameterSet.HCellBorderFill.HSet)
hwp.HParameterSet.HCellBorderFill.FillAttr.type = hwp.BrushType("NullBrush|WinBrush")
hwp.HParameterSet.HCellBorderFill.FillAttr.WinBrushFaceColor = hwp.RGBColor(209, 209, 209)
hwp.HParameterSet.HCellBorderFill.FillAttr.WinBrushHatchColor = hwp.RGBColor(153, 153, 153)
hwp.HParameterSet.HCellBorderFill.FillAttr.WinBrushFaceStyle = hwp.HatchStyle("None")
hwp.HParameterSet.HCellBorderFill.FillAttr.WindowsBrush = 1
hwp.HAction.Execute("CellFill", hwp.HParameterSet.HCellBorderFill.HSet)

hwp.HAction.Run("TableRightCell")  # 우측셀로 이동

hwp.HAction.GetDefault("CellFill", hwp.HParameterSet.HCellBorderFill.HSet)
hwp.HParameterSet.HCellBorderFill.FillAttr.type = hwp.BrushType("NullBrush|WinBrush")
hwp.HParameterSet.HCellBorderFill.FillAttr.WinBrushFaceColor = hwp.RGBColor(209, 209, 209)
hwp.HParameterSet.HCellBorderFill.FillAttr.WinBrushHatchColor = hwp.RGBColor(153, 153, 153)
hwp.HParameterSet.HCellBorderFill.FillAttr.WinBrushFaceStyle = hwp.HatchStyle("None")
hwp.HParameterSet.HCellBorderFill.FillAttr.WindowsBrush = 1
hwp.HAction.Execute("CellFill", hwp.HParameterSet.HCellBorderFill.HSet)

# 타이틀 삽입
hwp.HAction.Run("TableColBegin")

hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
hwp.HParameterSet.HInsertText.Text = "관리번호"
hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)
hwp.HAction.Run("ParagraphShapeAlignCenter")

hwp.HAction.Run("TableRightCell")

hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
hwp.HParameterSet.HInsertText.Text = "점검사진"
hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)
hwp.HAction.Run("ParagraphShapeAlignCenter")

import openpyxl

excel_file = "점검 대상리스트_원본_v0.2.xlsx"
workbook = openpyxl.load_workbook(excel_file)
sheet = workbook['2023']

column_index_col2 = 2
column_index_col3 = 3

for forder in subfolders:
    folder_name = os.path.basename(forder)  # 폴더 경로 추출
    split_parts = folder_name.split(' (', 1)
    first_part, second_part = split_parts
    second_part = '(' + second_part
    
    image_files = glob.glob(f"{forder}/*.jpg")# .jpg 확장자를 가진 이미지 파일만 가져오기
    print("첫 번째 부분:", first_part)
    print("두 번째 부분:", second_part)
    if len(image_files) > 2:
        raise ValueError(f'{folder_name}, 사진이 3개이상입니다')
    
    for image in image_files:
        hwp.HAction.Run("TableRightCell")
        hwp.InsertPicture(image, Embedded=True, sizeoption=2)
    
    hwp.HAction.Run("TableRightCell")        
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = first_part
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    hwp.HAction.Run("TableRightCell")
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = second_part
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)
    
    data_to_add_col2 = first_part
    data_to_add_col3 = second_part
    sheet.cell(row=sheet.max_row + 1, column=column_index_col2, value=data_to_add_col2)
    sheet.cell(row=sheet.max_row, column=column_index_col3, value=data_to_add_col3)
    
workbook.save(excel_file)
print("데이터가 2023 시트의 2열과 3열에 추가되었습니다.")
