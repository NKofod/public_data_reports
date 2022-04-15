import requests 
from bs4 import BeautifulSoup as Soup 
import re 
import pandas as pd 
import os 

universities = {"KU": "01", 
                "AU": "05", 
                "SDU": "11", 
                "RUC": "15",
                "AAU": "17",
                "CBS": "21",
                "DTU": "37",
                "ITU": "45"}

try: 
    os.mkdir("data")
    os.mkdir("data/raw")
    os.mkdir("data/processed")
except FileExistsError:
    pass 
except IsADirectoryError:
    pass 


for university in universities: 

    urls = ["22-1","18","13A", "08A"]
    for url in urls:
        print(f"Working on {url}")
        tmp_url = f"https://www.oes-cs.dk/bevillingslove/doctopic.cgi?book=BEVPUBL.FL{url}&topic=19.22.{universities[university]}&searchtype=3"
        tmp = requests.get(tmp_url).content 
        with open
        tmp_string = str(tmp)
        tmp_decode = tmp.decode('iso8859_10')
        tmp_decode = tmp_decode.replace("<B>","")
        tmp_decode = tmp_decode.replace("</B>","")
        tmp_list = tmp_decode.split("\r\n")
        optage_num = 0 
        virk_num = 0 
        for i in tmp_list:
            if "Optagelsesskøn" in i: 
                print(tmp_list.index(i))
                optage_num = tmp_list.index(i)
            elif "Virksomhedsoversigt" in i: 
                virk_num = tmp_list.index(i)
        
        optag = tmp_list[optage_num:virk_num]

        virk = tmp_list[virk_num:]  
        optag = [i.split("|")[1:-1] for i in optag if "|" in i]
        virk = [i.split("|")[1:-1] for i in virk if "|" in i]

        optag[0][0] = "Finanslov"
        optag[1][0] = "År"
        virk[0][0] = "Finanslov"
        virk[1][0] = "År"
        for i in range(len(optag)):
            for j in range(len(optag[i])):
                optag[i][j] = optag[i][j].replace(".","")
                optag[i][j] = re.sub("^\s+(.+?)$",r"\1",optag[i][j])
                optag[i][j] = re.sub("\s+$",r"",optag[i][j])
                if optag[i][j] == "-":
                    optag[i][j] == None 
                # optag[i][j] = optag[i][j].replace(" ","")
                try: 
                    optag[i][j] = int(optag[i][j])
                except ValueError:
                    pass 
                except TypeError:
                    pass 
                if optag[i][j] == "achelor":
                    optag[i][j] = "Bachelor"
                elif optag[i][j] == "andidat":
                    optag[i][j] = "Kandidat"
                elif optag[i][j] == "alt":
                    optag[i][j] = "Total"
            if optag[i][1:] == [" "] * (len(optag[i]) -1): 
                optag[i+1][0] = optag[i][0] + " " + optag[i+1][0]
        act_num = 0 

        for i in range(len(virk)):
            for j in range(len(virk[i])):
                virk[i][j] = virk[i][j].replace(".","")
                virk[i][j] = re.sub("^\s+(.+?)\s+$",r"\1",virk[i][j])
                virk[i][j] = re.sub("\s+$", "", virk[i][j])
                virk[i][j] = re.sub("\s+", " ",virk[i][j])
                virk[i][j] = re.sub(",", ".", virk[i][j])
                if virk[i][j] == "-": 
                    virk[i][j] = None 
                # virk[i][j] = virk[i][j].replace(" ","")
                try: 
                    virk[i][j] = int(virk[i][j])
                except ValueError:
                    pass 
                except TypeError:
                    pass 
                if virk[i][j] == "ktiviteter": 
                    virk[i][j] = "Aktiviteter"
                    act_num = i 
                elif virk[i][j] == "Aktiviteter":
                    act_num = i 
            if virk[i][1:] == [""] * (len(virk[i]) -1) and len(virk[i]) > 1 : 
                virk[i+1][0] = virk[i][0] + " " + virk[i+1][0]
                if virk[i][j] == "alt omsætning (mio kr)": 
                    virk[i][j] = "Total omsætning (mio kr)"
                
        aktivitet = virk[act_num+1:]
        virk = virk[:act_num]

        virk_dict = {}
        optag_dict = {}
        aktivitet_dict = {}

        for i in virk: 
            if i[1:] == [""] * len(i[1:]):
                continue 
            virk_dict[i[0]] = i[1:]
        for i in optag:
            if i[1:] == [""] * len(i[1:]):
                continue 
            optag_dict[i[0]] = i[1:]
        for i in aktivitet:
            if i[1:] == [""] * len(i[1:]):
                continue 
            aktivitet_dict[i[0]] = i[1:]

        virk_df = pd.DataFrame(virk_dict)
        # optag_df = pd.DataFrame(optag_dict)
        # aktivitet_df = pd.DataFrame(aktivitet_dict)
        # aktivitet_df['År'] = virk_df['År']
        # aktivitet_df['Finanslov'] = virk_df['Finanslov']
        virk_df.to_csv(f"{university}_virk_{url}.csv",index=False,sep=";")
        # optag_df.to_csv(f"{university}_optag_{url}.csv",index=False,sep=";")
        # aktivitet_df.to_csv(f"{university}_aktivitet_{url}.csv",index=False,sep=";")
