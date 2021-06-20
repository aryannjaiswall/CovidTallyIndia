console.log("Welcome to index.js");


let state = document.getElementById('state');
let district = document.getElementById('district');

let getBtnDistrict = document.getElementById('getBtnDistrict');
let getBtnState = document.getElementById('getBtnState');

getBtnDistrict.addEventListener("click", () => {

    let stateV = state.value;
    let distV = district.value;

    console.log("You clicked bruh!!!");

    stateV = capitalize(stateV);
    distV = capitalize(distV);
    let html = "";

    // District Wise
    if (stateV === '' || distV === '' || stateV === '' && distV === '') {
        alert("State/District cannot be empty");
    }
    else {
        fetch('https://api.covid19india.org/state_district_wise.json').then(response => response.json())
            .then((data) => {

                
                html = `
                
                  <tr>
                    <td>${distV}</td>
                    <td>${data[stateV]["districtData"][distV]["active"]}</td>
                    <td>${data[stateV]["districtData"][distV]["confirmed"]}</td>
                    <td>${data[stateV]["districtData"][distV]["deceased"]}</td>
                    <td>${data[stateV]["districtData"][distV]["recovered"]}</td>
                  </tr>
                
            `
                let tdata = document.getElementById('tdata');
                tdata.innerHTML += html;
            });
        tdata.innerHTML = "";
    }
});

// State Wise
getBtnState.addEventListener("click", () => {

    let stateV = state.value;

    stateV = capitalize(stateV)


    if (stateV === "") {
        alert("State cannot be empty");
    }

    else {
        fetch('https://api.covid19india.org/state_district_wise.json').then(response => response.json())
            .then((data) => {
                //console.log(data);
                let arr = Object.keys(data[stateV]["districtData"]);
                console.log(arr);
                // console.log(arr[0])
                // console.log(data[stateV]);
                for(let i = 0; i < arr.length; i++){

                    html = `
                
                  <tr>
                    <td>${arr[i]}</td>
                    <td>${data[stateV]["districtData"][arr[i]]["active"]}</td>
                    <td>${data[stateV]["districtData"][arr[i]]["confirmed"]}</td>
                    <td>${data[stateV]["districtData"][arr[i]]["deceased"]}</td>
                    <td>${data[stateV]["districtData"][arr[i]]["recovered"]}</td>

                  </tr>
                
            `   
                let tdata = document.getElementById('tdata');
                tdata.innerHTML += html;
                console.log(data[stateV]["districtData"][arr[i]]["active"]);
                }

            });
        tdata.innerHTML = "";
    }
})

function capitalize(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        if(str[i] === "and") {
        
        }
        else{
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
    }

    return str.join(" ");
}