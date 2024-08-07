var express = require('express');
var router = express.Router();

const people = [
    { Име: 'Иван Петров', възраст: 28, Образование: 'Бакалавър', гражданство: 'България' },
    { Име: 'Мария Иванова', възраст: 32, Образование: 'Магистър', гражданство: 'България' },
    { Име: 'Георги Георгиев', възраст: 45, Образование: 'Доктор', гражданство: 'България' },
    { Име: 'София Димитрова', възраст: 29, Образование: 'Бакалавър', гражданство: 'България' },
    { Име: 'Александър Стоянов', възраст: 35, Образование: 'Магистър', гражданство: 'България' },
    { Име: 'Елена Костова', възраст: 40, Образование: 'Доктор', гражданство: 'България' },
    { Име: 'Димитър Николов', възраст: 27, Образование: 'Бакалавър', гражданство: 'България' },
    { Име: 'Анна Петрова', възраст: 31, Образование: 'Магистър', гражданство: 'България' },
    { Име: 'Николай Тодоров', възраст: 38, Образование: 'Доктор', гражданство: 'България' },
    { Име: 'Виктория Симеонова', възраст: 26, Образование: 'Бакалавър', гражданство: 'България' }
  ];

router.get('/',function(req, res){
    res.render('People/table', { people: people });
});

module.exports = router;