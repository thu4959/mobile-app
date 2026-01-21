"use strict";

window.addEventListener("DOMContentLoaded", function () {

    if (typeof localStorage === "undefined") {
        swal.fire({
            title: "Memo app",
            html: "このブラウザはlocal Storage機能が実装されていません",
            type: "error",
            allowOutsideClick: false
        });
        return;
    }

    viewStorage();
    saveLocalStorage();
    delLocalStorage();
    allClearLocalStorage();
    selectTable();

}, false);


function saveLocalStorage() {

    const save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if (key === "" || value === "") {
            swal.fire({
                title: "Memo app",
                html: "Key,Memoはいずれも必須（ひっす）です。",
                type: "error",
                allowOutsideClick: false
            });
            return;
        } else {
            let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しますか？";
            swal.fire({
                title: "Memo app",
                html: w_msg,
                type: "question",
                showCancelButton: true
            }).then(function (result) {

                if (result.value === true) {
                    localStorage.setItem(key, value);
                    viewStorage();

                    let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
                    swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false
                    });

                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false);
}


function delLocalStorage() {

    const del = document.getElementById("del");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");

        const w_cnt = selectCheckBox("del");

        if (w_cnt >= 1) {

            swal.fire({
                title: "Memo app",
                html: "LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか？",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "はい",
                cancelButtonText: "いいえ"
            }).then(function (result) {
                if (result.value === true) {
                    for (let i = 0; i < chkbox1.length; i++) {
                        if (chkbox1[i].checked) {
                            const key =
                                table1.rows[i + 1].cells[1].textContent;
                            localStorage.removeItem(key);
                        }
                    }

                    viewStorage();
                    swal.fire({
                        title: "Memo app",
                        html: "LocalStorageから" + w_cnt + "件を削除(delete)しました。",
                        type: "success",
                        allowOutsideClick: false
                    });

                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false);
    //version-up5 add-str
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {
        if (e.target.classList.contains("trash") === true) {
            let index = e.target.parentNode.parentNode.rowIndex
            const key = table1.rows[index].cells[1].firstChild.data;
            const value = table1.rows[index].cells[2].firstChild.data;
            let w_delete = "LocalStorageから" + key + " " + value + "を削除(delete)しますか？";
            swal.fire({
                title: "Memo app",
                html: w_delete,
                type: "question",
                showCancelButton: true,
            }).then(result => {
                if (result.value === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorageから" + key + " " + value + "を削除(delete)しました！";
                    swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false,
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })
        }
    });
    //version-up5 add-str
}


function allClearLocalStorage() {

    const allClear = document.getElementById("allClear");

    allClear.addEventListener("click", function (e) {
        e.preventDefault();

        swal.fire({
            title: "Memo app",
            html: "LocalStorageのデータをすべて削除（all clear）します。<br>よろしいですか？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "はい",
            cancelButtonText: "いいえ"
        }).then(function (result) {
            if (result.value === true) {
                localStorage.clear();
                viewStorage();

                swal.fire({
                    title: "Memo app",
                    html: "LocalStorageからすべてのデータを削除(delete)しました。",
                    type: "success",
                    allowOutsideClick: false
                });

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    }, false);
}


function selectTable() {

    const select = document.getElementById("select");

    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBox("select");
    }, false);
}


function selectCheckBox(mode) {

    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].textContent;
                w_textMemo = table1.rows[i + 1].cells[2].textContent;
            }
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            swal.fire({
                title: "Memo app",
                html: "一つ選択(select)してください。",
                type: "warning",
                allowOutsideClick: false
            });
            return 0;
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            swal.fire({
                title: "Memo app",
                html: "一つ以上選択(select)してください。",
                type: "warning",
                allowOutsideClick: false
            });
            return 0;
        }
    }
}


function viewStorage() {

    const list = document.getElementById("list");

    while (list.rows.length > 0) {
        list.deleteRow(0);
    }

    for (let i = 0; i < localStorage.length; i++) {

        const w_key = localStorage.key(i);

        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        list.appendChild(tr);

    }

    // tablesorter
    if (window.jQuery && $("#table1").tablesorter) {
        $("#table1").tablesorter({ sortList: [[1, 0]] });
        $("#table1").trigger("update");
    }
}