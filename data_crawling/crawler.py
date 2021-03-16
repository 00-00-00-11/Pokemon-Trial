import requests
import random
import time
import pandas as pd
import os


def single_item_generater():
    i = 1
    while True:
        yield i
        i += 1


def get_poki_api(u,n):
    api = f'https://pokeapi.co/api/v2/{u}/{n}'
    re = requests.get(api)
    if re.status_code == 404:
        return False
    else:
        raw_data = re.json()
        return raw_data


def organize_poki_api(data, poki_lst, ability_lst):
    single_poki_data = {}
    abilities = []
    creature_id = data['id']
    single_poki_data['poki_id'] = int(creature_id)
    single_poki_data['name'] = str(data['forms'][0]['name'])
    single_poki_data['height'] = int(data['height'])
    single_poki_data['url'] = str(data['forms'][0]['url'])
    single_poki_data['poki_img'] = f'C:\\Users\\Demmi\\Desktop\\pokimon\\poki_img\\{creature_id}.png'
    # print(raw_data['forms'])
    # print(raw_data['height'])
    # print(raw_data['sprites']['front_default'])
    # print(raw_data['forms'][0]['url'][-2])
    # print(single_poki_data)
    # print(raw_data['abilities'])
    for a in data['abilities']:
        ability_lst.append((int(creature_id),int(a['ability']['url'][a['ability']['url'].index('y')+2:-1])))

    poki_lst.append(single_poki_data)
    return poki_lst,ability_lst

def organize_ability_api(data, ability_only_lst):
    ability_dict = {}
    ability_id = data['id']
    ability_dict['ability_id'] = int(ability_id)
    ability_dict['name'] = data['name']
    ability_only_lst.append(ability_dict)
    return ability_only_lst

def print_csv(data):
    poki_id = []
    name = []
    height = []
    url = []
    poki_img = []
    for item in data:#all pocket data
        poki_id.append(item['poki_id'])
        name.append(item['name'])
        height.append(item['height'])
        url.append(item['url'])
        poki_img.append(item['poki_img'])

    # print(name)
    all_poki_to_csv = dict(zip(['poki_id','name','height','url','poki_img'],[poki_id,name,height,url,poki_img]))
    df = pd.DataFrame(all_poki_to_csv,columns=['poki_id','name','height','url','poki_img'] )
    df.to_csv('poki.csv',index=False)


def print_csv_ability(data):
    ability_id = []
    name = []
    for item in data:
        ability_id.append(item['ability_id'])
        name.append(item['name'])

    all_ability_to_csv = dict(zip(['ability_id','name'],[ability_id,name]))
    df = pd.DataFrame(all_ability_to_csv ,columns=['ability_id','name'] )
    df.to_csv('ability.csv', index=False)

def print_csv_able(data):
    poki_id = []
    ability_id = [] 
    for item in all_poki_ability_data:
        poki_id.append(item[0])
        ability_id.append(item[1])

    all_poki_ability_to_csv = dict(zip(["poki_id","ability_id"],[poki_id,ability_id]))
    df = pd.DataFrame(all_poki_ability_to_csv ,columns=['poki_id','ability_id'] )
    df.to_csv('poki_able.csv',index_label="id")

###get poki data
all_poki_data = []
all_poki_ability_data = []
all_ability_data = []
###print poki to csv
# for num in single_item_generater():
#     if (num-1)%20 == 0:##i = 1,21,41.....
#         #sleep once every 20 pages
#         t = random.choice([2,5,4,3,6,8,10]) # avoid being banned 
#         time.sleep(t)
#         raw_data = get_poki_api('pokemon',num)
#         if raw_data == False:
#             break
#         else:
#             result = organize_poki_api(raw_data,all_poki_data,all_poki_ability_data)
#     else:
#         raw_data = get_poki_api('pokemon',num)
#         if raw_data == False:
#             break
#         else:
#             result = organize_poki_api(raw_data,all_poki_data,all_poki_ability_data)

# print_csv(result[0]) ##print poki table
# print_csv_able(result[1]) ##print poki_able table

###print ability csv
for num in single_item_generater():
    if (num-1)%20 == 0:
        t = random.choice([2,5,4,3,6,8,10]) # avoid being banned 
        time.sleep(t)
        raw_data = get_poki_api('ability',num)
        if raw_data == False:
            break
        else:
            result = organize_ability_api(raw_data,all_ability_data)
    else:
        raw_data = get_poki_api('ability',num)
        if raw_data == False:
            break
        else:
            result = organize_ability_api(raw_data,all_ability_data)

print_csv_ability(all_ability_data)##print ability table


def img_crawler():
    if os.path.isdir('poki_img') == False:
        os.mkdir('poki_img')
    else:
        for num in single_item_generater():
            img_api = f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{num}.png'
            if requests.get(img_api).status_code == 404:
                f.close()
                break
            else:
                if (num-1)%20 == 0:
                    t = random.choice([2,5,4,3,6,8,10]) # avoid being banned 
                    time.sleep(t)
                    img_data = requests.get(img_api).content
                    with open(f'poki_img/{num}.png','wb+') as f:
                        f.write(img_data)
                else:
                    img_data = requests.get(img_api).content
                    with open(f'poki_img/{num}.png','wb+') as f:
                        f.write(img_data)

# img_crawler() #uncomment this will start image crawling