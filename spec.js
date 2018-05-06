// spec.js

const submitBtn = element(by.css('div a[id="Save"]'))
const closeModalBtn = element(by.className('fa fa-2x fa-times btn-close-modal'))
const candEspontaneaBtn =  element(by.css('div a[onclick^="change_cand_title"]'))
const teleInput = element(by.id('Telemovel'))
const getToastMessage = element.all(by.className('toast-message'))
const nomeInput = element(by.id('Nome'))
const emailInput = element(by.id('Email'))
const tecnologiasInput = element(by.className('select2-search__field'))
const correctIcon = element(by.css('img[src="../../img/correct_icon.png"]'))
const candTitle = element(by.id('cand-title'))


const reloadSessaoOportunidades = () => {
    browser.waitForAngularEnabled(false);
    browser.get('http://aubay.pt/Home/Index_PT'); 
    element(by.className('fa fa-angle-down fa-2x')).click()
    browser.sleep('3000');
    element(by.cssContainingText('li a','Oportunidades')).click()
}

describe('Validar campos obrigatórios.', () =>{
  
  it('Acessar a sessão Oportunidades', () => {
    reloadSessaoOportunidades()
    browser.sleep('3000');
    expect(candEspontaneaBtn.getText()).toEqual('Candidatura Espontânea')
  });
  
  it('Abrir e fechar modal pressionando btn-close-modal', () =>{
    candEspontaneaBtn.click()
    browser.sleep('2000');
    expect(candTitle.isDisplayed()).toBe(true)
    closeModalBtn.click()
    browser.sleep('2000');
    expect(candTitle.isDisplayed()).toBe(false)
  });

  it('Submeter sem preencher Nome, Telemovel, Email e Tecnologias', () =>{
    candEspontaneaBtn.click()
    browser.sleep('3000');
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Nome Telemovel Email Tecnologias !')
  });

  it('Submeter sem preencher Telemovel, Email e Tecnologias', () =>{
    nomeInput.sendKeys('Nome123@#$%¨&ªº')
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Telemovel Email Tecnologias !')
  });

  it('Submeter sem preencher Email e Tecnologias', () =>{
    teleInput.sendKeys('111111111')
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Email Tecnologias !')
  });
  it('Submeter sem preencher Tecnologias', () =>{
    emailInput.sendKeys('test@test.com')
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Tecnologias !')
  });
});

describe('Validar campo telemóvel DDI Portugal. ', () =>{
  it('Submetendo entrada de numeros menor que 9 dig.', () =>{
    teleInput.clear()
    teleInput.sendKeys('11111111')
    tecnologiasInput.sendKeys('.Net\n')
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Número de telemóvel inválido! Verifique o código e o número.')
  })
  
  it('Validando entrada de caracteres numericos igual a que 9 dig. ', ()=>{
    teleInput.clear()
    teleInput.sendKeys('111111111\t')    
    expect(correctIcon.isDisplayed()).toBe(true)
  })
  
  it('Submetendo entrada de caracteres especiais menor que 9 dig. ', ()=>{
    teleInput.clear()
    teleInput.sendKeys('aA!@#§ªº')
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Número de telemóvel inválido! Verifique o código e o número.')
  })
  
  it('Validando entrada de caracteres especiais igual a que 9 dig.', ()=>{
    teleInput.clear()
    teleInput.sendKeys('aA!@#§*ªº\t')
    expect(correctIcon.isDisplayed()).toBe(true)
  })
  it('Submetendo entrada de email invalido.', () =>{
    emailInput.clear()
    emailInput.sendKeys('test')
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Email inválido!')
    emailInput.clear()
    emailInput.sendKeys('test@')
    submitBtn.click()
    let warn2 = getToastMessage.first()
    expect(warn.getText()).toEqual('Email inválido!')
  })
  it('Submetendo entrada de email valido.', () =>{
    emailInput.clear()
    emailInput.sendKeys('test@test.com')
    submitBtn.click()
    let warn = getToastMessage.first()
    expect(warn.getText()).toEqual('Email inválido!')
  })
})