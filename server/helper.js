// const express = require('express');
// require('dotenv').config();
// const db = require('./models');
// // const { sequelize } = db;
// const cors = require('cors');
// // const { Op } = require('sequelize');
// // const { Sequelize } = require('sequelize');
// const oracledb = require('oracledb');
// const fs = require('fs');
// const app = express();
// // const port = 5000;
// const path = require('path');
// const Sequelize = require('sequelize');
// const config = require('./config.js');
// // const env = process.env.NODE_ENV || 'development';
// // const dbConfig = config[env];
// // const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
// //     host: dbConfig.host,
// //     dialect: dbConfig.dialect
// // });
// // async function introspectOracleSchema(filename = 'schema_summary.txt') {
// //     try {
// //         await sequelize.authenticate();
// //         console.log('✅ Connected to Oracle DB');

// //         // Step 1: Get all tables in the user's schema
// //         const [tables] = await sequelize.query(`
// //             SELECT table_name FROM user_tables ORDER BY table_name
// //         `);

// //         if (tables.length === 0) {
// //             console.log('⚠️ No tables found in the current schema.');
// //             return;
// //         }

// //         // // Step 2: For each table, get its column definitions
// //         // for (const table of tables) {
// //         //     const tableName = table.TABLE_NAME;

// //         //     console.log(`\n📦 Table: ${tableName}`);

// //         //     const [columns] = await sequelize.query(`
// //         //         SELECT column_name, data_type, data_length, nullable
// //         //         FROM user_tab_columns
// //         //         WHERE table_name = '${tableName}'
// //         //         ORDER BY column_id
// //         //     `);

// //         //     console.table(columns);
// //         // }
// //         let output = '';

// //         for (const table of tables) {
// //             const tableName = table.TABLE_NAME;
// //             const [columns] = await sequelize.query(`
// //                 SELECT column_name FROM user_tab_columns
// //                 WHERE table_name = '${tableName}'
// //                 ORDER BY column_id
// //             `);

// //             output += `Table: ${tableName}\n`;
// //             for (const col of columns) {
// //                 output += `  - ${col.COLUMN_NAME}\n`;
// //             }
// //             output += '\n';
// //         }

// //         fs.writeFileSync(filename, output);
// //         console.log(`✅ Schema saved to ${filename}`);

// //     } catch (error) {
// //         console.error('❌ Error during introspection:', error);
// //     } finally {
// //         await sequelize.close();
// //     }
// // }
// // 
// // introspectOracleSchema();

let Q1 = 1 disbursements working
// // -- LERP259 - DASHBOARD QUERIES
// // -- #### Q1 Disbursements
// SELECT 2 FLAG, ' For the year' LABEL, COUNT(LEASE_NO) SRNO,
//        SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT,
//        (SELECT COUNT(*)
//          FROM   CU_CUSTOMER
//          WHERE  ENT_DT BETWEEN TRUNC(:P_DT2, 'YY') AND :P_DT2
//                 AND
//                 CUST_NO IN
//                 (SELECT CUST_NO
//                  FROM   LE_CONTRACT
//                  WHERE  TERM_TYPE IS NULL
//                         AND DISB_DT BETWEEN TRUNC(:P_DT2, 'YY') AND :P_DT2)) CUSTOMERS
// FROM   LE_CONTRACT B
// WHERE  DISB_DT BETWEEN TRUNC(:P_DT2, 'YY') AND :P_DT2
//        AND NVL(DISBURSEMENT_TYPE, 'x') <> 'R'
// GROUP  BY 2, ' For the year'
// UNION ALL
// SELECT 1, ' For the Month' LABEL, COUNT(LEASE_NO) SRNO,
//        SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT,
//        (SELECT COUNT(*)
//          FROM   CU_CUSTOMER
//          WHERE  ENT_DT BETWEEN TRUNC(:P_DT2, 'MM') AND :P_DT2
//                 AND
//                 CUST_NO IN
//                 (SELECT CUST_NO
//                  FROM   LE_CONTRACT
//                  WHERE  TERM_TYPE IS NULL
//                         AND DISB_DT BETWEEN TRUNC(:P_DT2, 'MM') AND :P_DT2)) CUSTOMERS
// FROM   LE_CONTRACT B
// WHERE  DISB_DT BETWEEN TRUNC(:P_DT2, 'MM') AND :P_DT2
//        AND NVL(DISBURSEMENT_TYPE, 'x') <> 'R'
// GROUP  BY 1, ' For the Month'
// ORDER  BY 1;
let Q2 = 1
// -- #### Q2 - 

