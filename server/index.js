const express = require('express');
require('dotenv').config();
const db = require('./models');
// const { sequelize } = db;
const cors = require('cors');
// const { Op } = require('sequelize');
// const { Sequelize } = require('sequelize');
const oracledb = require('oracledb');
const fs = require('fs');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const config = require('./config.js');
const port = process.env.PORT

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// HTTPS options using your generated key and certificate
// const httpsOptions = {
//     key: fs.readFileSync('C:/Users/Administrator/server.key'), // Replace with the actual path to your key
//     cert: fs.readFileSync('C:/Users/Administrator/server.crt') // Replace with the actual path to your certificate
// };

// const CuCustBorrower = require('./models/CuCustBorrower');
// const CuCustBank = require('./models/CuCustBank');
// const CuCustCompany = require('./models/CuCustCompany');
// const CuCustContactDetail = require('./models/CuCustContactDetail');
// const CuCustGuarantor = require('./models/CuCustGuarantor');
// const CuCustDirectors = require('./models/CuCustDirectors');
// const CuCustomar = require('./models/CuCustomar');
// Define associations
// db.VochMast.hasMany(db.VochDet, { foreignKey: 'SEQ_NO', sourceKey: 'SEQ_NO' });
// db.VochDet.belongsTo(db.VochMast, { foreignKey: 'SEQ_NO', targetKey: 'SEQ_NO' });

