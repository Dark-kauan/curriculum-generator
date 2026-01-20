// inicio das funçoes que pegam as informações do campo enquanto o usuario digita e exibe em tempo real no curriculo

const edit = document.getElementById('edit');
edit.addEventListener('click', () => {

    document.getElementById('form').style.display = 'block';

    edit.style.display = 'none';

});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', (e) => {

    e.preventDefault();

    document.getElementById('form').style.display = 'none';

    edit.style.display = 'block';
});

const nome = document.getElementById('name');
nome.addEventListener('input', function() {

    nome.value = nome.value.replace(/[0-9!@#$%¨&()_+/*:;=",[{}?]/g, '');

    document.getElementById('relative-name').textContent = nome.value;
});

const road = document.getElementById('road');
road.addEventListener('input', function() {

    const relativeRoad = document.getElementById('relative-road');

    if(road.value !== '') {

        relativeRoad.textContent = `${road.value},`;
    }
    else {

        relativeRoad.textContent= '';
    }
});

const houseNumber = document.getElementById('house-number');
houseNumber.addEventListener('input', function() {

    const relativeHouseNumber = document.getElementById('relative-house-number');
    
    houseNumber. value = houseNumber.value.replace(/\D/g, '');
    
    if(houseNumber.value !== '') {

        relativeHouseNumber.textContent = `${houseNumber.value} |`;
    }
    else {

        relativeHouseNumber.textContent= '';
    }
});

const state = document.getElementById('state');
state.addEventListener('input', function() {

    state.value = state.value.replace(/[0-9!@#$%¨&()_+/*:;="',{}?-]/g, '');

    document.getElementById('relative-state').textContent = state.value;
});

const email = document.getElementById('email');
email.addEventListener('input', () => {

    document.getElementById('relative-email').textContent = email.value;
})

const objective = document.getElementById('objective');
objective.addEventListener('input', () => {

    objective.value = objective.value.replace(/[0-9@#$%¨&_+/*:;='{}]/g, '');

    document.getElementById('relative-objective').textContent = objective.value;

});

// ====================================== acaba aqui ======================================

const dataFormation = [];
const formationAdc = document.getElementById('formation-adc');
formationAdc.addEventListener('click', function() {

    const formation = document.getElementById('formation-name').value;
    const time = document.getElementById('mudule').value;

    if (formation === '' || time === '') {

        alert("Preencha todos os campos antes de adicioná-los")
        return;
    }

    const formationObj = { formation: formation, time: time };
    dataFormation.push(formationObj);

    const newFormation = document.createElement('div');
    newFormation.classList.add('formation-info');

    // Preenche o conteúdo da formação e do período criando um botao para apagar
    newFormation.innerHTML = `
        <p>${formation} - ${time}</p>
        <button class="formation-remove">Remover</button>`;

     // Adiciona a newFormation à formations
    document.getElementById('formations').appendChild(newFormation);

    document.getElementById('formation-name').value = '';
    document.getElementById('mudule').value = '';

    // Função para remover a experiência quando o botão "Remover" for clicado
    newFormation.querySelector('.formation-remove').addEventListener('click', function() {
        newFormation.remove();

        const index = dataFormation.indexOf(formationObj);
        if (index > -1) {
            
            dataFormation.splice(index, 1);
        }
    });
});
// contador para criação de id dinamico
let workInfoCont = 1;
let enterpriseCont = 1;
let contributionTimeCont = 1;
let workNameCont = 1;

const workAdc = document.getElementById('work-adc');
workAdc.addEventListener('click', () => {

    const work = document.getElementById('work').value;
    const enterprise = document.getElementById('enterprise').value;
    const contributionTime = document.getElementById('contribution-time').value;

    if (work === '' || enterprise === '' || contributionTime === '') {

        alert("Preeencha todos os campos antes de adicioná-los");

        return;
    }
    // cria uma div onde vai ir todas as informações de trabalho
    const newWork = document.createElement('div');

    // cria strings para criação de ids dinamicos
    let workInfo = 'work-info';
    let enterpriseInfo = 'enterprise-info';
    let contributionTimeInfo = 'contribution-time-info';
    let workNameInfo = 'work-name-info';

    // pega o ultimo digito (contado) e apaga para poder adicionar outro
    const workText = workInfo.replace(/\d+$/, '');
    const enterpriseText = enterpriseInfo.replace(/\d+$/, '');
    const contributionText = contributionTimeInfo.replace(/\d+$/, '');
    const workNameText = workNameInfo.replace(/\d+$/, '');

    // concatena o texto com o contador, para sempre ter um id novo
    workInfo = workText + workInfoCont;
    enterpriseInfo = enterpriseText + enterpriseCont;
    contributionTimeInfo = contributionText + contributionTimeCont;
    workNameInfo = workNameText + workNameCont;

    // adiciona mais um ao valor dos ids
    workInfoCont++;
    enterpriseCont++;
    contributionTimeCont++;
    workNameCont++;

    newWork.classList.add('work-info');
    newWork.id = workInfo;

    // Preenche a div com as informações do trabalho
    newWork.innerHTML = `
        <h3 id="${workNameInfo}">${work}</h3>

        <p id="${enterpriseInfo}">${enterprise}</p>
        <p id="${contributionTimeInfo}">${contributionTime}</p>
        
        <button class="work-remove">Remover</button>
        <button class="work-edit">Editar</button>

        <ul class="activies"></ul>`;

    // Adiciona a newWork à exp-profi
    document.getElementById('exp-profi').appendChild(newWork);

    // faz o valor dos inputs serem limpos
    document.getElementById('work').value = '';
    document.getElementById('enterprise').value = '';
    document.getElementById('contribution-time').value = '';


    // Função para remover o trabalho quando o botão "Remover" for clicado
    newWork.querySelector('.work-remove').addEventListener('click', function() {

        newWork.remove();
    });

    // função para poder editar os valores do newWork
    newWork.querySelector('.work-edit').addEventListener('click', function() {

        // faz o valor que foi adicionado ao curriculo voltar aos inputs para poderem ser editados
        document.getElementById('work').value = document.getElementById(`${workNameInfo}`).innerHTML;
        document.getElementById('enterprise').value = document.getElementById(`${enterpriseInfo}`).innerHTML;
        document.getElementById('contribution-time').value = document.getElementById(`${contributionTimeInfo}`).innerHTML;

        // verifica se o botao de adc existe caso ele exista, executa o if e para de executar a função
        if(!document.getElementById('work-adc')) {

            return;
        }
        // apaga o botao de adc
        document.getElementById('work-adc').remove();

        // verifica se o id save existe caso ele n exista o codigo dentro do if e executado;
        if (!document.getElementById('work-save')) {

            const saveBtn = document.createElement('button');
            saveBtn.innerHTML = 'Salvar';
            saveBtn.classList.add('btn-curriculo')
            saveBtn.id = 'work-save';

            const btns = document.getElementById('btns');

            // adiciona o saveBtn como filho da div btns
            btns.appendChild(saveBtn);

            // Adiciona evento de clique para o botão de salvar
            saveBtn.addEventListener('click', function() {

                // Atualiza os valores antigos com os novos valores
                document.getElementById(`${workNameInfo}`).innerHTML = document.getElementById('work').value;
                document.getElementById(`${enterpriseInfo}`).innerHTML = document.getElementById('enterprise').value;
                document.getElementById(`${contributionTimeInfo}`).innerHTML = document.getElementById('contribution-time').value;
                
                // Limpa os campos do formulário após salvar
                document.getElementById('work').value = '';
                document.getElementById('enterprise').value = '';
                document.getElementById('contribution-time').value = '';
                
                // Remove o botão de salvar após salvar as alterações
                saveBtn.remove();

                // cria novamente o botao adc e volta ele para sua posição
                const btnAdc = document.createElement('button');
                btnAdc.innerHTML = 'Adicionar';
                btnAdc.classList.add('btn-curriculo')
                btnAdc.id = 'work-adc';
                btns.appendChild(btnAdc);
            })
        }
    })
})

const activitiesAdc = document.getElementById('activities-adc');
    activitiesAdc.addEventListener('click', () => {

        const workElements = document.querySelectorAll('.work-info');

        // verifica se tem alguma classe com o nome desejado, caso n exista e exibido um erro e a função e parada
        if (workElements.length === 0) {

            alert("Preencha o campo anterior para adicionar uma atividade");
            return;
        }

        const mainActivities = document.getElementById('main-activities').value;

        // verifica se tem alguma coisa no input para ser adc, caso n exista e exibido um erro e a função e parada
        if (mainActivities ==='') {

            alert("Preencha o campo anterior para adicionar uma atividade");
            return;
        }

        // Seleciona o último trabalho adicionado. Retorna o total de elementos na lista. Subtrair 1 ajusta o índice porque, no JS os índices começam em 0
        const lastWork = workElements[workElements.length - 1];

        const activies = lastWork.querySelector('.activies');
        
        const list = document.createElement('li');
        list.textContent = mainActivities;

        activies.appendChild(list);

        document.getElementById('main-activities').value = '';
})

// Inicializa um contador para os cursos, para atribuir um ID único a cada curso adicionado
let curseCont = 1;

const curseAdc = document.getElementById('curse-adc');
curseAdc.addEventListener('click', () => {

    const curse = document.getElementById('curse').value;

    // Verifica se o campo está vazio; se estiver, exibe um erro e a função para
    if(curse === '') {
        alert("Preencha o campo anterior para adicionar um curso") 
        return;
    }

    // Seleciona o elemento 'relative-curses' onde o novo curso será adicionado
    const relativeCurse = document.getElementById('relative-curses');

    // Cria um novo elemento de lista (li) para o curso
    const curseLi = document.createElement('li');

    // Define uma string para ser concatenada e virar um id unico
    let curseInfo = 'curse-info';

    // Remove qualquer número final do ID base para que o contador possa ser incrementado direito
    const curseText = curseInfo.replace(/\d+$/, '');

    // Atribui um ID único ao curso combinando o texto base com o contador
    curseInfo = curseText + curseCont;

    // Incrementa o contador para que o próximo curso tenha um ID único
    curseCont++;

    // Define o ID e o texto do novo elemento de curso
    curseLi.id = curseInfo;
    curseLi.textContent = curse;

    // Anexa o novo curso à ('relative-curses')
    relativeCurse.appendChild(curseLi);

    // Cria um botão "Remover" para cada curso adicionado
    const curseRemove = document.createElement('button');
    curseRemove.classList.add('curse-remove');
    curseRemove.textContent = 'Remover'; // Define o texto do botão como "Remover"
    
    // Adiciona o botão "Remover" ao curseLi
    curseLi.appendChild(curseRemove);

    // Limpa o campo de entrada de curso após adicionar
    document.getElementById('curse').value = '';

    curseRemove.addEventListener('click', () => {
        curseLi.remove();
    });
});

let skillCont = 1;

const skillAdc = document.getElementById('skill-adc');
skillAdc.addEventListener('click', () => {

    const skill = document.getElementById('skill').value;

    if(skill === '') {

        alert("Preencha o campo anterior para adicionar uma habilidade");
        return;
    }

    const relativeSkills = document.getElementById('relative-skills');

    const skillLi = document.createElement('li');

    let skillInfo = 'skill-info';

    const skillText = skillInfo.replace(/\d+$/, '');

    skillInfo = skillText + skillCont;

    skillCont++;

    skillLi.id = skillInfo;
    skillLi.textContent = skill;
    relativeSkills.appendChild(skillLi);

    const skillRemove = document.createElement('button');
    skillRemove.classList.add('skill-remove');
    skillRemove.textContent = 'Remover';
    skillLi.appendChild(skillRemove);

    document.getElementById('skill').value = '';

    skillRemove.addEventListener('click', () => {
        skillLi.remove();
    });
})

let languageCont = 1;

const languageAdc = document.getElementById('language-adc');
languageAdc.addEventListener('click', () => {


    const language = document.getElementById('language').value;

    if(language === '') {

        alert("Preencha o campo anterior para adicionar um idioma");  
        return;
    }

    const relativeLanguage = document.getElementById('relative-language');

    const languageLi = document.createElement('li');

    let languageInfo = 'skill-info';

    const languageText = languageInfo.replace(/\d+$/, '');

    languageInfo = languageText + languageCont;

    languageCont++;

    languageLi.id = languageInfo;
    languageLi.textContent = language;
    relativeLanguage.appendChild(languageLi);

    const languageRemove = document.createElement('button');
    languageRemove.classList.add('language-remove');
    languageRemove.textContent = 'Remover';
    languageLi.appendChild(languageRemove);

    document.getElementById('language').value = '';
    
    languageRemove.addEventListener('click', () => {
        languageLi.remove();
    });
})

const phoneInput = document.getElementById('phone-number');

phoneInput.addEventListener('input', (e) => {
    clearErrors();
    
    let phone = phoneInput.value;
    phone = phone.replace(/\D/g, '');

    if (phone.length > 2) {

        phone = phone.replace(/^(\d{2})(\d)/, '($1) $2'); // Adiciona o DDD
    }
    if (phone.length >= 10) {

         // Adiciona o hífen depois do quinto dígito
        phone = phone.replace(/(\d{5})(\d{4})$/, '$1-$2');
    }

    const phoneNumber = document.getElementById('phone-number');
    const relativePhoneNumber = document.getElementById('relative-phone-number');

    if(phoneNumber.value !== '') {

       relativePhoneNumber.textContent = `${phone} |`;
    }
     else {

         relativePhoneNumber.textContent = '';
    }
    // passa o valor alterado do telefone para o event que está recebendo o input
    e.target.value = phone;
})

// =============================== validações =================================

// Validação do nome
function nameValidation() {
    clearErrors();

    if(validator.isEmpty(nome.value)) {

        return false;
    }

    // valida se o nome tem letras com acentos de linguas distintas, não aceita numeros ou caracteres especiais
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    if (!nameRegex.test(document.getElementById('relative-name').textContent)) {

        createError('* Nome inválido', nome);
        return false;
    }
    return true;
}

//verifica se o input não está vazio e se ele tem no minimo 15 caracteres
function phoneValidation() {
    clearErrors();

    const phone = phoneInput.value;

    if (validator.isEmpty(phone)) {

        createError('* Campo obrigatorio', phoneInput);
        return false;
    }

    if(phone.length === 15) {

        return true;
    }
    else {

        createError('* Numero invalido', phoneInput);
        return false;
    }
}


function emailValidation() {
    clearErrors();

    const email = document.getElementById('email');

    if (validator.isEmpty(email.value)) {

        return false;
    }

    // expressão que verifica o formato basico padrão do email
    const emailRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]{1,30}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    /*Está sendo utilizado a biblioteca "validator" e o "regex" para compensar brechas que ambos possuem*/

    if (!emailRegex.test(email.value) && !validator.isEmail(email.value)) {

        createError('* Email invalido', email);

        return false;
    }
    return true;
}

function validateEmpty (id) {

    const element = document.getElementById(id);

    if(element.textContent === '') {

        return false;
    }
    return true;
}

// ================================== fim das validações ==================================

// ============================== criação e limpeza de erros ==============================

function createError (message, input) {

    const elem = document.createElement('p');
    elem.classList.add('error');
    elem.textContent = message;
    input.insertAdjacentElement('afterend', elem);
}

function clearErrors() {

    const errorElem = document.querySelectorAll('.error');

    errorElem.forEach(el => el.remove());
}
// ========================== fim da criação e limpeza de erros ==========================

// ========================= events de input para filtrar o texto =========================

const formationInput = document.getElementById('formation-name');
formationInput.addEventListener('input', () => {

    formationInput.value = formationInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const timeInput = document.getElementById('mudule');
timeInput.addEventListener('input', () => {

    timeInput.value = timeInput.value.replace(/[!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const workInput = document.getElementById('work');
workInput.addEventListener('input', () => {

    workInput.value = workInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const enterpriseInput = document.getElementById('enterprise');
enterpriseInput.addEventListener('input', () => {

    enterpriseInput.value = enterpriseInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const contributionTimeInput = document.getElementById('contribution-time');
contributionTimeInput.addEventListener('input', () => {

    contributionTimeInput.value = contributionTimeInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const activitiesInput = document.getElementById('main-activities');
activitiesInput.addEventListener('input', () => {

    activitiesInput.value = activitiesInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})

const curseInput = document.getElementById('curse');
curseInput.addEventListener('input', () => {

    curseInput.value = curseInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const skillInput = document.getElementById('skill');
skillInput.addEventListener('input', () => {

    skillInput.value = skillInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})
const languageInput = document.getElementById('language');
languageInput.addEventListener('input', () => {

    languageInput.value = languageInput.value.replace(/[0-9!@#$%¨&()_+/*:;="',[{}?-]/g, '');
})