// SELECT ' 1- For the year' LABEL, COUNT(LEASE_NO) SERNO,
//        SUM((CALC_NILS(B.LEASE_NO, SYSDATE))) OSBALANCE
// FROM   LE_CONTRACT B
// WHERE  B.TERM_DATE BETWEEN START_DATE(:P_DT2) AND
//        ADD_MONTHS(START_DATE(:P_DT2), 12) - 1
// UNION ALL
// SELECT ' 2- For the Month' LABEL, COUNT(LEASE_NO) SERNO,
//        SUM((CALC_NILS(B.LEASE_NO, SYSDATE))) OSBALANCE
// FROM   LE_CONTRACT B
// WHERE  B.TERM_DATE BETWEEN TRUNC(:P_DT2, 'mm') AND LAST_DAY(:P_DT2);

// -- #### Q3 - PNL

// SELECT DISTINCT SEQNO, DESCRIP, SERIAL_NO, SUB_TOTAL, NOTE
// FROM   GL_STATEMENT_FORMAT_DASHBOARD
// WHERE  STATE_TYPE = :TYP
//        AND SERIAL_NO IN (11.1, 11.2)
// ORDER  BY 1 ASC;

// -- #### Q4 - PNL FC

// SELECT DISTINCT SEQNO, DESCRIP, SERIAL_NO, SUB_TOTAL, NOTE
// FROM   GL_STATEMENT_FORMAT_DASHBOARD
// WHERE  STATE_TYPE = :TYP
//        AND SERIAL_NO NOT IN (11.1, 11.2)
// ORDER  BY 1 ASC;

// -- #### Q5 - Sector Analysis
GET_LEASE_AMOUNT invalid identifier
// SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4,
//        SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
//        SUM(NVL(LEASE_AMT4, 0)) - SUM(NVL(SECURITY_DEPOSIT3, 0)) LEASEAMOUNT,
//        SECTOR_CD, SECTOR_NAME, COUNT(LEASE_NO) NO_OF_LEASES4,
//        ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
//        SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
//        SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
// FROM   (SELECT B.LEASE_NO, A.SECTOR_CD, SECTOR_NAME,
//                 NVL(GET_LEASE_AMOUNT(B.LEASE_NO), 0) LEASE_AMT4, B.IRR,
//                 CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                       0
//                      ELSE
//                       DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                              1,
//                              CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                              0)
//                    END
//                 END OVERDUE4,
//                 ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                                  1,
//                                  CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                                  0) > 0 THEN
//                       1
//                      ELSE
//                       0
//                    END
//                 END OLD_LEASES, B.PERIOD_MM / 12 PMM
//          FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
//          WHERE  A.CUST_NO = B.CUST_NO
//                 AND B.OFFER_NO = D.OFFER_NO
//                 AND A.SECTOR_CD = C.SECTOR_CODE
//                 AND A.SECTOR_CD IS NOT NULL
//                 AND B.DISB_DT IS NOT NULL
//                 AND DISB_DT <= :P_DT2
//                 AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
//                 AND
//                 (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
//                 AND B.LEASE_NO NOT IN
//                 (SELECT LEASE_NO
//                      FROM   LE_WRITTEN_OFF
//                      WHERE  WRITTEN_OFF_DATE <= :P_DT2))
// GROUP  BY SECTOR_CD, SECTOR_NAME
// ORDER  BY NIL4 DESC;

