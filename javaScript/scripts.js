const studentModal = document.querySelector('#student-modal');
const studentForm = document.querySelector('#student-form');
const studentModalTitle = document.querySelector('#student-modal-title');
const saveStudentButton = document.querySelector('#save-student');

const openStudentModal = () => studentModal.showModal();
const closeStudentModal = () => studentModal.close();

const subjectModal = document.querySelector('#subject-modal');
const subjectForm = document.querySelector('#subject-form');
const subjectModelTitle = document.querySelector('#subject-modal-title');
const saveSubjectButton = document.querySelector('#save-subject');

const openSubjectModal = () => subjectModal.showModal();
const closeSubjectModal = () => subjectModal.close();

const loadStudentTable = () => {
  fetch('http://localhost:3000/alunos')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createStudentTableRow(item.nome, item.matricula, item.curso, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
};

const createStudentTableRow = (nome, matricula, curso, id) => {
  const studentTable = document.querySelector('#student-table tbody')
  const tableTr = document.createElement('tr');
  tableTr.innerHTML = ` 
  <td>${nome}</td>
  <td>${matricula}</td>
  <td>${curso}</td>
  <td align="center">
    <button class="button button--danger" onclick=deleteStudentTable(${id})>Apagar</button>
    <button class="button button--success" onclick="editdStudentModal(${id})">Editar</button>
  </td>`;
  studentTable.appendChild(tableTr);
}

const clearstudentTableRow = () => {
  const studentTableBody = document.querySelector('#table-body');
  studentTableBody.innerHTML = '';
}

const createStudent = () => {
  openStudentModal();
  studentModalTitle.textContent = 'Novo Aluno';
  saveStudentButton.textContent = 'Criar';
  saveStundentData('http://localhost:3000/alunos',  'POST');
}

const editdStudentModal = async (studentId)  => {
  const url = `http://localhost:3000/alunos/${studentId}`;
  openStudentModal();
  studentModalTitle.textContent='Editar aluno';
  saveStudentButton.textContent = 'Editar';
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso =  document.querySelector("#curso");
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    name.value = data.nome
    matricula.value = data.matricula
    selectCurso.value =  data.curso
  })
  saveStundentData(url,  'PUT');
};

const saveStundentData = (url, method) => {
  studentForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    .then(() => {
      studentForm.reset();
      clearstudentTableRow();
      closeStudentModal();
      loadStudentTable();
    })
    .catch(error => {
        closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
  });
}

const deleteStudentTable = async (studentId)  =>  
  fetch(`http://localhost:3000/alunos/${studentId}`, {method : 'DELETE'})
  .then(() => {
    clearstudentTableRow();
    loadStudentTable();
  })
  .catch(error => {
    alert('ocorreu um erro tente mais tarde');
    console.error(error);
  });

function loadSubjectCard() {
  fetch('http://localhost:3000/disciplinas')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(item => {
        createSubjectCard(item.nome, item.cargaHoraria, item.professor, item.status,item.observacos, item.id)
      })
    }).catch(error => {
      alert('ocorreu um erro tente mais tarde')
      console.error(error);
    });
}

function createSubjectCard(nome, cargaHoraria, professor, status, observacos, id) {
  const subjectCard = document.querySelector('#subjectCardList')
  const subjectDiv = document.createElement('div');
  subjectDiv.innerHTML = ` 
    <div class="subject-card">
      <h3 class="subject-card__title">${nome}</h3>
        <hr />
        <ul class="subject-card__list">
          <li>carga horária: ${cargaHoraria}</li>
          <li>Professor: ${professor}</li>
          <li>Status <span class="tag ${status === 'Opcional' ? 'tag--success' : 'tag--danger'}">${status}</span></li>
        </ul>
        <p>${observacos}.</p>
        <div class="subject-card_button">
          <button class="button button--danger subject-button_space" onclick=deleteSubjectCard(${id})>Apagar</button>
          <button class="button button--success" onclick="editdSubjectModal(${id})">Editar</button>
        </div>
    </div>
    `;
  subjectCard.appendChild(subjectDiv);
}

const clearSubjectCards = () => {
  const studentTableBody = document.querySelector('#subjectCardList');
  studentTableBody.innerHTML = '';
}

function createSubject() {
  openSubjectModal();
  subjectModelTitle.textContent = 'Novo disciplina';
  saveSubjectButton.textContent = 'Criar';
  saveSubjectData('http://localhost:3000/disciplinas',  'POST');
}

const editdSubjectModal = async (studentId)  => {
  const url = `http://localhost:3000/disciplinas/${studentId}`;
  openSubjectModal();
  subjectModelTitle.textContent='Editar disciplina';
  saveSubjectButton.textContent = 'Editar';
  const name =  document.querySelector('#nomeDisciplina');
  const cargaHoraria =  document.querySelector('#cargaHoraria');
  const professor =  document.querySelector('#professor');
  const selectStatus =  document.querySelector("#status");
  const textAreaObs = document.querySelector('#observacos');
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    name.value = data.nome
    cargaHoraria.value = data.cargaHoraria
    professor.value = data.professor
    selectStatus.value =  data.status
    textAreaObs.value = data.observacos
  })
  saveSubjectData(url,  'PUT');
};

const saveSubjectData = (url, method) => {
  subjectForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(subjectForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    .then(() => {
      subjectForm.reset();
      closeSubjectModal();
      clearSubjectCards();
      loadSubjectCard();
    })
    .catch(error => {
      closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
  });
}

function deleteSubjectCard(cardId) {
  fetch(`http://localhost:3000/disciplinas/${cardId}`, {method : 'DELETE'})
  .then(() => {
    clearSubjectCards();
    loadSubjectCard();
  })
  .catch(error => {
    alert('ocorreu um erro tente mais tarde');
    console.error(error);
  });
}

loadStudentTable();
loadSubjectCard();




