import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablesPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parametrized methods', async({page}) => {
const pm = new PageManager(page)

await pm.navigateTo().formLayoutsPage()
await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true)
await pm.navigateTo().datePickerPage()
await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
//await onDatePickerPage.selectDatePickerWithRangeFromToday(1,15)

})