let subjects = [];

function addSubject() {
    let name = document.getElementById("subject").value;
    let hours = parseInt(document.getElementById("hours").value);
    let category = document.getElementById("category").value;

    if (name && hours > 0) {
        subjects.push({ name, hours, category });
        displaySubjects();
        document.getElementById("subject").value = "";
        document.getElementById("hours").value = "";
    } else {
        alert("Enter valid details");
    }
}

function displaySubjects() {
    let list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach((sub, index) => {
        list.innerHTML += `
            <div class="subject-card">
                <span>${sub.name} (${sub.hours} hrs - ${sub.category})</span>
                <button class="delete-btn" onclick="deleteSubject(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    displaySubjects();
}

function generateTable() {

    let days = ["Mon","Tue","Wed","Thu","Fri"];
    let totalSlots = 6;

    let academicPool = [];
    let dailyPool = [];

    subjects.forEach(sub => {
        for (let i = 0; i < sub.hours; i++) {
            if (sub.category === "Academic")
                academicPool.push(sub.name);
            else
                dailyPool.push(sub.name);
        }
    });

    let table = "<table>";
    table += "<tr><th>Day</th>";

    for (let i = 1; i <= totalSlots; i++)
        table += "<th>Period " + i + "</th>";

    table += "</tr>";

    for (let d = 0; d < days.length; d++) {
        table += "<tr>";
        table += "<td><b>" + days[d] + "</b></td>";

        for (let s = 0; s < totalSlots; s++) {

            let subject;

            if (s < 4 && academicPool.length > 0) {
                subject = academicPool[Math.floor(Math.random() * academicPool.length)];
            } else if (dailyPool.length > 0) {
                subject = dailyPool[Math.floor(Math.random() * dailyPool.length)];
            } else {
                subject = "";
            }

            table += "<td>" + subject + "</td>";
        }

        table += "</tr>";
    }

    table += "</table>";

    document.getElementById("timetable").innerHTML = table;
}
