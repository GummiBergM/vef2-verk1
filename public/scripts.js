/* útfæra */
const categories = [
    ["Almenn kunnátta", "general_knowledge"],
    ["Náttúra og vísindi", "nature_and_science"],
    ["Bókmenntir og listir", "books_and_arts"],
    ["Saga", "history"],
    ["Landafræði", "geology"],
    ["Skemmtun og afþreying", "entertainment_and_fun"],
    ["Íþróttir og tómstundir", "sports"]
];

const categoriesIndex = document.getElementById("categories");

for (let i = 0;i < categories.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");

    const a = document.createElement("a");
    a.href = "./" + categories[i][1] + ".html";
    a.textContent = categories[i][0];
    div.appendChild(a);
    categoriesIndex.appendChild(div);
};