app.get('/all-cu-customer-details2', async (req, res) => {
    console.log('Received request for all customer details');
    const { username } = req.query;


    // const { username, accOpenDate } = req.query;
    try {
        const whereCondition = {
            NAME: { [db.Sequelize.Op.ne]: null },
            DEACTIVE: null,
            CUST_NO: username

            // ENT_BY: username,
        };

        // if (accOpenDate) {
        //     const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        //     whereCondition.ACC_OPEN_DATE = {
        //         [db.Sequelize.Op.gte]: new Date(formattedDate + 'T00:00:00.000Z'),
        //         [db.Sequelize.Op.lte]: new Date(formattedDate + 'T23:59:59.999Z')
        //     };
        // }
        const customerDetails = await db.CuCustomar.findAll({
            where: whereCondition
        }); // Use db.CuCustomar instead of CuCustomar

        const custNos = customerDetails.map(cust => cust.CUST_NO);

        const bankDetails = await db.CuCustBank.findAll({
            where: { CUST_NO: custNos }
        });

        const companies = await db.CuCustCompany.findAll({
            where: { CUST_NO: custNos }
        });

        const contacts = await db.CuCustContactDetail.findAll({
            where: { CUST_NO: custNos }
        });

        const references = await db.CuCustGuarantor.findAll({
            where: { CUST_NO: custNos }
        });

        const directors = await db.CuCustDirectors.findAll({
            where: { CUST_NO: custNos }
        });

        res.json({
            customerDetails,
            bankDetails,
            companies,
            contacts,
            references,
            directors
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});

app.get('/CuCustomers', async (req, res) => {
    const { username } = req.query;

    console.log('Received request with username:', username);

    try {
        const whereCondition = {
            NAME: { [db.Sequelize.Op.ne]: null },
            DEACTIVE: null,
            CUST_NO: username

            // NAME: username,
        };

        // if (accOpenDate) {
        //     const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        //     whereCondition.ACC_OPEN_DATE = {
        //         [db.Sequelize.Op.gte]: new Date(formattedDate + 'T00:00:00.000Z'),
        //         [db.Sequelize.Op.lte]: new Date(formattedDate + 'T23:59:59.999Z')
        //     };
        // }

        console.log('Where condition:', whereCondition);

        const customers = await db.CuCustomer.findAll({
            where: whereCondition,
            order: [['NAME', 'ASC']]
        });

        console.log('Retrieved customers:', customers);

        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});

app.get('/cu-customer-details', async (req, res) => {
    const { username } = req.query;

    console.log('Received request with username:', username);

    try {
        // Prepare query conditions
        const whereCondition = {
            NAME: { [db.Sequelize.Op.ne]: null },
            DEACTIVE: null,
            CUST_NO: username

            // ENT_BY: username,
        };

        // if (accOpenDate) {
        //     const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        //     whereCondition.ACC_OPEN_DATE = {
        //         [db.Sequelize.Op.gte]: new Date(formattedDate + 'T00:00:00.000Z'),
        //         [db.Sequelize.Op.lte]: new Date(formattedDate + 'T23:59:59.999Z')
        //     };
        // }

        console.log('Where condition:', whereCondition);

        // Fetch customer details based on the condition
        const customerDetails = await db.CuCustomer1.findAll({
            where: whereCondition
        });

        console.log('Retrieved customer details:', customerDetails);

        const custNos = customerDetails.map(cust => cust.CUST_NO);

        // Fetch related data
        const bankDetails = await db.CuCustBusiness.findAll({
            where: { CUST_NO: custNos }
        });

        const coBorrowers = await db.CuCustBorrower.findAll({
            where: { CUST_NO: custNos }
        });

        const employmentInfo = await db.CuEmployeeInfo.findAll({
            where: { CUST_NO: custNos }
        });

        const references = await db.CuCustGuarantor.findAll({
            where: { CUST_NO: custNos }
        });

        res.json({
            customerDetails,
            bankDetails,
            coBorrowers,
            employmentInfo,
            references,
            businessInfo: bankDetails // Assuming business info is same as bank details
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});

app.get('/all-customers', async (req, res) => {
    try {
        const quotationDetailsReport = await db.sequelize.query(`
          SELECT ALL
           CU_CUSTOMER.CUST_NO, CU_CUSTOMER.NAME, CU_CUSTOMER.F_H_NAME, CU_CUSTOMER.TEL_NO, 
            CU_CUSTOMER.FAX_NO, CU_CUSTOMER.EMAIL, CU_CUSTOMER.MOBILE_NO, 
            CU_CUSTOMER.NIC_NO, CU_CUSTOMER.NIC_N, CU_CUSTOMER.INTRODUCED_BY, CU_CUSTOMER.ACC_OPEN_DATE, 
            CU_CUSTOMER.CUST_OLD, CU_CUSTOMER.CLIENT_TYPE_CODE
            FROM CU_CUSTOMER 
            WHERE CU_CUSTOMER.NAME IS NOT NULL 
            and deactive is null 
           
            ORDER BY CU_CUSTOMER.NAME   
        `, {
            // replacements: { CUSTNO },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});

//working
app.get('/disbursements', async (req, res) => {
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT 2 FLAG, ' For the year' LABEL, COUNT(LEASE_NO) SRNO,
       SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT,
       (SELECT COUNT(*)
        FROM   CU_CUSTOMER
        WHERE  CUST_NO IN
               (SELECT CUST_NO
                FROM   LE_CONTRACT
                WHERE  TERM_TYPE IS NULL)
       ) CUSTOMERS
FROM   LE_CONTRACT B
WHERE  NVL(DISBURSEMENT_TYPE, 'x') <> 'R'
GROUP  BY 2, ' For the year'

UNION ALL

SELECT 1, ' For the Month' LABEL, COUNT(LEASE_NO) SRNO,
       SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT,
       (SELECT COUNT(*)
        FROM   CU_CUSTOMER
        WHERE  CUST_NO IN
               (SELECT CUST_NO
                FROM   LE_CONTRACT
                WHERE  TERM_TYPE IS NULL)
       ) CUSTOMERS
FROM   LE_CONTRACT B
WHERE  NVL(DISBURSEMENT_TYPE, 'x') <> 'R'
GROUP  BY 1, ' For the Month'
ORDER  BY 1; 
        `, {
            // replacements: { CUSTNO },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
// CALC_GL_NIL not found, 
app.get('/overdue', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4,
       SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
       SUM(NVL(LEASE_AMT4, 0)) - SUM(NVL(SECURITY_DEPOSIT3, 0)) LEASEMAOUNT,
       SUM(WRITTEN_OFF_AMOUNT) WRITTEN_OFF_AMOUNT,
       SUM(SPECIFIC_PROV) SPECIFIC_PROVISIONG,
       SUM(GENERAL_PROV) GENERAL_PROV, TERM1FLAG, TERM2ORDER, TERM3,
       COUNT(LEASE_NO) NO_OF_LEASES4,
       ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
       SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
       SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
FROM   (SELECT B.LEASE_NO, NVL(GET_LEASE_AMOUNT(B.LEASE_NO), 0) LEASE_AMT4,
                B.IRR,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 0 AND 89 THEN
                   0
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 5) / 100
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 25) / 100
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 50) / 100
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) >= 365 THEN
                   (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 100) / 100
                END SPECIFIC_PROV,
                CASE
                  WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                   'Performing'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
                   '1-30'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
                   '31-60'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
                   '61-89'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   '90 -179'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   '180-269'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   '270-364'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
                   'Above-364'
                  ELSE
                   'Performing'
                END TERM1FLAG,
                CASE
                  WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                   '0'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
                   '1'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
                   '2'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
                   '3'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   '4'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   '5'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   '6'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
                   '7'
                  ELSE
                   '0'
                END TERM2ORDER,
                CASE
                  WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                   'A'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
                   'D E F A U L T'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
                   'D E F A U L T'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
                   'D E F A U L T'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   'NPA'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   'NPA'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   'NPA'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
                   'Z'
                  ELSE
                   'A'
                END TERM3, CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
                ABS(NVL(CALC_GL_BALANCE_LEASE('1013105000001',
                                               TO_DATE(:P_DT2),
                                               B.LEASE_NO),
                         0)) GENERAL_PROV,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                      0
                     ELSE
                      DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                             1,
                             CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                             0)
                   END
                END OVERDUE4,
                ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                                 1,
                                 CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                                 0) > 0 THEN
                      1
                     ELSE
                      0
                   END
                END OLD_LEASES, B.PERIOD_MM / 12 PMM,
                (SELECT NVL(SUM(WRITTEN_OFF_AMOUNT), 0)
                  FROM   LE_WRITTEN_OFF AA
                  WHERE  AA.LEASE_NO = B.LEASE_NO
                         AND WRITTEN_OFF_DATE <= :P_DT2) WRITTEN_OFF_AMOUNT
         FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
         WHERE  A.CUST_NO = B.CUST_NO
                AND B.OFFER_NO = D.OFFER_NO
                AND A.SECTOR_CD = C.SECTOR_CODE
                AND A.SECTOR_CD IS NOT NULL
                AND B.DISB_DT IS NOT NULL
                AND DISB_DT <= :P_DT2
                AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
                AND
                (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
                AND B.LEASE_NO NOT IN
                (SELECT LEASE_NO
                     FROM   LE_WRITTEN_OFF
                     WHERE  WRITTEN_OFF_DATE <= :P_DT2))
WHERE  TERM2ORDER <> 0
GROUP  BY TERM1FLAG, TERM2ORDER, TERM3
ORDER  BY TERM2ORDER;

        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//  "GET_LEASE_AMOUNT": invalid identifier
app.get('/sector-analysis', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4,
       SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
       SUM(NVL(LEASE_AMT4, 0)) - SUM(NVL(SECURITY_DEPOSIT3, 0)) LEASEAMOUNT,
       SECTOR_CD, SECTOR_NAME, COUNT(LEASE_NO) NO_OF_LEASES4,
       ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
       SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
       SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
FROM   (SELECT B.LEASE_NO, A.SECTOR_CD, SECTOR_NAME,
                NVL(GET_LEASE_AMOUNT(B.LEASE_NO), 0) LEASE_AMT4, B.IRR,
                CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                      0
                     ELSE
                      DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                             1,
                             CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                             0)
                   END
                END OVERDUE4,
                ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                                 1,
                                 CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                                 0) > 0 THEN
                      1
                     ELSE
                      0
                   END
                END OLD_LEASES, B.PERIOD_MM / 12 PMM
         FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
         WHERE  A.CUST_NO = B.CUST_NO
                AND B.OFFER_NO = D.OFFER_NO
                AND A.SECTOR_CD = C.SECTOR_CODE
                AND A.SECTOR_CD IS NOT NULL
                AND B.DISB_DT IS NOT NULL
                AND DISB_DT <= :P_DT2
                AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
                AND
                (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
                AND B.LEASE_NO NOT IN
                (SELECT LEASE_NO
                     FROM   LE_WRITTEN_OFF
                     WHERE  WRITTEN_OFF_DATE <= :P_DT2))
GROUP  BY SECTOR_CD, SECTOR_NAME
ORDER  BY NIL4 DESC;
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/prtfolio-analysis', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4, TERM1, TERM2,
       TERM3, COUNT(LEASE_NO) NO_OF_LEASES4,
       ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
       SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
       SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
       SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
FROM   (SELECT B.LEASE_NO, B.LEASE_AMT LEASE_AMT4, B.IRR,
                CASE
                  WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                   'Performing'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
                   '1-30'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
                   '31-60'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
                   '61-89'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   '90 -179'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   '180-269'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   '270-364'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
                   'Above-364'
                  ELSE
                   'Performing'
                END TERM1,
                CASE
                  WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                   '0'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
                   '1'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
                   '2'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
                   '3'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   '4'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   '5'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   '6'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
                   '7'
                  ELSE
                   '0'
                END TERM2,
                CASE
                  WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                   'A'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
                   'D E F A U L T'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
                   'D E F A U L T'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
                   'D E F A U L T'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
                   'NPA'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
                   'NPA'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
                   'NPA'
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
                   'Z'
                  ELSE
                   'A'
                END TERM3, CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                      0
                     ELSE
                      DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                             1,
                             CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                             0)
                   END
                END OVERDUE4,
                ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
                CASE
                  WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                              1,
                              CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                              0) > 0 THEN
                   1
                  ELSE
                   0
                END OLD_LEASES, B.PERIOD_MM / 12 PMM
         FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
         WHERE  A.CUST_NO = B.CUST_NO
                AND B.OFFER_NO = D.OFFER_NO
                AND A.SECTOR_CD = C.SECTOR_CODE
                AND A.SECTOR_CD IS NOT NULL
                AND B.DISB_DT IS NOT NULL
                AND DISB_DT <= :P_DT2
               -- AND END_dATE > :P_Dt2
                AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
                AND
                (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
                AND B.LEASE_NO NOT IN
                (SELECT LEASE_NO
                     FROM   LE_WRITTEN_OFF
                     WHERE  WRITTEN_OFF_DATE <= :P_DT2))
GROUP  BY TERM1, TERM2, TERM3
ORDER  BY 5, 6, 1, 3;

        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/netdisbursement', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT ' 1- For the year' LABEL, COUNT(LEASE_NO) SNO,
       SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT
FROM   LE_CONTRACT B
WHERE  DISB_DT BETWEEN TO_DATE('01-JAN-2020', 'DD-MON-YYYY') AND 
                     ADD_MONTHS(TO_DATE('01-JAN-2020', 'DD-MON-YYYY'), 12) - 1
       AND NVL(DISBURSEMENT_TYPE, 'x') = 'R'

UNION ALL

SELECT ' 2- For the Month' LABEL, COUNT(LEASE_NO) SNO,
       SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT
FROM   LE_CONTRACT B
WHERE  DISB_DT BETWEEN TRUNC(TO_DATE('01-JAN-2020', 'DD-MON-YYYY'), 'MM') AND 
                     LAST_DAY(TO_DATE('01-JAN-2020', 'DD-MON-YYYY'))
       AND NVL(DISBURSEMENT_TYPE, 'x') = 'R';
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
// "GET_LEASE_AMOUNT": invalid identifier
app.get('/tenure-analysis', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4,
       SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
       SUM(NVL(LEASE_AMT4, 0)) - SUM(NVL(SECURITY_DEPOSIT3, 0)) LEASEAMOUNT,
       OVERDUE_SLAB, ORDERING, COUNT(LEASE_NO) NO_OF_LEASES4,
       ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
       SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
       SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
FROM   (SELECT B.LEASE_NO,
                CASE
                  WHEN D.PERIOD_MM BETWEEN 1 AND 12 THEN
                   '1 - 12 Months'
                  WHEN D.PERIOD_MM BETWEEN 13 AND 24 THEN
                   '13 - 24 Months'
                  WHEN D.PERIOD_MM BETWEEN 25 AND 36 THEN
                   '25 - 36 Months'
                  WHEN D.PERIOD_MM BETWEEN 37 AND 48 THEN
                   '37 - 48 Months'
                  WHEN D.PERIOD_MM BETWEEN 49 AND 60 THEN
                   '49 - 60 Months'
                  WHEN D.PERIOD_MM BETWEEN 61 AND 72 THEN
                   '61 - 72 Months'
                  WHEN D.PERIOD_MM > 72 THEN
                   'Greater then 72 Months'
                END OVERDUE_SLAB,
                CASE
                  WHEN D.PERIOD_MM BETWEEN 1 AND 12 THEN
                   1
                  WHEN D.PERIOD_MM BETWEEN 13 AND 24 THEN
                   2
                  WHEN D.PERIOD_MM BETWEEN 25 AND 36 THEN
                   3
                  WHEN D.PERIOD_MM BETWEEN 37 AND 48 THEN
                   4
                  WHEN D.PERIOD_MM BETWEEN 49 AND 60 THEN
                   5
                  WHEN D.PERIOD_MM BETWEEN 61 AND 72 THEN
                   6
                  WHEN D.PERIOD_MM > 72 THEN
                   7
                END ORDERING, NVL(GET_LEASE_AMOUNT(B.LEASE_NO), 0) LEASE_AMT4,
                B.IRR, CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
                      0
                     ELSE
                      DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                             1,
                             CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                             0)
                   END
                END OVERDUE4,
                ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
                CASE
                  WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
                   0
                  ELSE
                   CASE
                     WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
                                 1,
                                 CALC_OVERDUES(B.LEASE_NO, :P_DT2),
                                 0) > 0 THEN
                      1
                     ELSE
                      0
                   END
                END OLD_LEASES, B.PERIOD_MM / 12 PMM
         FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
         WHERE  A.CUST_NO = B.CUST_NO
                AND B.OFFER_NO = D.OFFER_NO
                AND A.SECTOR_CD = C.SECTOR_CODE
                AND A.SECTOR_CD IS NOT NULL
                AND B.DISB_DT IS NOT NULL
                AND DISB_DT <= :P_DT2
                AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
                AND
                (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
                AND B.LEASE_NO NOT IN
                (SELECT LEASE_NO
                     FROM   LE_WRITTEN_OFF
                     WHERE  WRITTEN_OFF_DATE <= :P_DT2))
GROUP  BY OVERDUE_SLAB, ORDERING
ORDER  BY ORDERING;
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/ordering', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT DISTINCT 1 ORDERING, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
WHERE  A.OFFER_NO = B.OFFER_NO
       AND B.LEASE_NO = C.LEASE_NO
       AND DUE_DATE BETWEEN TO_DATE(:P_DT2) + 1 AND ADD_MONTHS(:P_DT2, 12)
 HAVING(MIN(DUE_DATE) IS NOT NULL
              OR MAX(DUE_DATE) IS NOT NULL)
UNION ALL
SELECT DISTINCT 2, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
WHERE  A.OFFER_NO = B.OFFER_NO
       AND B.LEASE_NO = C.LEASE_NO
       AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 13) AND
       ADD_MONTHS(:P_DT2, 24)
 HAVING(MIN(DUE_DATE) IS NOT NULL
              OR MAX(DUE_DATE) IS NOT NULL)
UNION ALL
SELECT DISTINCT 3, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
WHERE  A.OFFER_NO = B.OFFER_NO
       AND B.LEASE_NO = C.LEASE_NO
       AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 25) AND
       ADD_MONTHS(:P_DT2, 36)
 HAVING(MIN(DUE_DATE) IS NOT NULL
              OR MAX(DUE_DATE) IS NOT NULL)
UNION ALL
SELECT DISTINCT 4, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
WHERE  A.OFFER_NO = B.OFFER_NO
       AND B.LEASE_NO = C.LEASE_NO
       AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 37) AND
       ADD_MONTHS(:P_DT2, 48)
 HAVING(MIN(DUE_DATE) IS NOT NULL
              OR MAX(DUE_DATE) IS NOT NULL)
UNION ALL
SELECT DISTINCT 5, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
WHERE  A.OFFER_NO = B.OFFER_NO
       AND B.LEASE_NO = C.LEASE_NO
       AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 49) AND
       ADD_MONTHS(:P_DT2, 60)
 HAVING(MIN(DUE_DATE) IS NOT NULL
              OR MAX(DUE_DATE) IS NOT NULL)
ORDER  BY 1;
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/osbalance', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT ' 1- For the year' LABEL, COUNT(LEASE_NO) SERNO,
       SUM(CALC_NILS(B.LEASE_NO, SYSDATE)) OSBALANCE
FROM   LE_CONTRACT B
WHERE  B.TERM_DATE BETWEEN TO_DATE('01-JAN-2020', 'DD-MON-YYYY') AND 
                         ADD_MONTHS(TO_DATE('01-JAN-2020', 'DD-MON-YYYY'), 12) - 1

UNION ALL

SELECT ' 2- For the Month' LABEL, COUNT(LEASE_NO) SERNO,
       SUM(CALC_NILS(B.LEASE_NO, SYSDATE)) OSBALANCE
FROM   LE_CONTRACT B
WHERE  B.TERM_DATE BETWEEN TRUNC(TO_DATE('01-JAN-2020', 'DD-MON-YYYY'), 'MM') AND 
                         LAST_DAY(TO_DATE('01-JAN-2020', 'DD-MON-YYYY'));
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//what is type :TYP
app.get('/pnl', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT DISTINCT SEQNO, DESCRIP, SERIAL_NO, SUB_TOTAL, NOTE
FROM   GL_STATEMENT_FORMAT_DASHBOARD
WHERE  STATE_TYPE = :TYP
       AND SERIAL_NO IN (11.1, 11.2)
ORDER  BY 1 ASC;
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//what is type :TYP
app.get('/pnfc', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT DISTINCT SEQNO, DESCRIP, SERIAL_NO, SUB_TOTAL, NOTE
FROM   GL_STATEMENT_FORMAT_DASHBOARD
WHERE  STATE_TYPE = :TYP
       AND SERIAL_NO NOT IN (11.1, 11.2)
ORDER  BY 1 ASC;
        `, {
            replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/list-of-offers', async (req, res) => {
    let P_DT2 = "31-JAN-2020";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT
	A.CUST_NO,
	A.NAME,
	B.OFFER_NO,
	B.OFFER_DATE,
	B.PERIOD_MM,
	B.LEASE_AMT,
	(B.SLVG_VAL_PC*B.LEASE_AMT)/100 SLVG_VAL_PC,
	(B.SEC_DPST_PC*B.LEASE_AMT)/100 SEC_DPST_PC,
	(B.FE_FEE_PC*B.LEASE_AMT)/100 FE_FEE_PC,
	B.DOC_FEE,
	B.IRR,
	B.FIRST_RENT,
	B.ACCT_MGR
FROM
	CU_CUSTOMER A,
	LE_OFFER B
WHERE
	A.CUST_NO = B.CUST_NO
AND B.CANCEL_BY IS  NULL
AND VERIFIED_BY IS NOT NULL
        `, {
            // replacements: { P_DT2 },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/list-of-contracts', async (req, res) => {
    let pdt1 = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
   
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT
	A.CUST_NO,
	A.NAME,
	B.Lease_NO,
	B.Lease_DATE,
	B.PERIOD_MM,
	B.LEASE_AMT,
	(B.SLVG_VAL_PC*B.LEASE_AMT)/100 SLVG_VAL_PC,
	(B.SEC_DPST_PC*B.LEASE_AMT)/100 SEC_DPST_PC,
	(B.FE_FEE_PC*B.LEASE_AMT)/100 FE_FEE_PC,
	B.DOC_FEE,
	B.IRR,
	B.FIRST_RENT,
	B.ACCT_MGR
FROM	CU_CUSTOMER A, 	LE_CONTRACT B
WHERE	A.CUST_NO = B.CUST_NO
and lease_date between :pdt1 and :p_dt2 

        `, {
            replacements: { pdt1 ,p_dt2 },
            type: db.sequelize.QueryTypes.SELECT
        });
// and (zone_cd = :zone or :zone is null) 
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/list-of-disbursment', async (req, res) => {
    let pdt1 = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT
	A.cust_no,
	' '||initcap(A.NAME) NAME,
	b.lease_no, b.old_leaseno, 
	b.lease_date,
	b.period_mm,
	b.lease_amt,
	(b.slvg_val_pc*b.lease_amt)/100 slvg_val_pc,
	(b.sec_dpst_pc*b.lease_amt)/100 sec_dpst_pc,
	(b.fe_fee_pc*b.lease_amt)/100 fe_fee_pc,
	b.doc_fee,
	b.irr,
	b.first_rent,
	initcap(b.acct_mgr) acct_mgr,
                disb_dt,
                ' '||initcap(c.asset_description) asset_description,
                initcap(decode(rent_type,'AR','AREAR','AD','ADVANCE')) lease_type,
                b.lease_status,
                b.term_date termdate,
                decode(b.term_type,'F','Terminated Lease','M','Matured Lease') termtype
FROM
	cu_customer A,
	le_contract b,
                le_asset c
WHERE A.cust_no = b.cust_no
AND b.offer_no = c.offer_no
AND disb_dt BETWEEN :pdt1 AND :p_dt2
--and (b.term_date is null or b.term_Date > :p_dt2)  
--and end_date > :p_dt2
AND c.asset_no = 001
ORDER BY lease_no
        `, {
            replacements: { pdt1 ,p_dt2 },
            type: db.sequelize.QueryTypes.SELECT
        });
// and (zone_cd = :zone or :zone is null) 
// AND (A.zone_cd = :ZONE OR :ZONE IS NULL)
// AND b.lease_amt BETWEEN :amt_frm AND :amt_to
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/file-for-collateral', async (req, res) => {
    let pdt1 = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT DISTINCT A.Lease_No Credit_Identification_No,
  6 Type_Of_Collateral,
  DECODE(H.Asset_Type,04,I.Chasis_No,01,I.Chasis_No,I.Serial_No) Serial_No,
  Asset_Amount Asset_Cost,
  I.Asset_Description,
  0 Unique_Code,
  Unique_Asset_No Rj_Unique_Code,
  E.Offer_No,
  E.Initial_Sanction_Date,
  Ccy
FROM Le_Contract A,
  Cu_Customer D,
  Le_Offer E,
  Le_Asset_Types H,
  Le_Asset I
WHERE A.Cust_No  = D.Cust_No
AND A.Offer_No   = E.Offer_No
AND A.Asset_Type = H.Asset_Type
AND E.Offer_No   = I.Offer_No
ORDER BY 1
        `, {
            // replacements: { pdt1 ,p_dt2 },
            type: db.sequelize.QueryTypes.SELECT
        });
        // AND A.Disb_Dt BETWEEN TRUNC(To_Date(:As_On_Dt),'MM') AND :As_On_Dt
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//working
app.get('/file-for-review', async (req, res) => {
    let pdt1 = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT
  (SELECT lease_no FROM le_contract WHERE offer_no = x.offer_no
  ) "Lease identification number" ,
  2 "Status / Classification",

  0 "Lease reference number",
  NULL "Due amt of lease at exe order",
  NULL "Paid amount" ,
  NULL "Paid amount in Cash",
  NULL "Paid amt from exe of coll"
FROM le_reschedule_contract x

        `, {
            // replacements: { pdt1 ,p_dt2 },
            type: db.sequelize.QueryTypes.SELECT
        });
        //   :as_on_dt "Effective date",
        // WHERE to_char(reschedule_date,'MON-RRRR') = to_char(to_date(:as_on_dt),'MON-RRRR')
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//no error , but no data for given date
app.get('/file-for-ucs', async (req, res) => {
    let As_On_Dt = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT B.Lease_No,
  Calc_Overdues(Lease_No,:As_On_Dt) Overdues,
  CASE
    WHEN NVL(Calc_Nils(Lease_No,:As_On_Dt),0) <= 0
    THEN 0
    ELSE NVL(Calc_Nils(Lease_No,:As_On_Dt),0)
  END Nils,
  CASE
    WHEN NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) BETWEEN 0 AND 30
    THEN '0'
    WHEN NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) BETWEEN 31 AND 90
    THEN '1'
    WHEN NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) BETWEEN 91 AND 180
    THEN '2'
    WHEN NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) BETWEEN 181 AND 360
    THEN '3'
    WHEN NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) > 361
    THEN '4'
  END Overdue_Percentage,
  B.Lease_Amt,
  B.Sec_Dpst_Pc,
  CASE
    WHEN Vat_Type = '01'
    THEN (NVL(B.Lease_Amt,0)- NVL((NVL(B.Sec_Dpst_Pc,0)/100)*B.Lease_Amt,0))/1.2
    ELSE (NVL(B.Lease_Amt,0)- NVL((NVL(B.Sec_Dpst_Pc,0)/100)*B.Lease_Amt,0))
  END Disb_Amt,
  CASE
    WHEN Calc_Overdues(Lease_No,:As_On_Dt) <= 0
    THEN 0
    ELSE Calc_Overdues(Lease_No,:As_On_Dt)
  END Delayed_Amount,
  :As_On_Dt Effective_Date,
  0 Outstanding_Amount,
  NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) Overdue_Days,
  (SELECT DECODE(Covid,1,' Postponement - COVID - 19 ',' No - Postponement ')
  FROM Cu_Customer X
  WHERE Cust_No = A.Cust_No
  ) Covid
FROM Le_Offer A ,
  Le_Contract B
WHERE A.Offer_No = B.Offer_No
AND Disb_Dt     <= :As_On_Dt
AND (Term_Date  IS NULL
OR Term_Date     > :As_On_Dt)
UNION ALL
SELECT Lease_No,
  Calc_Overdues(Lease_No,:As_On_Dt) Overdues,
  0 Nils,
  '5' Overdue_Percentage,
  B.Lease_Amt,
  B.Sec_Dpst_Pc,
  CASE
    WHEN Vat_Type = '01'
    THEN (NVL(B.Lease_Amt,0)- NVL((NVL(B.Sec_Dpst_Pc,0)/100)*B.Lease_Amt,0))/1.2
    ELSE (NVL(B.Lease_Amt,0)- NVL((NVL(B.Sec_Dpst_Pc,0)/100)*B.Lease_Amt,0))
  END Disb_Amt,
  0 Delayed_Amount,
  :As_On_Dt Effective_Date,
  0 Outstanding_Amount,
  NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) Overdue_Days,
  (SELECT DECODE(Covid,1,' Postponement - COVID - 19 ',' No - Postponement ')
  FROM Cu_Customer X
  WHERE Cust_No = A.Cust_No
  ) Covid
FROM Le_Offer A ,
  Le_Contract B
WHERE A.Offer_No = B.Offer_No
AND Disb_Dt     <= :As_On_Dt
AND Term_Date   <= :As_On_Dt
UNION
SELECT Lease_No,
  Calc_Overdues(Lease_No,:As_On_Dt) Overdues,
  0 Nils,
  '6' Overdue_Percentage,
  B.Lease_Amt,
  B.Sec_Dpst_Pc,
  CASE
    WHEN Vat_Type = '01'
    THEN (NVL(B.Lease_Amt,0)- NVL((NVL(B.Sec_Dpst_Pc,0)/100)*B.Lease_Amt,0))/1.2
    ELSE (NVL(B.Lease_Amt,0)- NVL((NVL(B.Sec_Dpst_Pc,0)/100)*B.Lease_Amt,0))
  END Disb_Amt,
  0 Delayed_Amount,
  :As_On_Dt Effective_Date,
  0 Outstanding_Amount,
  NVL(Calc_Overdue_Days_Boa(Lease_No,:As_On_Dt),0) Overdue_Days,
  (SELECT DECODE(Covid,1,' Postponement - COVID - 19 ',' No - Postponement ')
  FROM Cu_Customer X
  WHERE Cust_No = A.Cust_No
  ) Covid
FROM Le_Offer A ,
  Le_Contract B
WHERE A.Offer_No = B.Offer_No
AND Disb_Dt     <= :As_On_Dt
AND Lease_No    IN
  (SELECT Lease_No FROM Le_Written_Off
  )
ORDER BY 1
        `, {
            replacements: { As_On_Dt },
            type: db.sequelize.QueryTypes.SELECT
        });
        //   :as_on_dt "Effective date",
        // WHERE to_char(reschedule_date,'MON-RRRR') = to_char(to_date(:as_on_dt),'MON-RRRR')
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//no error , but no data for given date
app.get('/file-for-disburse-credit', async (req, res) => {
    let as_on_dt = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT DISTINCT A.lease_no credit_identification_no,
  508 financial_institution,
  decode(d.client_type_code,'IN',0,'SP',0,1) type_of_customer,
  mother_name,
  decode(nationality,002,0,1) nationality,
  d.NAME first_name,
  d.f_h_name fathers_name,
  d.surname surname,
  ' ' surname_before_married,
  decode(d.client_type_code,'IN',d.date_of_birth,'SP',d.date_of_birth,issue_date) date_of_registration,
  decode(d.gender,'M',0,'F',1) gender,
  d.resident,
  decode(d.client_type_code,'CO',NULL,(decode(d.nic_add,'PP','0','ID','1','PC','2','NC','3','4'))) type_of_identification,
  decode(d.client_type_code,'IN',d.nic_n,'SP',d.nic_n,n_tax_no) type_of_identification_no,
  d.issue_date,
  d.expiry_date ,
  decode(d.nic_n_op,'PP','0','ID','1','PC','2','NC','3','4') type_of_identification2,
  d.nic_add_op type_of_identification2_no,
  d.issue_date_op issue_date2,
  d.expiry_date_op expiry_date2,
  decode(d.legal_status,1,1,3,0,2,0,6,1,7,2) legal_status,
  --f.boa_code sector_Cd,
  boa_sector (d.cust_no) sector_cd,
  f.sector_name,
  d.mail_address
  ||' '
  ||d.add_s
  ||' '
  ||d.add_m
  ||' '
  ||d.add_c current_address,
  decode(d.marital_status,'S',2,'M',0,'D',1,'W',3) family_status,
  decode(employment,'EM',0,'UE',1,'PE',2,'ST',3) employment,
  A.first_rent,
  net_monthly_income,
  decode(d.client_type_code,'IN',4,'SP',4,1) boa_code,
  tel_no telephone_no1,
  mobile_no telephone_no1,
  d.email,
  CASE
    WHEN vat_type = '01'
    THEN (nvl(A.lease_amt,0)- nvl((nvl(A.sec_dpst_pc,0)/100)*A.lease_amt,0))/1.2
    ELSE (nvl(A.lease_amt,0)- nvl((nvl(A.sec_dpst_pc,0)/100)*A.lease_amt,0))
  END approved_amount_credit,
  decode(A.pay_freq,'D',0,'M',1,'Y',2) unit_of_credit_duration,
  A.period_mm credit_maturity,
  decode(e.ccy,'ALL',0,'EUR',1,'USD',2,'GBP',3,6) ccy,
  A.disb_dt approval_date,
  A.disb_dt disburse_date,
  A.end_date maturity_date,
  0 credit_rating,
  6 type_of_credit,
  A.irr,
  ' ' credit_purpose,
  d.res_country_code residentcountry,
  equity_capital equity_capital,
  nvl(h.res_country_code,i.res_country_code) residentcountryshareholder,
  last_address_change,
  institutional_sector,
  institutional_sub_sector,
  monthly_expenses,
  no_of_inst_delay,
  decode(e.pay_freq,'M',0,'Q',1,'H',2,'Y',3,6) installmentpaymentfrequency,
  NULL syndicateloan,
  code_of_int_rate,
  type_of_int_rate,
  revision_frequency,
  kibor_pc spreadofinterestrate,
  ceiling_rate capinterestrate,
  floor_rate floorinterestrate,
  company_size,
  date_of_company,
  no_of_employees,
  recourse,
  probability_of_default,
  asset_balance,
  annual_turnover
FROM le_contract A,
  cu_customer d,
  le_offer e,
  cu_internal_sector f,
  le_lease_types g,
  cu_rp_individual h ,
  cu_rp_jurdical i ,
  le_credit_approval j
WHERE A.cust_no  = d.cust_no
AND A.offer_no   = e.offer_no
AND d.cust_no    = h.cust_no (+)
AND d.cust_no    = i.cust_no(+)
AND e.offer_no   = j.offer_no (+)
AND d.sector_cd  = f.sector_code
AND A.disb_dt   IS NOT NULL
AND A.lease_type = g.type_id
AND A.disb_dt BETWEEN  trunc(to_date(:as_on_dt),'MM') and :as_on_dt
ORDER BY lease_no
        `, {
            replacements: { as_on_dt },
            type: db.sequelize.QueryTypes.SELECT
        });
        //   :as_on_dt "Effective date",
        // WHERE to_char(reschedule_date,'MON-RRRR') = to_char(to_date(:as_on_dt),'MON-RRRR')
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//no error , but no data for given date
app.get('/file-for-related-person', async (req, res) => {
    let as_on_dt = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT DISTINCT A.lease_no credit_identification_no,
  decode(gg.rp_lease_role,'GU',0,'HW',1,'DR',2,'OS',3,'CO',4,'RC',5) rp_role ,
  rp_maiden_name,
  substr(rp_address,1,50) current_address,
  f.rp_name first_name,
  f.rp_fathers_name fathers_name,
  f.rp_surname surname,
  ' ' surname_before_married,
  f.rp_birthday date_of_registration,
  CASE
    WHEN f.gender = 'M'
    THEN '0'
    WHEN f.gender = 'F'
    THEN '1'
    ELSE '2'
  END gender,
  d.resident,
  decode(f.rp_document_type,'PP','0','ID','1','PC','2','NC','3','4') type_of_identification,
  rp_idno type_of_identification_no,
  rp_issue_date issue_date,
  rp_expiry_date expiry_date ,
  decode(rp_citizenship,'ALBANIAN',0,1) nationality,
  decode(nationality,'02','Albanian','Other') state,
  decode(f.rp_document_type,'PP','0','ID','1','PC','2','NC','3','4') type_of_identification2,
  d.nic_add_op type_of_identification2_no,
  d.issue_date_op issue_date2,
  d.expiry_date_op expiry_date2,
  rp_email,
  A.first_rent net_monthly_income,
  f.rp_client_no unique_code,
  rp_phone_number,
  rp_phone_number1,
  rp_phone_number2
FROM le_contract A,
  cu_customer d,
  le_offer e,
  cu_rp_individual f ,
  cu_rp_lease_nos gg
WHERE A.cust_no = d.cust_no
AND A.offer_no     = e.offer_no
AND d.cust_no      = f.cust_no
AND f.unique_code  = gg.rj_unique_code
AND f.rp_client_no = gg.rp_client_no
AND A.disb_dt BETWEEN trunc(to_date(:as_on_dt),'MM') AND :as_on_dt
UNION ALL
SELECT DISTINCT A.lease_no credit_identification_no,
  decode(hh.rj_lease_role,'GU',0,'HW',1,'DI',2,'OS',3,'CO',4,'RC',5) rp_role ,
  NULL,
  substr(rj_address,1,50) current_address,
  f.rj_name first_name,
  NULL fathers_name,
  NULL surname,
  ' ' surname_before_married,
  f.rj_issue_date date_of_registration,
  NULL gender,
  NULL,
  decode(d.nic_add,'PP','0','ID','1','PC','2','NC','3','4') type_of_identification,
  rj_idno type_of_identification_no,
  NULL issue_date,
  NULL expiry_date ,
  decode(rj_citizenship,'ALBANIAN',0,1) nationality,
  decode(nationality,'02','Albanian','Other') state,
  decode(d.nic_n_op,'PP','0','ID','1','PC','2','NC','3','4') type_of_identification2,
  d.nic_add_op type_of_identification2_no,
  d.issue_date_op issue_date2,
  d.expiry_date_op expiry_date2,
  rj_email,
  A.first_rent net_monthly_income,
  f.rj_client_no unique_code,
  rp_phone_number,
  rj_phone_number1,
  rj_phone_number2
FROM le_contract A,
  cu_customer d,
  le_offer e,
  cu_rp_jurdical f,
  cu_rj_lease_nos hh
WHERE A.cust_no = d.cust_no
AND A.offer_no       = e.offer_no
AND d.cust_no        = f.cust_no
AND f.rj_unique_code = hh.rj_unique_code
AND f.rj_client_no   = hh.rj_client_no
AND A.disb_dt BETWEEN trunc(to_date(:as_on_dt),'MM') AND :as_on_dt
ORDER BY 1
        `, {
            replacements: { as_on_dt },
            type: db.sequelize.QueryTypes.SELECT
        });
        //   :as_on_dt "Effective date",
        // WHERE to_char(reschedule_date,'MON-RRRR') = to_char(to_date(:as_on_dt),'MON-RRRR')
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
//no error , but no data for given date
app.get('/total-portfolio', async (req, res) => {
    let as_on_dt = "31-JAN-2000";
    let p_dt2 = "31-JAN-2040";
    // const formattedDate = new Date(accOpenDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
        const quotationDetailsReport = await db.sequelize.query(`
SELECT A.lease_no,
  ' '
  ||get_client_name(b.cust_no)
  ||' ('
  ||b.cust_no
  ||')' NAME,
  to_number(A.lease_no) lno,
  (SELECT ' '
    ||description
  FROM cu_legal_status aa
  WHERE to_number(aa.legal_code) = to_number(b.legal_status)
  ) legal_type,
  (SELECT ' '
    ||sector_base_description
  FROM cu_sector_base_category bb
  WHERE bb.sector_base_id = b.sector_base_id
  ) sector_base,
  (SELECT boa_sector FROM cu_internal_sector WHERE sector_code = b.sector_cd
  ) boa_code,
  (SELECT asset_base_description
  FROM le_asset_base_category cc
  WHERE ' '
    ||cc.asset_base_id = c.asset_base_id
  ) asset_base,
  (SELECT ' '
    ||sector_name
  FROM cu_internal_sector
  WHERE sector_code = b.sector_cd
  ) sector_name,
  CASE
    WHEN b.sector_cd = 11
    THEN 'Immovable'
    ELSE 'Movable'
  END movable_immovable,
  decode(c.unit_type,'N','NEW','R','Re-Condition','U','USED') unitype,
  NULL asset_category,
  A.sec_dpst_pc,
  A.lease_amt original_cost,
  A.asset_type,
  CASE
    WHEN ccy = 'ALL'
    THEN c.doc_fee/nvl(get_current_exchange_rate('EUR',:as_on_dt),1)
    ELSE c.doc_fee
  END docfee,
  CASE
    WHEN ccy = 'ALL'
    THEN nvl(A.lease_amt,0)/nvl(get_current_exchange_rate('EUR',sanction_date),1)
    ELSE A.lease_amt
  END originalcost,
  CASE
    WHEN ccy = 'ALL'
    THEN ((A.sec_dpst_pc/100 )* A.lease_amt)/nvl(get_current_exchange_rate('EUR',sanction_date),1)
    ELSE (A.sec_dpst_pc /100 )* A.lease_amt
  END securitydeposit,
  c.vat_type,
  nvl(calc_overdue_days(lease_no,:as_on_dt),0) overdue_days,
  calc_overdues(lease_no,:as_on_dt) overdues,
  CASE
    WHEN c.vat_type = '01'
    THEN nvl(calc_overdues_principal(lease_no,:as_on_dt),0)/1.2
    ELSE nvl(calc_overdues_principal(lease_no,:as_on_dt),0)
  END principalod,
  c.ccy,
  CASE
    WHEN ccy <> 'ALL'
    THEN calc_nils(A.lease_no,:as_on_dt)
    ELSE (calc_nils(A.lease_no,:as_on_dt))/nvl(get_current_exchange_rate('EUR',:as_on_dt),1)
  END nils,
  calc_nils(A.lease_no,:as_on_dt) nil4,
  CASE
    WHEN ccy <> 'ALL'
    THEN calc_gl_balance_lease_fr('0446460000007',to_date(:as_on_dt),'EUR',A.lease_no)
    ELSE calc_gl_balance_lease('0446460000002',to_date(:as_on_dt),A.lease_no)/nvl(get_current_exchange_rate('EUR',:as_on_dt),1)
  END accrued_profit,
  NULL nils_accrued,
  c.irr profit_rate,
  c.period_mm term,
  A.lease_amt-(A.lease_amt*nvl(A.sec_dpst_pc,0)/100) disb_amount,
  CASE
    WHEN calc_overdues(lease_no,:as_on_dt) <= 0
    THEN 0
    ELSE calc_overdues(lease_no,:as_on_dt)
  END delayed_amount,
  :as_on_dt effective_date,
  0 outstanding_amount,
  calc_overdue_days(A.lease_no,:as_on_dt) od_days,
  CASE
    WHEN c.ccy = 'ALL'
    THEN nvl(calc_gl_balance_lease('0446460000001',:as_on_dt,lease_no),0)
    ELSE nvl(calc_gl_balance_lease_fr('0446460000006',:as_on_dt,'EUR',lease_no),0)
  END from_gl_onlyprincipal,
  calc_nils(A.lease_no,:as_on_dt) nils,
  nvl(calc_gl_balance_lease_fr('0446460000006',:as_on_dt,'EUR',A.lease_no),0)-nvl(lease_accumulated_prin_portion(A.lease_no,:as_on_dt),0) difference
FROM le_contract A,
  cu_customer b,
  le_offer c,
  le_asset d
WHERE A.cust_no       = b.cust_no
AND A.offer_no        = c.offer_no
AND c.offer_no        = d.offer_no(+)
AND A.disb_dt        IS NOT NULL
AND trunc(A.disb_dt) <= :as_on_dt
AND (term_date       IS NULL
OR term_date          > :as_on_dt)
AND A.lease_no NOT   IN
  (SELECT lease_no
  FROM le_written_off
  WHERE written_off_date <= :as_on_dt
  AND sup_by             IS NOT NULL
  )
AND round(calc_nils(A.lease_no,:as_on_dt)) <> 0
AND d.asset_no                              = 1
ORDER BY ccy,
  lease_no

        `, {
            replacements: { as_on_dt },
            type: db.sequelize.QueryTypes.SELECT
        });
        //   :as_on_dt "Effective date",
        // WHERE to_char(reschedule_date,'MON-RRRR') = to_char(to_date(:as_on_dt),'MON-RRRR')
        if (quotationDetailsReport.length === 0) {
            console.log('No records found'); // Debugging statement
        }

        res.json(quotationDetailsReport);
    } catch (error) {
        console.error('Error fetching Report:', error);
        res.status(500).json({ error: 'An error occurred while fetching all customers' });
    }
});
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
