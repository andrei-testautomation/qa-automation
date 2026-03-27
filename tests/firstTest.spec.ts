import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test('Locator syntax rules', async({page}) => {
    //by tag name
    await page.locator('input').first().click()

    //by id
    await page.locator('#inputEmail1').click()

    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder=Email"]')

    //by entire class full value
    page.locator('["input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selector
    page.locator('')
})

test('User facing locator', async({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click() //test id defined in source code
    await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click() // nb-card is the parent, nb-radio is child separated by regualar spaces
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click() //.nth uses the index
})

test('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: 'Password'}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()
})

test('Reusing the locators', async({page}) => {
    const basicForm = await page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async({page}) => {
    //single text value
    const basicForm = await page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    await expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonLabel = await page.locator('nb-radio').allTextContents()
    expect (allRadioButtonLabel).toContain("Option 1")

    //input values
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')

    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeHolderValuer = await emailField.getAttribute('placeholder')
    expect(placeHolderValuer).toEqual('Email')

})

test('Assetions', async({page}) => {
    const basicFormButton = await page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    //General assertion
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()

})