// -- #### Q6 - Overdue Analysis
CALC_GL_NIL not found
// SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4,
//        SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
//        SUM(NVL(LEASE_AMT4, 0)) - SUM(NVL(SECURITY_DEPOSIT3, 0)) LEASEMAOUNT,
//        SUM(WRITTEN_OFF_AMOUNT) WRITTEN_OFF_AMOUNT,
//        SUM(SPECIFIC_PROV) SPECIFIC_PROVISIONG,
//        SUM(GENERAL_PROV) GENERAL_PROV, TERM1FLAG, TERM2ORDER, TERM3,
//        COUNT(LEASE_NO) NO_OF_LEASES4,
//        ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
//        SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
//        SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
// FROM   (SELECT B.LEASE_NO, NVL(GET_LEASE_AMOUNT(B.LEASE_NO), 0) LEASE_AMT4,
//                 B.IRR,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 0 AND 89 THEN
//                    0
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 5) / 100
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 25) / 100
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 50) / 100
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) >= 365 THEN
//                    (CALC_GL_NIL(TO_DATE(:P_DT2), B.LEASE_NO) * 100) / 100
//                 END SPECIFIC_PROV,
//                 CASE
//                   WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                    'Performing'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
//                    '1-30'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
//                    '31-60'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
//                    '61-89'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    '90 -179'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    '180-269'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    '270-364'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
//                    'Above-364'
//                   ELSE
//                    'Performing'
//                 END TERM1FLAG,
//                 CASE
//                   WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                    '0'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
//                    '1'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
//                    '2'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
//                    '3'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    '4'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    '5'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    '6'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
//                    '7'
//                   ELSE
//                    '0'
//                 END TERM2ORDER,
//                 CASE
//                   WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                    'A'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
//                    'D E F A U L T'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
//                    'D E F A U L T'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
//                    'D E F A U L T'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    'NPA'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    'NPA'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    'NPA'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
//                    'Z'
//                   ELSE
//                    'A'
//                 END TERM3, CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
//                 ABS(NVL(CALC_GL_BALANCE_LEASE('1013105000001',
//                                                TO_DATE(:P_DT2),
//                                                B.LEASE_NO),
//                          0)) GENERAL_PROV,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                       0
//                      ELSE
//                       DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                              1,
//                              CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                              0)
//                    END
//                 END OVERDUE4,
//                 ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                                  1,
//                                  CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                                  0) > 0 THEN
//                       1
//                      ELSE
//                       0
//                    END
//                 END OLD_LEASES, B.PERIOD_MM / 12 PMM,
//                 (SELECT NVL(SUM(WRITTEN_OFF_AMOUNT), 0)
//                   FROM   LE_WRITTEN_OFF AA
//                   WHERE  AA.LEASE_NO = B.LEASE_NO
//                          AND WRITTEN_OFF_DATE <= :P_DT2) WRITTEN_OFF_AMOUNT
//          FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
//          WHERE  A.CUST_NO = B.CUST_NO
//                 AND B.OFFER_NO = D.OFFER_NO
//                 AND A.SECTOR_CD = C.SECTOR_CODE
//                 AND A.SECTOR_CD IS NOT NULL
//                 AND B.DISB_DT IS NOT NULL
//                 AND DISB_DT <= :P_DT2
//                 AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
//                 AND
//                 (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
//                 AND B.LEASE_NO NOT IN
//                 (SELECT LEASE_NO
//                      FROM   LE_WRITTEN_OFF
//                      WHERE  WRITTEN_OFF_DATE <= :P_DT2))
// WHERE  TERM2ORDER <> 0
// GROUP  BY TERM1FLAG, TERM2ORDER, TERM3
// ORDER  BY TERM2ORDER;

// -- #### Q7 - Portfolio Analysis (Including Overdue)

// SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4, TERM1, TERM2,
//        TERM3, COUNT(LEASE_NO) NO_OF_LEASES4,
//        ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
//        SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
//        SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
//        SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
// FROM   (SELECT B.LEASE_NO, B.LEASE_AMT LEASE_AMT4, B.IRR,
//                 CASE
//                   WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                    'Performing'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
//                    '1-30'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
//                    '31-60'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
//                    '61-89'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    '90 -179'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    '180-269'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    '270-364'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
//                    'Above-364'
//                   ELSE
//                    'Performing'
//                 END TERM1,
//                 CASE
//                   WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                    '0'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
//                    '1'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
//                    '2'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
//                    '3'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    '4'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    '5'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    '6'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
//                    '7'
//                   ELSE
//                    '0'
//                 END TERM2,
//                 CASE
//                   WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                    'A'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 1 AND 30 THEN
//                    'D E F A U L T'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 31 AND 60 THEN
//                    'D E F A U L T'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 61 AND 89 THEN
//                    'D E F A U L T'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 90 AND 179 THEN
//                    'NPA'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 180 AND 269 THEN
//                    'NPA'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) BETWEEN 270 AND 364 THEN
//                    'NPA'
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) > 364 THEN
//                    'Z'
//                   ELSE
//                    'A'
//                 END TERM3, CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                       0
//                      ELSE
//                       DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                              1,
//                              CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                              0)
//                    END
//                 END OVERDUE4,
//                 ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
//                 CASE
//                   WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                               1,
//                               CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                               0) > 0 THEN
//                    1
//                   ELSE
//                    0
//                 END OLD_LEASES, B.PERIOD_MM / 12 PMM
//          FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
//          WHERE  A.CUST_NO = B.CUST_NO
//                 AND B.OFFER_NO = D.OFFER_NO
//                 AND A.SECTOR_CD = C.SECTOR_CODE
//                 AND A.SECTOR_CD IS NOT NULL
//                 AND B.DISB_DT IS NOT NULL
//                 AND DISB_DT <= :P_DT2
//                -- AND END_dATE > :P_Dt2
//                 AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
//                 AND
//                 (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
//                 AND B.LEASE_NO NOT IN
//                 (SELECT LEASE_NO
//                      FROM   LE_WRITTEN_OFF
//                      WHERE  WRITTEN_OFF_DATE <= :P_DT2))
// GROUP  BY TERM1, TERM2, TERM3
// ORDER  BY 5, 6, 1, 3;

