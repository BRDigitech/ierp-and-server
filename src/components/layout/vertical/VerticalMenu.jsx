// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
       <SubMenu label='Client Reports'  icon={<i className='tabler-table' />}>
          <MenuItem href={`/${locale}/Reports/AllCustomers`}  icon={<i className='tabler-table' />}>
             All Customers
            </MenuItem>
            {/* <MenuItem href={`/${locale}/Reports/ClientDetailReport`}>
              Client Detail Report
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/ClientForm-Individual/SalariedPerson`}>
             Client Form Individual
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/ClientForm-Company/Proprietor/Partner`}>
             Client Form Company
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/Lists-Offers`}>
              Lists Of Offers
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/Lists-Contracts`}>
              Lists Of Contracts
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/Lists-Disbursement`}>
              List Of Disbursement
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/File`}>
              File
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/Portfolio`}>
              Total Portfolio
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/Statistics`}>
              charts
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>
              advance
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/charts`}>
              chartsAgain
            </MenuItem> */}
          </SubMenu>
           {/* <SubMenu label='Inventory Management System' icon={<i className='tabler-ledger' />}>
        <SubMenu label='Process'>
            <MenuItem href={`/${locale}/Process/PurchaseRequsition`}>
            Purchase Requsition
            </MenuItem>
            <MenuItem href={`/${locale}/Process/PurchaseOrder`}>Purchase Order</MenuItem>
            <MenuItem href={`/${locale}/Process/StockReceive`}>Stock Receive Voucher</MenuItem>
            <MenuItem href={`/${locale}/Process/Purchase`}>Purchase</MenuItem>
            <MenuItem href={`/${locale}/Process/PurchaseReturnRequest`}>Purchase Return Request</MenuItem>
            <MenuItem href={`/${locale}/Process/PurchaseReturn`}>Purchase return</MenuItem>
            <MenuItem href={`/${locale}/Process/Quotation`}>Quotation</MenuItem>
            <MenuItem href={`/${locale}/Process/DeliveryOrder`}>Delivery Order</MenuItem>
            <MenuItem href={`/${locale}/Process/Sales`}>Sales</MenuItem>
            <MenuItem href={`/${locale}/Process/SalesReturn`}>Sales return</MenuItem>
            <MenuItem href={`/${locale}/Process/PaymentEntry`}>Payment Entry</MenuItem>
      
          </SubMenu>
          <SubMenu label='Setups'>
            <MenuItem href={`/${locale}/Process/CompanySetup`}>
            Company Setup
            </MenuItem>
            <MenuItem href={`/${locale}/Process/CategorySetup`}>Category Setup</MenuItem>
            <MenuItem href={`/${locale}/Process/UnitSetup`}>Unit Of Measure Setup</MenuItem>
            <MenuItem href={`/${locale}/Process/ProductSetup`}>Product Setup</MenuItem>
            <MenuItem href={`/${locale}/Process/SupplierSetup`}>Supplier Setup</MenuItem>
            <MenuItem href={`/${locale}/Process/WarehouseSetup`}>Warehouse Setup</MenuItem>
           
          </SubMenu>
          <SubMenu label='Reports'>
            <MenuItem href={`/${locale}/Reports/PurchaseSummaryReport`}>
             Purchase Summary
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/PurchaseDetailReport`}>Purchase Detail</MenuItem>
            <MenuItem href={`/${locale}/Reports/QuotationDetailReport`}>Quotation Detail</MenuItem>
            <MenuItem href={`/${locale}/Reports/SaleSummarReport`}>Sale Summary</MenuItem>
            <MenuItem href={`/${locale}/Reports/SaleDetailReport`}>Sale Detail</MenuItem>
            <MenuItem href={`/${locale}/Reports/StockReceiptVoucher`}>Stock Receipt</MenuItem>
            <MenuItem href={`/${locale}/Reports/StockValuation`}>Stock Valuation</MenuItem>
            <MenuItem href={`/${locale}/Reports/PurchaseOverview`}>Purchase Overview</MenuItem>
    
       
          </SubMenu>
          <SubMenu label='Reports2'>
            <MenuItem href={`/${locale}/Reports/4thLevelChartOfAccounts`}>
              {dictionary['navigation'].chartOfAccounts}
            </MenuItem>

            <SubMenu label='Trial Balance' icon={<i className='tabler-balance' />}>
              <MenuItem href={`/${locale}/Reports/4thLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance4}
              </MenuItem>

              <MenuItem
                href={`/${locale}/Reports/4thLevelTrialBalanceTwo`}
                icon={<i className='tabler-circle' />}
              >
                {dictionary['navigation'].trialBalancePeriod}
              </MenuItem>

              <MenuItem href={`/${locale}/Reports/3rdLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance3}
              </MenuItem>

              <MenuItem href={`/${locale}/Reports/2ndLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance2}
              </MenuItem>
              <MenuItem href={`/${locale}/Reports/1stLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance1}
              </MenuItem>
            </SubMenu>
            <SubMenu label='Ledger'>
              <MenuItem
                href={`/${locale}/Reports/GeneralLedgerStatementA/CWise`}
                icon={<i className='tabler-circle' />}
              >
                {dictionary['navigation'].ledgerStatementAc}
              </MenuItem>
              <MenuItem href='/ledger-trial-balance-save'>4th Level Trial Balance (Save)</MenuItem>
              <MenuItem href='/client-income-ledger'>Client Income Ledger</MenuItem>
              <MenuItem href='/client-vat-ledger'>Client Vat Ledger</MenuItem>
              <MenuItem href='/receivable-current'>Receivable Current Portion Client Wise (Save and Posted)</MenuItem>
              <MenuItem href='/vat-on-leased'>Vat On Leased Purchase</MenuItem>
            </SubMenu>
            <SubMenu label='Vouchers List'>
              <MenuItem href={`/${locale}/Reports/ListOfCreatedVouchers`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].createdVouchers}
              </MenuItem>
              <MenuItem href={`/${locale}/Reports/ListOfCancelledVouchers`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].cancelledVouchers}
              </MenuItem>

              <MenuItem href={`/${locale}/Reports/ListOfPostedVouchers`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].postedVouchers}
              </MenuItem>

              <MenuItem href='/voucher-print'>Voucher Print</MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}/Reports/GI-Statements`}>{dictionary['navigation'].giStatements}</MenuItem>

            <MenuItem href={`/${locale}/Reports/BalanceSheets`}>{dictionary['navigation'].balanceSheets}</MenuItem>
            <MenuItem href={`/${locale}/Reports/ProfitandLoss`}>{dictionary['navigation'].profitAndLoss}</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu label='General Ledger' icon={<i className='tabler-ledger' />}>
          <SubMenu label='Reports'>
            <MenuItem href={`/${locale}/Reports/4thLevelChartOfAccounts`}>
              {dictionary['navigation'].chartOfAccounts}
            </MenuItem>

            <SubMenu label='Trial Balance' icon={<i className='tabler-balance' />}>
              <MenuItem href={`/${locale}/Reports/4thLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance4}
              </MenuItem>

              <MenuItem
                href={`/${locale}/Reports/4thLevelTrialBalanceTwo`}
                icon={<i className='tabler-circle' />}
              >
                {dictionary['navigation'].trialBalancePeriod}
              </MenuItem>

              <MenuItem href={`/${locale}/Reports/3rdLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance3}
              </MenuItem>

              <MenuItem href={`/${locale}/Reports/2ndLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance2}
              </MenuItem>
              <MenuItem href={`/${locale}/Reports/1stLevelTrialBalance`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].trialBalance1}
              </MenuItem>
            </SubMenu>
            <SubMenu label='Ledger'>
              <MenuItem
                href={`/${locale}/Reports/GeneralLedgerStatementA/CWise`}
                icon={<i className='tabler-circle' />}
              >
                {dictionary['navigation'].ledgerStatementAc}
              </MenuItem>
              <MenuItem href='/ledger-trial-balance-save'>4th Level Trial Balance (Save)</MenuItem>
              <MenuItem href='/client-income-ledger'>Client Income Ledger</MenuItem>
              <MenuItem href='/client-vat-ledger'>Client Vat Ledger</MenuItem>
              <MenuItem href='/receivable-current'>Receivable Current Portion Client Wise (Save and Posted)</MenuItem>
              <MenuItem href='/vat-on-leased'>Vat On Leased Purchase</MenuItem>
            </SubMenu>
            <SubMenu label='Vouchers List'>
              <MenuItem href={`/${locale}/Reports/ListOfCreatedVouchers`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].createdVouchers}
              </MenuItem>
              <MenuItem href={`/${locale}/Reports/ListOfCancelledVouchers`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].cancelledVouchers}
              </MenuItem>

              <MenuItem href={`/${locale}/Reports/ListOfPostedVouchers`} icon={<i className='tabler-circle' />}>
                {dictionary['navigation'].postedVouchers}
              </MenuItem>

              <MenuItem href='/voucher-print'>Voucher Print</MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}/Reports/GI-Statements`}>{dictionary['navigation'].giStatements}</MenuItem>
            <MenuItem href={`/${locale}/Reports/BalanceSheets`}>{dictionary['navigation'].balanceSheets}</MenuItem>
            <MenuItem href={`/${locale}/Reports/ProfitandLoss`}>{dictionary['navigation'].profitAndLoss}</MenuItem>
          </SubMenu>
        </SubMenu> 
         <SubMenu label='Payroll Management System' icon={<i className='tabler-ledger' />}>
          <SubMenu label='Evaluation'>
            <MenuItem href={`/${locale}/Reports/Iqama`}>
             Iqama Renewal report
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/NewIqama`}>
             New Iqama Report
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/VisaChange`}>
             Visa Change Report
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/ExitReentry`}>
             Exit Re-Entry
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/WorkPerformance`}>
             Work Performance
            </MenuItem>
             </SubMenu>
             <MenuItem href={`/${locale}/Reports/ListOfEmployees`}>Employees</MenuItem>
             <SubMenu label='Payroll' icon={<i className='tabler-ledger' />}>
             <MenuItem href={`/${locale}/Reports/SalaryReport`}>
             Salary Detail
            </MenuItem>
            <MenuItem href={`/${locale}/Reports/Payslip`}>
             Pay Slip
            </MenuItem>
             </SubMenu>
           
              </SubMenu> 
 
         <MenuSection label={dictionary['navigation'].appsPages}>
          <MenuItem
            href={`/${locale}/apps/email`}
            icon={<i className='tabler-mail' />}
            exactMatch={false}
            activeUrl='/apps/email'
          >
            {dictionary['navigation'].email}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/chat`} icon={<i className='tabler-message-circle-2' />}>
            {dictionary['navigation'].chat}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/calendar`} icon={<i className='tabler-calendar' />}>
            {dictionary['navigation'].calendar}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].authPages} icon={<i className='tabler-shield-lock' />}>
            <SubMenu label={dictionary['navigation'].login}>
              <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
                {dictionary['navigation'].loginV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
                {dictionary['navigation'].loginV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].register}>
              <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
                {dictionary['navigation'].registerV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
                {dictionary['navigation'].registerV2}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
                {dictionary['navigation'].registerMultiSteps}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].verifyEmail}>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
                {dictionary['navigation'].verifyEmailV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
                {dictionary['navigation'].verifyEmailV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].forgotPassword}>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].resetPassword}>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
                {dictionary['navigation'].resetPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
                {dictionary['navigation'].resetPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].twoSteps}>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
                {dictionary['navigation'].twoStepsV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
                {dictionary['navigation'].twoStepsV2}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].wizardExamples} icon={<i className='tabler-dots' />}>
            <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>{dictionary['navigation'].checkout}</MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
              {dictionary['navigation'].propertyListing}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
              {dictionary['navigation'].createDeal}
            </MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='tabler-square' />}>
            {dictionary['navigation'].dialogExamples}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].widgetExamples} icon={<i className='tabler-chart-bar' />}>
            <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].basic}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].advanced}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>
              {dictionary['navigation'].statistics}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/charts`}>{dictionary['navigation'].charts}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].actions}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].formsAndTables}>
          <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='tabler-layout' />}>
            {dictionary['navigation'].formLayouts}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-validation`} icon={<i className='tabler-checkup-list' />}>
            {dictionary['navigation'].formValidation}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='tabler-git-merge' />}>
            {dictionary['navigation'].formWizard}
          </MenuItem>
          <MenuItem href={`/${locale}/react-table`} icon={<i className='tabler-table' />}>
            {dictionary['navigation'].reactTable}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-checkbox' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].formELements}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-layout-board-split' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].muiTables}
          </MenuItem>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].chartsMisc}>
          <SubMenu label={dictionary['navigation'].charts} icon={<i className='tabler-chart-donut-2' />}>
            <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].apex}</MenuItem>
            <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].recharts}</MenuItem>
          </SubMenu>
          <MenuItem
            icon={<i className='tabler-cards' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].foundation}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-atom' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].components}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-list-search' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].menuExamples}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-lifebuoy' />}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
            href='https://pixinvent.ticksy.com'
          >
            {dictionary['navigation'].raiseSupport}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-book-2' />}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
          >
            {dictionary['navigation'].documentation}
          </MenuItem>
        </MenuSection> */}
      </Menu>
       {/* <Menu
          popoutMenuOffset={{ mainAxis: 23 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary)} />
        </Menu>  */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
