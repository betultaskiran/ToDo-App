const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));
/*localStorage'dan todos anahtarıyla saklanmış yapılacaklar listesini alır ve JSON formatından JavaScript nesnesine dönüştürür.*/

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");

      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();

      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

/*HTML Seçicileri: Form, giriş alanı ve yapılacaklar listesini seçer.
localStorage: Sayfa yüklendiğinde saklanmış yapılacaklar localStorage'dan alınır ve sayfaya eklenir.
Form Gönderimi: Form gönderildiğinde yeni yapılacak öğesi eklenir.
addTodo Fonksiyonu: Yeni yapılacak öğesi ekler, tıklanabilir ve sağ tıklanabilir olaylar ekler.
updateLS Fonksiyonu: Yapılacaklar listesini localStorage'a kaydeder.*/
