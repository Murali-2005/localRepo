let subjectData = [];
let currentSubjectIndex = 0;
let studentDetails = {};

function startSubjects() {
  studentDetails.name = document.getElementById("name").value;
  studentDetails.usn = document.getElementById("usn").value;
  studentDetails.branch = document.getElementById("branch").value;

  document.getElementById("studentForm").style.display = "none";
  document.getElementById("subjectForm").style.display = "block";
}

function updateProgressBar(current) {
  document.getElementById("progressBar").style.width = (current * 10) + '%';
  document.getElementById("progressText").textContent = `${current} / 10 Subjects Entered`;
}

function addSubject() {
  const name = document.getElementById("subjectName").value;
  const credits = parseInt(document.getElementById("credits").value);
  const ia1 = parseInt(document.getElementById("ia1").value);
  const ia2 = parseInt(document.getElementById("ia2").value);
  const ia3 = parseInt(document.getElementById("ia3").value);
  const cta = parseInt(document.getElementById("cta").value);
  const see = parseInt(document.getElementById("see").value);

  const bestTwo = [ia1, ia2, ia3].sort((a, b) => b - a).slice(0, 2);
  const cie = bestTwo[0] + bestTwo[1] + cta;
  const see50 = Math.round((see / 100) * 50);
  const total = cie + see50;

  let grade = '', gradePoint = 0;
  if (total >= 90) [grade, gradePoint] = ['O', 10];
  else if (total >= 80) [grade, gradePoint] = ['A+', 9];
  else if (total >= 70) [grade, gradePoint] = ['A', 8];
  else if (total >= 60) [grade, gradePoint] = ['B', 7];
  else if (total >= 50) [grade, gradePoint] = ['B+', 6];
  else if (total >= 45) [grade, gradePoint] = ['C', 5];
  else if (total >= 40) [grade, gradePoint] = ['P', 4];
  else [grade, gradePoint] = ['F', 3];

  subjectData[currentSubjectIndex] = {
    name, credits, ia1, ia2, ia3, cta, see, cie, see50, total, grade, gradePoint
  };

  currentSubjectIndex++;
  if (currentSubjectIndex < 10) {
    document.getElementById("subjectNumber").textContent = currentSubjectIndex + 1;
    clearInputs();
    updateProgressBar(currentSubjectIndex);
  } else {
    calculateCGPA();
  }
}

function goBackToPreviousSubject() {
  if (currentSubjectIndex > 0) {
    currentSubjectIndex--;
    populateSubjectForm(subjectData[currentSubjectIndex]);
    document.getElementById("subjectNumber").textContent = currentSubjectIndex + 1;
    updateProgressBar(currentSubjectIndex);
  }
}

function populateSubjectForm(subject) {
  document.getElementById("subjectName").value = subject.name;
  document.getElementById("credits").value = subject.credits;
  document.getElementById("ia1").value = subject.ia1;
  document.getElementById("ia2").value = subject.ia2;
  document.getElementById("ia3").value = subject.ia3;
  document.getElementById("cta").value = subject.cta;
  document.getElementById("see").value = subject.see;
}

function clearInputs() {
  ["subjectName", "credits", "ia1", "ia2", "ia3", "cta", "see"].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function calculateCGPA() {
  document.getElementById("subjectForm").style.display = "none";
  const totalGradePoints = subjectData.reduce((sum, s) => sum + s.gradePoint * s.credits, 0);
  const totalCredits = subjectData.reduce((sum, s) => sum + s.credits, 0);
  const cgpa = (totalGradePoints / totalCredits).toFixed(2);

  let html = `<h2>${studentDetails.name} - ${studentDetails.usn} (${studentDetails.branch})</h2>`;
  html += `<table><tr><th>Subject</th><th>Credits</th><th>Total Marks</th><th>Grade</th><th>Grade Points</th></tr>`;
  subjectData.forEach(sub => {
    html += `<tr><td>${sub.name}</td><td>${sub.credits}</td><td>${sub.total}</td><td>${sub.grade}</td><td>${sub.gradePoint}</td></tr>`;
  });
  html += `</table><h3>Your CGPA is: ${cgpa}</h3>`;

  document.getElementById("result").innerHTML = html;
  document.getElementById("result").style.display = "block";
}

document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});
