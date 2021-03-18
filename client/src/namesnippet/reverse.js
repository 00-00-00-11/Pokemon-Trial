//Run those codes in the brower

const reverseNameSnippet = (name) => {
    
    let element = document.querySelectorAll(name);
    const nameLst = [];
    const reversedNameLst = [];
    const result = {};
    element.forEach(item => {
      item.innerHTML = item.innerText || item.textContent;
      nameLst.push(item.innerHTML)
    })

    nameLst.forEach(beast => {
    	reversedNameLst.push(beast.split('').reverse().join('')) ;
    })

    element.forEach((item , i) => result[item.innerHTML] = reversedNameLst[i]);

    element.forEach(item => {
    	item.innerHTML = result[item.innerHTML]
    })

    
}

reverseNameSnippet('.beast-name')
