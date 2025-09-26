const inputTitleEl      = document.querySelector('#inputTitle');
const inputMetaTitleEl  = document.querySelector('#inputMetaTitle');
const inputKeywordEl    = document.querySelector('#inputKeyword');
const inputSlugEl       = document.querySelector('#inputSlug');
const inputSummaryEl    = document.querySelector('#inputSummary');
const inputArticleEl    = document.querySelector('#inputArticle');
const inputCategoriesEl = document.querySelector('#inputCategories');
const inputTagsEl       = document.querySelector('#inputTags');
const inputStatusEl     = document.querySelector('#inputStatus');

const formInputs = document.querySelector('#post-form');

const checkTitle = () => {
    let valid = false;
    const min = 3, max = 100;

    const title = inputTitleEl.value.trim();
    
    if(!isRequired(title)) {
        showError(inputTitleEl, 'Este campo é obrigatório!');
    } else if(!isBetween(title.length, min, max)) {
        showError(inputTitleEl, `O titulo deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputTitleEl);
        valid = true;
        
    }
    return valid;
}

const checkMetaTitle = () => {
    let valid = false;
    const min = 3, max = 120;

    const metaTitle = inputMetaTitleEl.value.trim();
    
    if(!isRequired(metaTitle)) {
        showError(inputMetaTitleEl, 'Este campo é obrigatório!');
    } else if(!isBetween(metaTitle.length, min, max)) {
        showError(inputMetaTitleEl, `O titulo deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputMetaTitleEl);
        valid = true;
        
    }
    return valid;
}

const checkKeyword = () => {
    let valid = false;
    const min = 0, max = 160;

    const keyword = inputKeywordEl.value.trim();
    
    if(!isRequired(keyword)) {
        showError(inputKeywordEl, 'Este campo é obrigatório!');
    } else if(!isBetween(keyword.length, min, max)) {
        showError(inputKeywordEl, `O titulo deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputKeywordEl);
        valid = true;
        
    }
    return valid;

}

const checkSlug = () => {
    let valid = false;
    const min = 3, max = 120;

    const slug = inputSlugEl.value.trim();
    
    if(!isRequired(slug)) {
        showError(inputSlugEl, 'Este campo é obrigatório!');
    } else if(!isBetween(slug.length, min, max)) {
        showError(inputSlugEl, `O slug deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputSlugEl);
        valid = true;
        
    }
    return valid;
}

const checkSummary = () => {
    let valid = false;
    const min = 3, max = 120;

    const summary = inputSummaryEl.value.trim();
    
    if(!isRequired(summary)) {
        showError(inputSummaryEl, 'Este campo é obrigatório!');
    } else if(!isBetween(summary.length, min, max)) {
        showError(inputSummaryEl, `O resumo deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputSummaryEl);
        valid = true;
        
    }
    return valid;
}

const checkArticle = () => {
    let valid = false;
    const min = 3, max = 20000;

    const article = editor.getData();

    if(!isRequired(article)) {
        showError(inputArticleEl, 'Este campo é obrigatório!');
    } else if(!isBetween(article.length, min, max)) {
        showError(inputArticleEl, `O resumo deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputArticleEl);
        valid = true;
        
    }
    return valid;
}

const checkCategories = () => {
    let valid = false;
    const min = 1, max = 2000;

    const categories = inputCategoriesEl.selectedOptions;
    var values = Array.from(categories).map(({ value }) => value);

    if(!isRequired(values)) {
        showError(inputCategoriesEl, 'Este campo é obrigatório!');
    } else if(!isBetween(values.length, min, max)) {
        showError(inputCategoriesEl, `A categoria deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputCategoriesEl);
        valid = true;
        
    }
    return valid;  
}

const checkTags = () => {
    let valid = false;
    const min = 1, max = 2000;

    const tags = inputTagsEl.selectedOptions;
    var values = Array.from(tags).map(({ value }) => value);

    if(!isRequired(values)) {
        showError(inputTagsEl, 'Este campo é obrigatório!');
    } else if(!isBetween(values.length, min, max)) {
        showError(inputTagsEl, `A tag deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputTagsEl);
        valid = true;
        
    }
    return valid;
}

const checkStatus = () => {
    let valid = false;
    const min = 1, max = 1;

    const status = inputStatusEl.value.trim();
    
    if(!isRequired(status)) {
        showError(inputStatusEl, 'Este campo é obrigatório!');
    } else if(!isBetween(status.length, min, max)) {
        showError(inputStatusEl, `O status deve conter entre ${min} e ${max} caracteres!`);
    } else {
        showSuccess(inputStatusEl);
        valid = true;
        
    }
    return valid;
}

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    const formField = input;
    const formFieldParent = input.parentElement;

    formField.classList.remove('is-valid');
    formField.classList.add('is-invalid');

    const error = formFieldParent.querySelector('small');
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input;
    const formFieldParent = input.parentElement
    
    formField.classList.remove('is-invalid');
    formField.classList.add('is-valid');

    const error = formFieldParent.querySelector('small');
    error.textContent = '';
}

formInputs.addEventListener('submit', function (e) {
    e.preventDefault();

    let isInputTitleValid = checkTitle(),
        isInputMetaTitleValid = checkMetaTitle(),
        isInputKeywordValid = checkKeyword(),
        isInputSlugValid = checkSlug(),
        isInputSummaryValid = checkSummary(),
        isInputArticleValid = checkArticle(),
        isInputCategoriesValid = checkCategories(),
        isInputTagsValid = checkTags(),
        isInputStatusValid = checkStatus();

    let isFormValid = isInputTitleValid &&
                      isInputMetaTitleValid &&
                      isInputKeywordValid &&
                      isInputSlugValid &&
                      isInputSummaryValid &&
                      isInputArticleValid &&
                      isInputCategoriesValid &&
                      isInputTagsValid &&
                      isInputStatusValid;

    if(isFormValid){
        
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

formInputs.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'inputTitle':
            checkTitle();
            break;
        case 'inputMetaTitle':
            checkMetaTitle();
            break;
        case 'inputSlug':
            checkSlug();
            break; 
        case 'inputKeyword':
            checkKeyword();
            break;
        case 'inputSummary':
            checkSummary();
            break;
        case 'inputArticle':
            checkArticle();
            break;
        case 'inputCategories':
            checkCategories();
            break;
        case 'inputTags':
            checkTags();
            break;
        case 'inputStatus':
            checkStatus();
            break;
    
    }
}))