"use strict";

window.addEventListener("DOMContentLoaded", function () {

    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはlocal Storage機能が実装されていません");
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
            window.alert("key,Memoはいずれも必須（ひっす）です。");
            return;
        }

        const w_confirm = window.confirm(
            "LocalStorageに" + key + " " + value + "を保存（ほぞん）しますか？"
        );

        if (w_confirm === true) {
            localStorage.setItem(key, value);
            viewStorage();

            window.alert(
                "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。"
            );

            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
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

            const w_confirm = window.confirm(
                "LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか？"
            );

            if (w_confirm === true) {
                for (let i = 0; i < chkbox1.length; i++) {
                    if (chkbox1[i].checked) {
                        const key =
                            table1.rows[i + 1].cells[1].textContent;
                        localStorage.removeItem(key);
                    }
                }

                viewStorage();
                window.alert(
                    "LocalStorageから" + w_cnt + "件を削除(delete)しました。"
                );

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }
    }, false);
}


function allClearLocalStorage() {

    const allClear = document.getElementById("allClear");

    allClear.addEventListener("click", function (e) {
        e.preventDefault();

        const w_confirm = window.confirm(
            "LocalStorageのデータをすべて削除（all clear）します。\nよろしいですか？"
        );

        if (w_confirm === true) {
            localStorage.clear();
            viewStorage();

            window.alert(
                "LocalStorageからすべてのデータを削除(delete)しました。"
            );

            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
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
            window.alert("一つ選択し(select)してください。");
            return 0;
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            window.alert("一つ以上選択(select)してください。");
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

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.textContent = w_key;
        td3.textContent = localStorage.getItem(w_key);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        list.appendChild(tr);
    }

    // tablesorter
    if (window.jQuery && $("#table1").tablesorter) {
        $("#table1").tablesorter({ sortList: [[1, 0]] });
        $("#table1").trigger("update");
    }
}