// -- #### Q8

// SELECT ' 1- For the year' LABEL, COUNT(LEASE_NO) SNO,
//        SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT
// FROM   LE_CONTRACT B
// WHERE  DISB_DT BETWEEN START_DATE(:P_DT2) AND
//        ADD_MONTHS(START_DATE(:P_DT2), 12) - 1
//        AND NVL(DISBURSEMENT_TYPE, 'x') = 'R'
// UNION ALL
// SELECT ' 2- For the Month' LABEL, COUNT(LEASE_NO) SNO,
//        SUM((B.LEASE_AMT) - ((B.SEC_DPST_PC * B.LEASE_AMT) / 100)) NET_DISBURSEMENT
// FROM   LE_CONTRACT B
// WHERE  DISB_DT BETWEEN TRUNC(:P_DT2, 'mm') AND LAST_DAY(:P_DT2)
//        AND NVL(DISBURSEMENT_TYPE, 'x') = 'R';

// -- #### Q9 - Tenure Analysis

// SELECT 'Active', SUM(PMM) PMM, SUM(LEASE_AMT4) LEASE_AMT4,
//        SUM(NVL(SECURITY_DEPOSIT3, 0)) SECURITY_DEPOSIT3,
//        SUM(NVL(LEASE_AMT4, 0)) - SUM(NVL(SECURITY_DEPOSIT3, 0)) LEASEAMOUNT,
//        OVERDUE_SLAB, ORDERING, COUNT(LEASE_NO) NO_OF_LEASES4,
//        ROUND(SUM(LEASE_AMT4 * NVL(IRR, 0)) / SUM(LEASE_AMT4), 2) WIRR4,
//        SUM(NIL4) "NIL4", SUM(OVERDUE4) OVERDUES4,
//        SUM(NVL(OLD_LEASES, 0)) NO_OF_OLD_LEASES2
// FROM   (SELECT B.LEASE_NO,
//                 CASE
//                   WHEN D.PERIOD_MM BETWEEN 1 AND 12 THEN
//                    '1 - 12 Months'
//                   WHEN D.PERIOD_MM BETWEEN 13 AND 24 THEN
//                    '13 - 24 Months'
//                   WHEN D.PERIOD_MM BETWEEN 25 AND 36 THEN
//                    '25 - 36 Months'
//                   WHEN D.PERIOD_MM BETWEEN 37 AND 48 THEN
//                    '37 - 48 Months'
//                   WHEN D.PERIOD_MM BETWEEN 49 AND 60 THEN
//                    '49 - 60 Months'
//                   WHEN D.PERIOD_MM BETWEEN 61 AND 72 THEN
//                    '61 - 72 Months'
//                   WHEN D.PERIOD_MM > 72 THEN
//                    'Greater then 72 Months'
//                 END OVERDUE_SLAB,
//                 CASE
//                   WHEN D.PERIOD_MM BETWEEN 1 AND 12 THEN
//                    1
//                   WHEN D.PERIOD_MM BETWEEN 13 AND 24 THEN
//                    2
//                   WHEN D.PERIOD_MM BETWEEN 25 AND 36 THEN
//                    3
//                   WHEN D.PERIOD_MM BETWEEN 37 AND 48 THEN
//                    4
//                   WHEN D.PERIOD_MM BETWEEN 49 AND 60 THEN
//                    5
//                   WHEN D.PERIOD_MM BETWEEN 61 AND 72 THEN
//                    6
//                   WHEN D.PERIOD_MM > 72 THEN
//                    7
//                 END ORDERING, NVL(GET_LEASE_AMOUNT(B.LEASE_NO), 0) LEASE_AMT4,
//                 B.IRR, CALC_NILS(B.LEASE_NO, :P_DT2) NIL4,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN CALC_OVERDUES(B.LEASE_NO, :P_DT2) <= 1 THEN
//                       0
//                      ELSE
//                       DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                              1,
//                              CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                              0)
//                    END
//                 END OVERDUE4,
//                 ((NVL(B.SEC_DPST_PC, 0) / 100) * B.LEASE_AMT) SECURITY_DEPOSIT3,
//                 CASE
//                   WHEN CALC_OVERDUE_DAYS(B.LEASE_NO, :P_DT2) <= 0 THEN
//                    0
//                   ELSE
//                    CASE
//                      WHEN DECODE(SIGN(CALC_OVERDUES(B.LEASE_NO, :P_DT2)),
//                                  1,
//                                  CALC_OVERDUES(B.LEASE_NO, :P_DT2),
//                                  0) > 0 THEN
//                       1
//                      ELSE
//                       0
//                    END
//                 END OLD_LEASES, B.PERIOD_MM / 12 PMM
//          FROM   CU_CUSTOMER A, LE_CONTRACT B, CU_INTERNAL_SECTOR C, LE_OFFER D
//          WHERE  A.CUST_NO = B.CUST_NO
//                 AND B.OFFER_NO = D.OFFER_NO
//                 AND A.SECTOR_CD = C.SECTOR_CODE
//                 AND A.SECTOR_CD IS NOT NULL
//                 AND B.DISB_DT IS NOT NULL
//                 AND DISB_DT <= :P_DT2
//                 AND ROUND(CALC_NILS(B.LEASE_NO, :P_DT2)) <> 0
//                 AND
//                 (TERM_DATE IS NULL OR NVL(TVOUCHER_DATE, TERM_DATE) > :P_DT2)
//                 AND B.LEASE_NO NOT IN
//                 (SELECT LEASE_NO
//                      FROM   LE_WRITTEN_OFF
//                      WHERE  WRITTEN_OFF_DATE <= :P_DT2))
// GROUP  BY OVERDUE_SLAB, ORDERING
// ORDER  BY ORDERING;

