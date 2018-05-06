// spec.js
describe('Testes Usando Protractor. ', () => {
  it('Acessar a sessão Oportunidades', () => {
    browser.waitForAngularEnabled(false);
    browser.get('http://aubay.pt/Home/Index_PT'); 
    element(by.className('fa fa-angle-down fa-2x')).click()
    browser.sleep('3000');
    element(by.cssContainingText('li a','Oportunidades')).click()
    browser.sleep('3000');
    let candEsp = element(by.css('div a[onclick^="change_cand_title"]')).getText()  
    expect(candEsp).toEqual('Candidatura Espontânea')
  });
  
});

describe('Validar campos obrigatórios.', () =>{
  
  it('Abrir e fechar modal pressionando btn-close-modal', () =>{
    element(by.css('div a[onclick^="change_cand_title"]')).click()
    browser.sleep('2000');
    expect(element(by.id('cand-title')).isDisplayed()).toBe(true)
    browser.sleep('1000');
    element(by.className('fa fa-2x fa-times btn-close-modal')).click()
    browser.sleep('2000');
    expect(element(by.id('cand-title')).isDisplayed()).toBe(false)
  });

  it('Submeter sem preencher Nome, Telemovel, Email e Tecnologias', () =>{
    browser.sleep('3000');
    element(by.css('div a[onclick^="change_cand_title"]')).click()
    browser.sleep('3000');
    element(by.css('div a[id="Save"]')).click()
    expect(element(by.className('toast-message')).getText()).toEqual('Campos obrigatórios: Nome Telemovel Email Tecnologias !')
  });

  it('Submeter sem preencher Telemovel, Email e Tecnologias', () =>{
    browser.sleep('5000');
    element(by.id('Nome')).sendKeys('Nome123@#$%¨&ªº')
    element(by.css('div a[id="Save"]')).click()
    let warn = element.all(by.className('toast-message')).first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Telemovel Email Tecnologias !')
  });

  it('Submeter sem preencher Email e Tecnologias', () =>{
    browser.sleep('5000');
    element(by.id('Telemovel')).sendKeys('111111111')
    element(by.css('div a[id="Save"]')).click()
    let warn = element.all(by.className('toast-message')).first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Email Tecnologias !')
  });
  it('Submeter sem preencher Tecnologias', () =>{
    browser.sleep('5000');
    element(by.id('Email')).sendKeys('test@test.com')
    element(by.css('div a[id="Save"]')).click()
    let warn = element.all(by.className('toast-message')).first()
    expect(warn.getText()).toEqual('Campos obrigatórios: Tecnologias !')
  });
})