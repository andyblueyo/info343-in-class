//put interpreter into strict mode
"use strict";

console.log(numeral(BABYNAMES.length).format("0,0")); // get number of elements in an array

function compareSex(sex) { //closure returning a function to a function
    return function(record) {
        return sex == record.sex;
    }
}

function compareByCount(rec1, rec2) {
    return rec1.count - rec2.count;
}

function descending (comparator) {
    return function(rec1, rec2) {
        return -(comparator(rec1, rec2));
    }
}

var females = BABYNAMES.filter(compareSex("F"));
females.sort(descending(compareByCount));
console.log(females.length);

var males = BABYNAMES.filter(compareSex("M"));
males.sort(compareByCount);
console.log(males.length);


var tbody = document.querySelector("tbody");

function render(records) {
        tbody.innerHTML = "";
        records.forEach(function(record) {

        var tr = document.createElement("tr");
        tr.classList.add("sex-" + record.sex.toLowerCase());

        var td = document.createElement("td");
        td.textContent = record.name; //safe way to prevent injection attacks
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent = record.sex;
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent = record.count;
        tr.appendChild(td);

        tbody.appendChild(tr);


    });
}

render(BABYNAMES);

var searchInput = document.getElementById("name-search-input");
searchInput.addEventListener("input", function() { 
    // console.log("inputs event");
    var query = searchInput.value.toLowerCase();
    if (query.length < 2) {
        render(BABYNAMES);
        return;
    }
    var matches = BABYNAMES.filter(function(record) {
        return record.name.toLowerCase().indexOf(query) >= 0;
    });
    render(matches);
});

var countColHeading = document.getElementById("count-col-header");
countColHeading.addEventListener("click", function() {
    // console.log("cliked col header");
    BABYNAMES.sort(descending(compareByCount));
    render (BABYNAMES);
});