// -- #### Q10
working
// SELECT DISTINCT 1 ORDERING, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
// FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
// WHERE  A.OFFER_NO = B.OFFER_NO
//        AND B.LEASE_NO = C.LEASE_NO
//        AND DUE_DATE BETWEEN TO_DATE(:P_DT2) + 1 AND ADD_MONTHS(:P_DT2, 12)
//  HAVING(MIN(DUE_DATE) IS NOT NULL
//               OR MAX(DUE_DATE) IS NOT NULL)
// UNION ALL
// SELECT DISTINCT 2, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
// FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
// WHERE  A.OFFER_NO = B.OFFER_NO
//        AND B.LEASE_NO = C.LEASE_NO
//        AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 13) AND
//        ADD_MONTHS(:P_DT2, 24)
//  HAVING(MIN(DUE_DATE) IS NOT NULL
//               OR MAX(DUE_DATE) IS NOT NULL)
// UNION ALL
// SELECT DISTINCT 3, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
// FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
// WHERE  A.OFFER_NO = B.OFFER_NO
//        AND B.LEASE_NO = C.LEASE_NO
//        AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 25) AND
//        ADD_MONTHS(:P_DT2, 36)
//  HAVING(MIN(DUE_DATE) IS NOT NULL
//               OR MAX(DUE_DATE) IS NOT NULL)
// UNION ALL
// SELECT DISTINCT 4, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
// FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
// WHERE  A.OFFER_NO = B.OFFER_NO
//        AND B.LEASE_NO = C.LEASE_NO
//        AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 37) AND
//        ADD_MONTHS(:P_DT2, 48)
//  HAVING(MIN(DUE_DATE) IS NOT NULL
//               OR MAX(DUE_DATE) IS NOT NULL)
// UNION ALL
// SELECT DISTINCT 5, MIN(DUE_DATE) D_DATE, MAX(DUE_DATE) LAST_DATE
// FROM   LE_OFFER A, LE_CONTRACT B, LE_DUES C
// WHERE  A.OFFER_NO = B.OFFER_NO
//        AND B.LEASE_NO = C.LEASE_NO
//        AND DUE_DATE BETWEEN ADD_MONTHS(TRUNC(TO_DATE(:P_DT2), 'MM'), 49) AND
//        ADD_MONTHS(:P_DT2, 60)
//  HAVING(MIN(DUE_DATE) IS NOT NULL
//               OR MAX(DUE_DATE) IS NOT NULL)
// ORDER  BY 1;
