fetch("https://dummyjson.com/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    if (!Array.isArray(data)) {
      if (data && Array.isArray(data.users)) {
        data = data.users;
      }
    }

    data = data.slice(0, 3);

    const contact_list = document.getElementById("contact_list");

    const renderContacts = (contacts) => {
      const userCards = contacts.map((user) => {
        return `
          <div class="col-md-4 mb-3">
              <div class="contact__item__container" id="contact__item__container">
                  <div class="contact__detail__container">
                      <img src="${user.image || 'https:dummyjson.com/icon/emilys/100'}" alt="${user.firstName || user.name}" style="width: 100px; height: 100px;" />
                      <div class="contact__detail__container-data">
                          <p class="main__container-title">${user.firstName || user.name} ${user.lastName || ''}</p>
                          <p class="main__container-paragraph">${user.email}</p>
                      </div>
                  </div>
                  <button class="main__container-button-danger main__container-button">x</button>
              </div>
          </div>
        `;
      });
      contact_list.innerHTML = userCards.join('');

      const deleteButtons = document.querySelectorAll(".main__container-button-danger");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const container = this.closest(".col-md-4"); 
          container.remove(); 
        });
      });
    };

    renderContacts(data);

    const addButton = document.getElementById("addButton");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");

    addButton.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      if (name && email) {
        const newUser = {
          name: name,
          email: email,
          image: 'https:dummyjson.com/icon/emilys/100' 
        };

        data.push(newUser);

        renderContacts(data);

        nameInput.value = '';
        emailInput.value = '';
      } else {
        alert("Please enter both name and email.");
      }
    });
  });
