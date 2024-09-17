const { Pool } = require('pg');
require("dotenv").config();

// إعدادات قاعدة البيانات
const pool = new Pool({
    user: process.env.DB_USER,           // اسم المستخدم لقاعدة البيانات
    host: process.env.DB_HOST,           // مضيف قاعدة البيانات
    database: process.env.DB_NAME,       // اسم قاعدة البيانات
    password: process.env.DB_PASSWORD,   // كلمة مرور قاعدة البيانات
    port: 5432,           // منفذ قاعدة البيانات (افتراضي: 5432)
});

// تصدير الاتصال
module.exports = pool
