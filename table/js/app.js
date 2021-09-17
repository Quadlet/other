
(async () => {
    let DB = await (await fetch('/js/db.json')).json();
    let DB_1 = [], //Array with data for the current page
        statusBtn = 1;

    showAndHideColumns(DB_1);
    //Creating first page of the table
    let total = 0;
    let per_page = 10;
    if (statusBtn == 1) {
        total = 10;
        const prevBtn = document.querySelector('.prev');
        prevBtn.style.display = "none";
        for (let i = 0; i < 10; i++) {
            DB_1.push(DB[i]);
        }
        buildTable(DB_1);
        showForm(DB_1);
        sortTable(DB_1);
        DB_1 = [];

    }

    //Show and hide columns
    function showAndHideColumns(base) {
        const firstCheckBox = document.getElementById('firstCheckBox');
        firstCheckBox.onclick = function () {
            buildTable(base);
            showForm(base);
        };
        const secondCheckBox = document.getElementById('secondCheckBox');
        secondCheckBox.onclick = function () {
            buildTable(base);
            showForm(base);
        };
        const thirdCheckBox = document.getElementById('thirdCheckBox');
        thirdCheckBox.onclick = function () {
            buildTable(base);
            showForm(base);
        }
        const fourthCheckBox = document.getElementById('fourthCheckBox');
        fourthCheckBox.onclick = function () {
            buildTable(base);
            showForm(base);
        }
    }
    //The first filling of the table

    //Next button
    document.querySelector('.next').onclick = function NextBtn() {
        statusBtn++;
        total += per_page;
        if (total / per_page == 2) {
            const prevBtn = document.querySelector('.prev');
            prevBtn.style.display = "inline-block";
            sortTable(DB_1);
            DB_1 = [];
            for (let i = 10; i < total; i++) {
                DB_1.push(DB[i]);
            }
            buildTable(DB_1);
            showForm(DB_1);
            sortTable(DB_1);
            showAndHideColumns(DB_1);
            DB_1 = [];

        }
        if (statusBtn == total / per_page && total / per_page != DB.length / per_page) {
            sortTable(DB_1);
            DB_1 = [];
            for (let i = total - per_page; i < total; i++) {
                DB_1.push(DB[i]);
            }
            buildTable(DB_1);
            showForm(DB_1);
            sortTable(DB_1);
            showAndHideColumns(DB_1);
            DB_1 = [];
        } else if (total / per_page == DB.length / per_page) {
            sortTable(DB_1);
            DB_1 = [];
            for (let i = DB.length - per_page; i < DB.length; i++) {
                DB_1.push(DB[i]);
            }
            buildTable(DB_1);
            showForm(DB_1);
            sortTable(DB_1);
            showAndHideColumns(DB_1);
            this.style.display = "none";
        }

    }

    //Prev button
    document.querySelector('.prev').onclick = function PrevBtn(e) {
        statusBtn--;
        total -= per_page;
        DB_1 = [];
        if (total / per_page == 1) {
            this.style.display = "none";
            sortTable(DB_1);
            DB_1 = [];
            for (let i = 0; i < DB.length - 40; i++) {
                DB_1.push(DB[i]);
            }
            buildTable(DB_1);
            showForm(DB_1);
            sortTable(DB_1);
            showAndHideColumns(DB_1);
            DB_1 = [];
        }
        if (statusBtn == total / per_page) {
            sortTable(DB_1);
            DB_1 = [];
            for (let i = total - per_page; i < total; i++) {
                DB_1.push(DB[i]);
            }
            buildTable(DB_1);
            showForm(DB_1);
            sortTable(DB_1);
            showAndHideColumns(DB_1);
            DB_1 = [];
        }
        if (total / per_page == (DB.length / per_page - 1)) {
            sortTable(DB_1);
            DB_1 = [];
            const nextShow = document.querySelector('.next');
            nextShow.style.display = "inline-block";
            for (let i = DB.length - 20; i < DB.length - 10; i++) {
                DB_1.push(DB[i]);
            }
            buildTable(DB_1);
            showForm(DB_1);
            sortTable(DB_1);
            showAndHideColumns(DB_1);
            DB_1 = [];
        }

    }

    //Sort items by clicking on the table header
    function sortTable(arr) {
        const listTitles = document.querySelectorAll('.bg-info th');
        listTitles.forEach(item => {
            item.addEventListener('click', () => {
                let column = item.getAttribute('data-column');
                let order = item.getAttribute('data-order');
                if (order == 'desc') {
                    item.setAttribute('data-order', 'asc');
                    if (column == 'firstname') {
                        arr = arr.sort((a, b) => a.name.firstName > b.name.firstName ? 1 : -1);
                    } else if (column == 'lastname') {
                        arr = arr.sort((a, b) => a.name.lastName > b.name.lastName ? 1 : -1);
                    }
                    else {
                        arr = arr.sort((a, b) => a[column] > b[column] ? 1 : -1);
                    }

                } else {
                    item.setAttribute('data-order', 'desc');
                    if (column == 'firstname') {
                        arr = arr.sort((a, b) => a.name.firstName < b.name.firstName ? 1 : -1);
                    } else if (column == 'lastname') {
                        arr = arr.sort((a, b) => a.name.lastName < b.name.lastName ? 1 : -1);
                    }
                    else {
                        arr = arr.sort((a, b) => a[column] < b[column] ? 1 : -1);
                    }


                }
                buildTable(arr);
                showForm(arr);
            });

        });

        buildTable(arr);
        showForm(arr);
    }



    //Filling in the form with data from the table
    function showForm(arr) {
        let firstNameInput = document.querySelector('#fname'),
            lastNameInput = document.querySelector('#lname'),
            eColorInput = document.querySelector('#ecolor'),
            aboutInput = document.querySelector('#descr'),
            TrTags = document.querySelectorAll('#myTable tr'),
            arrCurrentTr = [];

        TrTags.forEach(item => {
            item.addEventListener('click', () => {
                const formStatus = document.querySelector('.form'),
                    editButton = document.querySelector('.edit'),
                    closeForm = document.querySelector('.close');
                //Show and hide the form
                toggle(formStatus);
                closeForm.onclick = function status() {
                    formStatus.style.display = 'none';
                }
                //Inserting the data of the selected row into the array
                for (let i = 0; i < item.children.length; i++) {
                    arrCurrentTr[i] = item.children[i].textContent;
                }
                //Filling in the form with data from the table
                firstNameInput.value = arrCurrentTr[0];
                lastNameInput.value = arrCurrentTr[1];
                eColorInput.value = arrCurrentTr[2];
                aboutInput.value = arrCurrentTr[3];
                //Changing the data in the table when you click
                document.querySelector('.edit').onclick = function myClick() {
                    arr[item.id].name.firstName = firstNameInput.value;
                    arr[item.id].name.lastName = lastNameInput.value;
                    arr[item.id].eyeColor = eColorInput.value;
                    arr[item.id].about = aboutInput.value;
                    buildTable(arr);
                    formStatus.style.display = 'none';
                    showForm(arr);
                };
            });
        })

    }


    //Show and hide form-block
    function toggle(el) {
        el.style.display = 'flex';
    }

    //Creating table
    function buildTable(data) {
        let table = document.getElementById('myTable');
        table.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            let row = `<tr id="${i}">
                            <td class="innerFirstName">${data[i].name["firstName"]}</td>
                            <td class="innerLastName">${data[i].name["lastName"]}</td>
                            <td class="innerEyeColor"><span class="color">${data[i].eyeColor}</span></td>
                            <td class="last">${data[i].about}</td>
                        </tr>`
            table.innerHTML += row;


        }
        //Add color in table
        let colorTags = document.querySelectorAll('.color');
        colorTags.forEach(item => {
            item.style.background = item.textContent;
        });
        //Сhecking checkboxes
        const firstCheckBox = document.getElementById('firstCheckBox'),
            secondCheckBox = document.getElementById('secondCheckBox'),
            thirdCheckBox = document.getElementById('thirdCheckBox'),
            fourthCheckBox = document.getElementById('fourthCheckBox'),
            firstTitle = document.querySelector('.first-title'),
            secondTitle = document.querySelector('.second-title'),
            thirdTitle = document.querySelector('.third-title'),
            fourthTitle = document.querySelector('.fourth-title');
        let firstTd = document.querySelectorAll('.innerFirstName'),
            secondTd = document.querySelectorAll('.innerLastName'),
            thirdTd = document.querySelectorAll('.innerEyeColor'),
            fourthTd = document.querySelectorAll('.last');

        if (firstCheckBox.checked) {
            firstTitle.classList.add('hide');
            firstTd.forEach(item => {
                item.classList.add('hide');
            });

        } else {
            firstTitle.classList.remove('hide');
            firstTd.forEach(item => {
                item.classList.remove('hide');
            });
        }

        if (secondCheckBox.checked) {
            secondTitle.classList.add('hide');
            secondTd.forEach(item => {
                item.classList.add('hide');
            });
        } else {
            secondTitle.classList.remove('hide');
            secondTd.forEach(item => {
                item.classList.remove('hide');
            });
        }

        if (thirdCheckBox.checked) {
            thirdTitle.classList.add('hide');
            thirdTd.forEach(item => {
                item.classList.add('hide');
            });
        } else {
            thirdTitle.classList.remove('hide');
            thirdTd.forEach(item => {
                item.classList.remove('hide');
            });
        }

        if (fourthCheckBox.checked) {
            fourthTitle.classList.add('hide');
            fourthTd.forEach(item => {
                item.classList.add('hide');
            });
        } else {
            fourthTitle.classList.remove('hide');
            fourthTd.forEach(item => {
                item.classList.remove('hide');
            });
        }
    }
})();


