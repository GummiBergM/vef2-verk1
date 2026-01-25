/* útfæra */

const categories = [
    ["1", "general_knowledge", "Almenn kunnátta"],
    ["2", "nature_and_science", "Náttúra og vísindi"],
    ["3", "books_and_arts", "Bókmenntir og listir"],
    ["4", "history", "Saga"],
    ["5", "geology", "Landafræði"],
    ["6", "entertainment_and_fun", "Skemmtun og afþreying"],
    ["7", "sports", "Íþróttir og tómstundir"]
];

const categoriesIndex = document.getElementById("categories");

for (let i = 0;i < categories.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");

    const a = document.createElement("a");
    a.href = "./" + categories[i][1] + ".html";
    a.textContent = categories[i][2];
    div.appendChild(a);
    categoriesIndex.appendChild(div);
};