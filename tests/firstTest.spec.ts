import {test} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('The first test', async ({page}) => { // async tell that there are might be things that needs to wait
    await page.getByText('Form Layouts').click
})

test('navigate to datepicker page', async ({page}) => { // async tell that there are might be things that needs to wait
    await page.getByText('Datepicker').click
})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click
    })

    test('The first test', async ({page}) => { // async tell that there are might be things that needs to wait
        await page.getByText('Form Layouts').click
     })

    test('navigate to datepicker page1', async ({page}) => { // async tell that there are might be things that needs to wait
        await page.getByText('Datepicker').click
    })
})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click
    })

    test('The first test2', async ({page}) => { // async tell that there are might be things that needs to wait
        await page.getByText('Form Layouts').click
    })

test('navigate to datepicker page2', async ({page}) => { // async tell that there are might be things that needs to wait
    await page.getByText('Datepicker').click
    })
})