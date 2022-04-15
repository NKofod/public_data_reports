import pandas as pd 

universities = [
    "AU", 
    "AAU", 
    "CBS", 
    "DTU", 
    "ITU", 
    "KU", 
    "RUC", 
    "SDU"]

years = [
    ("08A", 100/89.9), 
    ("13A", 100/98.6), 
    ("18", 100/102.6), 
    ("22-1", 100/105.4)]

column_names = {
    "I alt omsætning (mio kr)": "Total Omsætning", 
    "alt omsætning (mio kr)": "Total Omsætning", 
    "Uddannelsestilskud fra UBST": "Uddannelsestilskud",
    "Uddannelsestilskud fra UI": "Uddannelsestilskud", 
    "Heltidsuddannelse": "Uddannelsestaxameter (Heltid)",
    "Deltidsuddannelse": "Uddannelsestaxameter (Deltid)",
    "Basistilskud fra UBST": "Basistilskud",
    "Basistilskud fra UI": "Basistilskud"
    }
column_list = [
    "År",
    "Finanslov",
    "Universitet",
    "Total Omsætning", 
    "Uddannelsestilskud",
    "Uddannelsestaxameter (Heltid)",
    "Uddannelsestaxameter (Deltid)",
    "Basistilskud",
    "Tilskudsfinansieret forskning"
]
financial_columns = [
    "Total Omsætning", 
    "Uddannelsestilskud",
    "Uddannelsestaxameter (Heltid)",
    "Uddannelsestaxameter (Deltid)",
    "Basistilskud",
    "Tilskudsfinansieret forskning"
    ]

base_dict = {
    i: [] for i in column_list
    }
base_df = pd.DataFrame(base_dict)


for university in universities: 
    for year in years: 
        # print(in_df.describe())
        in_df = pd.read_csv(f"./data/raw/{university}_virk_{year[0]}.csv", sep=";",index_col = False)
        in_df["Universitet"] = university 
        in_df = in_df.rename(columns = column_names)
        # print(in_df.columns)
        for i in financial_columns: 
            in_df[i] = in_df[i] * year[1] * 10 ** 6
        in_df = in_df[column_list]
        if year[0] != "22-1": 
            in_df = in_df[in_df["År"] != 2016]
        in_df["År"] = in_df["År"].astype("int")
        base_df = base_df.append(in_df[in_df["Finanslov"] == "R"],ignore_index=True)


base_df.to_csv("./data/processed/Universitetsfinansiering_2002-2021.csv",sep=";",index=False)