

window.addEventListener('load', () => {
    const list = document.getElementById("Container_Side_Bar_List");
    let newList = new Array();
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test userskdddd", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    newList.push({rank: 1, username: "test user", amount: '500000'})
    // get list data
    newList.forEach((user) => {
        const item = document.createElement('li');
        item.className = "Container_Side_Bar_List_Item";
        list.appendChild(item);
        const text = document.createElement("h2");
        text.className = "Container_Side_Bar_List_Item_Text";
        text.innerHTML = `${user.rank}. ${user.username} | ${user.amount.toLocaleString()}`;
        item.appendChild(text);
    });
});