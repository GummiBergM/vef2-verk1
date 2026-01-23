const categories = [
    "general_knowledge",
    "nature_and_science",
    "books_and_arts",
    "history",
    "geology",
    "entertainment_and_fun",
    "sports"
];

const categoriesIndex = document.getElementById("categories");

for (let i = 0;i < categories.length; i++) {
    const a = document.createElement("a");
    a.href = "./dist/" + categories[i] + ".html";
    a.textContent = categories[i];
    categoriesIndex.appendChild(a);
};
